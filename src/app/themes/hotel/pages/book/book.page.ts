import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, firstValueFrom, forkJoin, map, of, switchMap } from 'rxjs';
import { HotelApiService } from '@core/services/hotel/hotel-api.service';
import { BookingSessionService } from '@core/services/hotel/booking-session.service';
import { STAY_DATES } from '@core/services/hotel/stay-dates';
import { MoneyPipe } from '@core/services/hotel/money.pipe';
import { ApiError, AvailabilityResult, Booking, HotelInfo, PaymentMethod, StaySearch } from '@core/models/hotel/hotel.models';
import { PriceSummaryComponent } from '../../components/price-summary/price-summary.component';
import { PayPalButtonsComponent } from '../../components/paypal-buttons/paypal-buttons.component';
import { hotelContent } from '../hotel-content';

type Ctx =
  | { kind: 'loading' }
  | { kind: 'ready'; hotel: HotelInfo; search: StaySearch; result: AvailabilityResult }
  | { kind: 'unavailable'; search: StaySearch | null; reason: string };

/**
 * Checkout: guest details + payment.
 * PayPal: the booking (and its PayPal order) is created when the guest clicks the
 * PayPal button, so the room is only held once they actually start paying.
 */
@Component({
  selector: 'app-book-page',
  imports: [ReactiveFormsModule, RouterLink, MoneyPipe, PriceSummaryComponent, PayPalButtonsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './book.page.html',
  styleUrl: './book.page.scss',
})
export class BookPage {
  private readonly API = inject(HotelApiService);
  private readonly SESSION = inject(BookingSessionService);
  private readonly ROUTE = inject(ActivatedRoute);
  private readonly ROUTER = inject(Router);
  private readonly FB = inject(FormBuilder);
  public readonly C = hotelContent();

  public readonly form = this.FB.nonNullable.group({
    guest_name: ['', [Validators.required, Validators.maxLength(191)]],
    guest_email: ['', [Validators.required, Validators.email, Validators.maxLength(191)]],
    guest_phone: ['', [Validators.maxLength(32)]],
    special_requests: ['', [Validators.maxLength(2000)]],
    payment_method: ['paypal' as PaymentMethod, Validators.required],
    accept: [false, Validators.requiredTrue],
  });

  public readonly ctx = toSignal(
    this.ROUTE.queryParams.pipe(
      switchMap(params => {
        const SLUG = typeof params['room'] === 'string' ? params['room'] : '';
        if (!SLUG || !STAY_DATES.hasSearch(params)) {
          return of<Ctx>({ kind: 'unavailable', search: null, reason: 'Choose a room and your dates first.' });
        }
        const SEARCH = STAY_DATES.fromParams(params);
        return forkJoin([this.API.hotel(), this.API.availability(SEARCH)]).pipe(
          map(([hotel, res]): Ctx => {
            const RESULT = res.results.find(r => r.room_type.slug === SLUG);
            if (!RESULT) return { kind: 'unavailable', search: SEARCH, reason: 'This room does not fit your party.' };
            if (RESULT.available < 1) return { kind: 'unavailable', search: SEARCH, reason: 'This room is sold out for your dates.' };
            this.selectDefaultMethod(hotel);
            return { kind: 'ready', hotel, search: SEARCH, result: RESULT };
          }),
          catchError(e => of<Ctx>({ kind: 'unavailable', search: SEARCH, reason: HotelApiService.toApiError(e).message })),
        );
      }),
    ),
    { initialValue: { kind: 'loading' } as Ctx },
  );

  public readonly ready = computed(() => { const X = this.ctx(); return X.kind === 'ready' ? X : null; });
  public readonly method = toSignal(this.form.controls.payment_method.valueChanges, { initialValue: this.form.controls.payment_method.value });

  /** Booking created during this checkout (PayPal flow keeps it across retries). */
  public readonly booking = signal<Booking | null>(null);
  public readonly busy = signal(false);
  public readonly error = signal<ApiError | null>(null);
  public readonly notice = signal<string | null>(null);

  public readonly stayLabel = computed(() => {
    const R = this.ready();
    if (!R) return '';
    return `${STAY_DATES.pretty(R.search.check_in)} → ${STAY_DATES.pretty(R.search.check_out)}`;
  });

  public readonly dueNow = computed(() => {
    const R = this.ready();
    if (!R) return null;
    return this.method() === 'pay_at_hotel' ? '0.00' : R.result.quote.amount_due_now;
  });

  public readonly holdUntil = computed(() => {
    const B = this.booking();
    return B?.hold_expires_at ? new Date(B.hold_expires_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;
  });

  public readonly roomImage = computed(() => this.ready()?.result.room_type.images?.[0]?.url || this.C.roomPlaceholder);

  /** Arrow fn so `this` survives being handed to the PayPal component. */
  public readonly createPayPalOrder = async (): Promise<string> => {
    this.error.set(null);
    this.notice.set(null);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error.set({ message: 'Please complete your details and accept the policies before paying.' });
      throw new Error('invalid form');
    }

    const EXISTING = this.booking();
    try {
      const B = EXISTING && EXISTING.status === 'pending'
        ? await firstValueFrom(this.API.retryPayPal(EXISTING.reference, EXISTING.manage_token!))
        : await firstValueFrom(this.API.createBooking(this.payload('paypal')));

      const MERGED = { ...B, manage_token: B.manage_token ?? EXISTING?.manage_token };
      this.booking.set(MERGED);
      this.SESSION.remember(MERGED.reference, MERGED.manage_token!);

      const ORDER_ID = B.payment?.paypal_order_id;
      if (!ORDER_ID) throw new Error('missing PayPal order');
      return ORDER_ID;
    } catch (e) {
      this.error.set(HotelApiService.toApiError(e));
      throw e;
    }
  };

  public async onPayPalApproved(orderId: string): Promise<void> {
    const B = this.booking();
    if (!B?.manage_token) return;
    this.busy.set(true);
    this.error.set(null);
    try {
      const CONFIRMED = await firstValueFrom(this.API.capturePayPal(B.reference, B.manage_token, orderId));
      this.goToBooking(CONFIRMED.reference, B.manage_token, true);
    } catch (e) {
      this.error.set(HotelApiService.toApiError(e));
      this.busy.set(false);
    }
  }

  public onPayPalCancelled(): void {
    const UNTIL = this.holdUntil();
    this.notice.set(UNTIL
      ? `Payment cancelled. We're holding your room until ${UNTIL}; you can try again below.`
      : 'Payment cancelled. You can try again below.');
  }

  public onPayPalFailed(err: unknown): void {
    // Our own errors (invalid form / API) are already shown; only report PayPal-side failures.
    if (!this.error()) {
      console.error('[PayPal]', err);
      this.error.set({ message: 'PayPal reported a problem. Please try again or choose another payment option.' });
    }
  }

  public async payAtHotel(): Promise<void> {
    this.error.set(null);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.busy.set(true);
    try {
      const B = await firstValueFrom(this.API.createBooking(this.payload('pay_at_hotel')));
      this.SESSION.remember(B.reference, B.manage_token!);
      this.goToBooking(B.reference, B.manage_token!, true);
    } catch (e) {
      this.error.set(HotelApiService.toApiError(e));
      this.busy.set(false);
    }
  }

  public invalid(name: keyof typeof this.form.controls): boolean {
    const CTRL = this.form.controls[name];
    return CTRL.invalid && (CTRL.touched || CTRL.dirty);
  }

  private payload(method: PaymentMethod) {
    const R = this.ready()!;
    const V = this.form.getRawValue();
    return {
      room_type_id: R.result.room_type.id,
      ...R.search,
      guest_name: V.guest_name.trim(),
      guest_email: V.guest_email.trim(),
      guest_phone: V.guest_phone.trim() || null,
      special_requests: V.special_requests.trim() || null,
      payment_method: method,
    };
  }

  private selectDefaultMethod(hotel: HotelInfo): void {
    const AVAILABLE = hotel.payment_methods.filter(m => m !== 'paypal' || !!hotel.paypal?.client_id);
    if (AVAILABLE.length && !AVAILABLE.includes(this.form.controls.payment_method.value)) {
      this.form.controls.payment_method.setValue(AVAILABLE[0]);
    }
  }

  public methods(hotel: HotelInfo): PaymentMethod[] {
    return hotel.payment_methods.filter(m => m !== 'paypal' || !!hotel.paypal?.client_id);
  }

  public onImgError(event: Event): void {
    const IMG = event.target as HTMLImageElement;
    if (!IMG.src.endsWith(this.C.roomPlaceholder)) IMG.src = this.C.roomPlaceholder;
  }

  private goToBooking(reference: string, token: string, fresh: boolean): void {
    this.ROUTER.navigate(['/booking', reference], { queryParams: { token, ...(fresh ? { new: 1 } : {}) } });
  }
}
