import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@core/services/auth/auth.service';
import { MoneyPipe } from '@core/services/hotel/money.pipe';
import { STAY_DATES } from '@core/services/hotel/stay-dates';
import { Observable } from 'rxjs';
import { AdminApiService } from '../core/admin-api.service';
import { StaffBooking } from '../core/admin.models';
import { apiErrorMessage } from '../core/api-error';
import { ConfirmService } from '../core/confirm.service';
import { ToastService } from '../core/toast.service';
import { ADMIN_FORMAT } from '../shared/admin-format';
import { StatusBadgeComponent } from '../shared/status-badge.component';

@Component({
    selector: 'ad-booking-detail',
    imports: [RouterLink, FaIconComponent, MoneyPipe, StatusBadgeComponent],
    template: `
        <a class="ad-back" routerLink="/admin/bookings"><fa-icon [icon]="icons.back" /> Bookings</a>

        @if (error() && !b()) { <div class="ad-alert ad-alert--error">{{ error() }}</div> }

        @if (b(); as b) {
            <div class="ad-page-head">
                <div>
                    <h1>{{ b.guest_name }} <span class="ad-mono ad-muted" style="font-size:15px;font-weight:500">{{ b.reference }}</span></h1>
                    <p class="ad-row">
                        <ad-status [status]="b.status" />
                        <span>{{ fmt.stay(b.check_in, b.check_out) }} · {{ b.nights }} {{ b.nights === 1 ? 'night' : 'nights' }}</span>
                        @if (b.source === 'admin') { <span class="ad-badge">Front desk</span> }
                    </p>
                </div>
                <div class="ad-page-head__actions">
                    @if (canManage) {
                        @if (b.status === 'confirmed') {
                            <button class="ad-btn ad-btn--primary" type="button" [disabled]="busy() || b.check_in > today" [title]="b.check_in > today ? 'Arrival is on ' + fmt.date(b.check_in) : ''" (click)="checkIn()">Check in</button>
                            <button class="ad-btn" type="button" [disabled]="busy() || b.check_in > today" (click)="noShow()">Mark no-show</button>
                        }
                        @if (b.status === 'checked_in') {
                            <button class="ad-btn ad-btn--primary" type="button" [disabled]="busy()" (click)="checkOut()">Check out</button>
                        }
                        @if (canCollect()) {
                            <button class="ad-btn" type="button" [disabled]="busy()" (click)="markPaid()">Record payment</button>
                        }
                    }
                    @if (canCancel) {
                        @if (canRefund()) {
                            <button class="ad-btn" type="button" [disabled]="busy()" (click)="refund()">Refund</button>
                        }
                        @if (b.status === 'pending' || b.status === 'confirmed') {
                            <button class="ad-btn ad-btn--danger" type="button" [disabled]="busy()" (click)="cancel()">Cancel booking</button>
                        }
                    }
                </div>
            </div>

            @if (b.status === 'pending' && b.hold_expires_at) {
                <div class="ad-alert" style="margin-bottom:16px">The guest is paying online. The room is held until {{ fmt.dateTime(b.hold_expires_at) }}; after that it is released automatically.</div>
            }
            @if (b.cancellation_reason) {
                <div class="ad-alert ad-alert--error" style="margin-bottom:16px">Cancelled {{ fmt.dateTime(b.cancelled_at) }}: {{ b.cancellation_reason }}</div>
            }

            <div class="ad-grid ad-grid--side">
                <div class="ad-stack">
                    <section class="ad-card">
                        <div class="ad-card__head"><h2>Stay</h2></div>
                        <div class="ad-card__body">
                            <dl class="ad-dl">
                                <dt>Room</dt><dd><strong>{{ b.room_number }}</strong> · {{ b.room_type?.name }}</dd>
                                <dt>Arrival</dt><dd>{{ fmt.date(b.check_in, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) }}</dd>
                                <dt>Departure</dt><dd>{{ fmt.date(b.check_out, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) }}</dd>
                                <dt>Guests</dt><dd>{{ b.adults }} {{ b.adults === 1 ? 'adult' : 'adults' }}@if (b.children) {, {{ b.children }} {{ b.children === 1 ? 'child' : 'children' }}}</dd>
                                @if (b.special_requests) { <dt>Requests</dt><dd style="white-space:pre-line">{{ b.special_requests }}</dd> }
                            </dl>
                        </div>
                    </section>

                    <section class="ad-card">
                        <div class="ad-card__head"><h2>Guest</h2></div>
                        <div class="ad-card__body">
                            <dl class="ad-dl">
                                <dt>Name</dt><dd>{{ b.guest_name }}</dd>
                                <dt>Email</dt><dd><a [href]="'mailto:' + b.guest_email">{{ b.guest_email }}</a></dd>
                                <dt>Phone</dt><dd>@if (b.guest_phone) { <a [href]="'tel:' + b.guest_phone">{{ b.guest_phone }}</a> } @else { <span class="ad-muted">—</span> }</dd>
                                <dt>Booked</dt><dd>{{ fmt.dateTime(b.created_at) }}</dd>
                            </dl>
                        </div>
                    </section>

                    <section class="ad-card">
                        <div class="ad-card__head"><h2>History</h2></div>
                        <div class="ad-table-wrap">
                            <table class="ad-table">
                                <tbody>
                                    @for (h of b.history; track $index) {
                                        <tr>
                                            <td class="nowrap muted">{{ fmt.dateTime(h.at) }}</td>
                                            <td><ad-status [status]="h.to" /></td>
                                            <td class="muted">{{ h.note }}</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>

                <section class="ad-card">
                    <div class="ad-card__head"><h2>Payment</h2>@if (b.payment) { <ad-status [status]="b.payment.status" /> }</div>
                    <div class="ad-card__body">
                        <table class="ad-table" style="font-size:13.5px">
                            <tbody>
                                @for (n of b.nightly_rates; track n.date) {
                                    <tr><td class="muted">{{ fmt.date(n.date, { weekday: 'short', day: 'numeric', month: 'short' }) }}</td><td class="num">{{ n.price | money: b.currency }}</td></tr>
                                }
                                @if (+b.taxes > 0) { <tr><td class="muted">Taxes</td><td class="num">{{ b.taxes | money: b.currency }}</td></tr> }
                                <tr><td class="strong">Total</td><td class="num strong">{{ b.total | money: b.currency }}</td></tr>
                                <tr><td class="muted">Paid</td><td class="num">{{ b.amount_paid | money: b.currency }}</td></tr>
                                @if (+b.amount_refunded > 0) { <tr><td class="muted">Refunded</td><td class="num">−{{ b.amount_refunded | money: b.currency }}</td></tr> }
                                <tr><td class="strong">Balance due</td><td class="num strong">{{ b.balance_due | money: b.currency }}</td></tr>
                            </tbody>
                        </table>
                        <p class="ad-muted" style="margin-top:12px;font-size:13px">
                            Method: {{ b.payment_method === 'paypal' ? 'PayPal (online)' : 'Pay at the hotel' }}
                        </p>
                    </div>
                </section>
            </div>
        } @else if (!error()) {
            <div class="ad-skeleton" style="height:60px;margin-bottom:16px"></div>
            <div class="ad-skeleton" style="height:320px"></div>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingDetailPage implements OnInit {
    private readonly API = inject(AdminApiService);
    private readonly ROUTE = inject(ActivatedRoute);
    private readonly CONFIRM = inject(ConfirmService);
    private readonly TOAST = inject(ToastService);
    private readonly AUTH = inject(AuthService);

    protected readonly icons = { back: faArrowLeft };
    protected readonly fmt = ADMIN_FORMAT;
    protected readonly today = STAY_DATES.today();
    protected readonly canManage = this.AUTH.can('bookings.manage');
    protected readonly canCancel = this.AUTH.can('bookings.cancel-any');

    protected readonly b = signal<StaffBooking | null>(null);
    protected readonly error = signal<string | null>(null);
    protected readonly busy = signal(false);

    protected readonly canCollect = computed(() => {
        const B = this.b();
        return !!B && B.payment?.gateway === 'pay_at_hotel' && B.payment.status === 'pending'
            && ['confirmed', 'checked_in', 'checked_out'].includes(B.status);
    });

    /** Money taken online that has not been refunded yet. */
    protected readonly refundable = computed(() => {
        const B = this.b();
        return B && B.payment_method === 'paypal' ? Math.max(0, +B.amount_paid - +B.amount_refunded) : 0;
    });
    protected readonly canRefund = computed(() => this.refundable() > 0.004);

    public ngOnInit(): void {
        const ID = Number(this.ROUTE.snapshot.paramMap.get('id'));
        this.API.booking(ID).subscribe({
            next: b => this.b.set(b),
            error: e => this.error.set(apiErrorMessage(e, 'Booking not found.')),
        });
    }

    protected checkIn(): void {
        this.run(this.API.setStatus(this.b()!.id, 'checked_in'), 'Guest checked in.');
    }

    protected async checkOut(): Promise<void> {
        const B = this.b()!;
        if (+B.balance_due > 0) {
            const OK = await this.CONFIRM.ask({
                title: 'Balance still open',
                message: `${new MoneyPipe().transform(B.balance_due, B.currency)} has not been recorded as paid. Check out anyway?`,
                confirmLabel: 'Check out',
            });
            if (!OK) return;
        }
        this.run(this.API.setStatus(B.id, 'checked_out'), 'Guest checked out.');
    }

    protected async noShow(): Promise<void> {
        const R = await this.CONFIRM.ask({
            title: 'Mark as no-show?',
            message: 'The guest did not arrive. The booking is closed and no refund is issued.',
            input: { label: 'Note (optional)' },
            confirmLabel: 'Mark no-show',
            danger: true,
        });
        if (R) this.run(this.API.setStatus(this.b()!.id, 'no_show', R.text), 'Marked as no-show.');
    }

    protected async markPaid(): Promise<void> {
        const B = this.b()!;
        const R = await this.CONFIRM.ask({
            title: 'Record payment',
            message: `Confirm the guest paid ${new MoneyPipe().transform(B.balance_due, B.currency)} at the desk (cash or card).`,
            confirmLabel: 'Payment received',
        });
        if (R) this.run(this.API.markPaid(B.id), 'Payment recorded.');
    }

    protected async cancel(): Promise<void> {
        const B = this.b()!;
        const PAID_ONLINE = this.refundable() > 0;
        const R = await this.CONFIRM.ask({
            title: `Cancel ${B.reference}?`,
            message: 'The room is released immediately and the guest receives a cancellation email.',
            input: { label: 'Reason', required: true },
            checkbox: PAID_ONLINE ? { label: `Refund ${new MoneyPipe().transform(this.refundable(), B.currency)} via PayPal`, checked: true } : undefined,
            confirmLabel: 'Cancel booking',
            danger: true,
        });
        if (!R) return;
        this.busy.set(true);
        this.API.cancelBooking(B.id, R.text, PAID_ONLINE && R.checked).subscribe({
            next: res => {
                this.busy.set(false);
                this.b.set(res.booking);
                this.TOAST.success(res.refunded_amount ? `Booking cancelled and ${new MoneyPipe().transform(res.refunded_amount, B.currency)} refunded.` : 'Booking cancelled.');
            },
            error: e => { this.busy.set(false); this.TOAST.error(apiErrorMessage(e)); },
        });
    }

    protected async refund(): Promise<void> {
        const B = this.b()!;
        const MAX = this.refundable();
        const R = await this.CONFIRM.ask({
            title: 'Refund via PayPal',
            message: `Up to ${new MoneyPipe().transform(MAX, B.currency)} can be refunded. Leave the amount empty to refund all of it. The booking stays active.`,
            input: { label: `Amount (${B.currency})`, value: '' },
            confirmLabel: 'Refund',
            danger: true,
        });
        if (!R) return;
        const AMOUNT = R.text ? Number(R.text.replace(',', '.')) : null;
        if (AMOUNT !== null && (!Number.isFinite(AMOUNT) || AMOUNT <= 0 || AMOUNT > MAX + 0.001)) {
            this.TOAST.error(`Enter an amount between 0.01 and ${MAX.toFixed(2)}.`);
            return;
        }
        this.busy.set(true);
        this.API.refund(B.id, AMOUNT).subscribe({
            next: res => {
                this.busy.set(false);
                this.b.set(res.booking);
                this.TOAST.success(`${new MoneyPipe().transform(res.refunded_amount, B.currency)} refunded.`);
            },
            error: e => { this.busy.set(false); this.TOAST.error(apiErrorMessage(e)); },
        });
    }

    private run(call: Observable<StaffBooking>, done: string): void {
        this.busy.set(true);
        call.subscribe({
            next: b => { this.busy.set(false); this.b.set(b); this.TOAST.success(done); },
            error: e => { this.busy.set(false); this.TOAST.error(apiErrorMessage(e)); },
        });
    }
}
