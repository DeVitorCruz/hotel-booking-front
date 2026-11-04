import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck, faClock, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom, forkJoin, of, catchError } from 'rxjs';
import { HotelApiService } from '@core/services/hotel/hotel-api.service';
import { BookingSessionService } from '@core/services/hotel/booking-session.service';
import { STAY_DATES } from '@core/services/hotel/stay-dates';
import { MoneyPipe } from '@core/services/hotel/money.pipe';
import { ApiError, Booking, HotelInfo } from '@core/models/hotel/hotel.models';
import { PriceSummaryComponent } from '../../components/price-summary/price-summary.component';
import { PayPalButtonsComponent } from '../../components/paypal-buttons/paypal-buttons.component';
import { hotelContent } from '../hotel-content';

const STATUS_LABEL: Record<string, string> = {
  pending: 'Awaiting payment', confirmed: 'Confirmed', checked_in: 'Checked in', checked_out: 'Completed',
  cancelled: 'Cancelled', expired: 'Expired', no_show: 'No-show',
};

/** /booking/:reference?token=… — the guest's confirmation and self-service page. */
@Component({
  selector: 'app-booking-page',
  imports: [RouterLink, FontAwesomeModule, MoneyPipe, PriceSummaryComponent, PayPalButtonsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './booking.page.html',
  styleUrl: './booking.page.scss',
})
export class BookingPage implements OnInit {
  private readonly API = inject(HotelApiService);
  private readonly SESSION = inject(BookingSessionService);
  private readonly ROUTE = inject(ActivatedRoute);
  public readonly C = hotelContent();
  public readonly icons = { ok: faCircleCheck, wait: faClock, no: faCircleXmark };

  public readonly booking = signal<Booking | null>(null);
  public readonly hotel = signal<HotelInfo | null>(null);
  public readonly loadError = signal<string | null>(null);
  public readonly actionError = signal<ApiError | null>(null);
  public readonly notice = signal<string | null>(null);
  public readonly busy = signal(false);
  public readonly confirmingCancel = signal(false);
  public readonly isNew = signal(false);

  private reference = '';
  private token = '';

  public readonly statusLabel = computed(() => STATUS_LABEL[this.booking()?.status ?? ''] ?? '');
  public readonly canCancel = computed(() => {
    const B = this.booking();
    return !!B && ['pending', 'confirmed'].includes(B.status) && B.check_in >= STAY_DATES.today();
  });
  public readonly canPay = computed(() => {
    const B = this.booking();
    return !!B && B.status === 'pending' && B.payment_method === 'paypal' && !!this.hotel()?.paypal;
  });
  public readonly holdUntil = computed(() => {
    const B = this.booking();
    return B?.hold_expires_at ? new Date(B.hold_expires_at).toLocaleString([], { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' }) : null;
  });
  public readonly pretty = (iso: string) => STAY_DATES.pretty(iso);

  public ngOnInit(): void {
    const PARAMS = this.ROUTE.snapshot;
    this.reference = (PARAMS.paramMap.get('reference') ?? '').toUpperCase();
    this.token = PARAMS.queryParamMap.get('token') ?? this.SESSION.token(this.reference) ?? '';
    this.isNew.set(PARAMS.queryParamMap.has('new'));
    if (this.token) this.SESSION.remember(this.reference, this.token);
    void this.load();
  }

  public async load(): Promise<void> {
    if (!this.token) {
      this.loadError.set('Open this page from the link in your confirmation email.');
      return;
    }
    try {
      const [B, H] = await firstValueFrom(forkJoin([
        this.API.booking(this.reference, this.token),
        this.API.hotel().pipe(catchError(() => of(null))),
      ]));
      this.booking.set(B);
      this.hotel.set(H);
    } catch (e) {
      const ERR = HotelApiService.toApiError(e);
      this.loadError.set(ERR.code === 'network' ? ERR.message : 'We could not find this booking. Check the link in your confirmation email.');
    }
  }

  public readonly createPayPalOrder = async (): Promise<string> => {
    this.actionError.set(null);
    try {
      const B = await firstValueFrom(this.API.retryPayPal(this.reference, this.token));
      this.booking.set(B);
      if (!B.payment?.paypal_order_id) throw new Error('missing PayPal order');
      return B.payment.paypal_order_id;
    } catch (e) {
      this.actionError.set(HotelApiService.toApiError(e));
      throw e;
    }
  };

  public async onPayPalApproved(orderId: string): Promise<void> {
    this.busy.set(true);
    this.actionError.set(null);
    try {
      this.booking.set(await firstValueFrom(this.API.capturePayPal(this.reference, this.token, orderId)));
      this.isNew.set(true);
    } catch (e) {
      this.actionError.set(HotelApiService.toApiError(e));
    } finally {
      this.busy.set(false);
    }
  }

  public async cancel(): Promise<void> {
    this.busy.set(true);
    this.actionError.set(null);
    try {
      const RES = await firstValueFrom(this.API.cancelBooking(this.reference, this.token));
      this.booking.set(RES.booking);
      this.confirmingCancel.set(false);
      this.isNew.set(false);
      this.notice.set(RES.refunded_amount
        ? `Your booking was cancelled and ${RES.booking.currency} ${RES.refunded_amount} was refunded to your PayPal account.`
        : RES.free_cancellation
          ? 'Your booking was cancelled.'
          : 'Your booking was cancelled. As it was inside the cancellation window, no automatic refund was issued; contact us if you have questions.');
    } catch (e) {
      this.actionError.set(HotelApiService.toApiError(e));
    } finally {
      this.busy.set(false);
    }
  }

  public onImgError(event: Event): void {
    const IMG = event.target as HTMLImageElement;
    if (!IMG.src.endsWith(this.C.roomPlaceholder)) IMG.src = this.C.roomPlaceholder;
  }
}
