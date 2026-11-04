import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HotelApiService } from '@core/services/hotel/hotel-api.service';
import { AdminApiService } from '../core/admin-api.service';
import { HotelSettingsData, PaymentMethod } from '../core/admin.models';
import { apiErrorMessage, apiFieldErrors } from '../core/api-error';
import { ToastService } from '../core/toast.service';

/** Currencies PayPal accepts (subset most hotels use). */
const PAYPAL_CURRENCIES = ['USD', 'EUR', 'GBP', 'BRL', 'CAD', 'AUD', 'MXN', 'JPY', 'CHF', 'SEK', 'NOK', 'DKK', 'PLN', 'CZK', 'HUF', 'NZD', 'SGD', 'HKD', 'THB', 'PHP', 'ILS', 'TWD'];

@Component({
    selector: 'ad-settings',
    imports: [ReactiveFormsModule],
    template: `
        <div class="ad-page-head">
            <div>
                <h1>Hotel settings</h1>
                <p>Changes apply to the website immediately. Existing bookings keep their prices and terms.</p>
            </div>
        </div>

        @if (loadError()) { <div class="ad-alert ad-alert--error">{{ loadError() }}</div> }

        @if (loaded()) {
            <form class="ad-stack" [formGroup]="form" (ngSubmit)="save()" novalidate>
                <section class="ad-card">
                    <div class="ad-card__head"><h2>Hotel</h2></div>
                    <div class="ad-card__body ad-form-grid">
                        <div class="ad-field">
                            <label for="st-name">Hotel name</label>
                            <input id="st-name" class="ad-input" formControlName="name" />
                            @if (err()['name']) { <span class="ad-field__error">{{ err()['name'] }}</span> }
                        </div>
                        <div class="ad-field">
                            <label for="st-email">Reservations email</label>
                            <input id="st-email" class="ad-input" type="email" formControlName="email" />
                            <span class="ad-field__hint">Shown to guests and used as reply-to on emails.</span>
                            @if (err()['email']) { <span class="ad-field__error">{{ err()['email'] }}</span> }
                        </div>
                        <div class="ad-field">
                            <label for="st-phone">Phone</label>
                            <input id="st-phone" class="ad-input" type="tel" formControlName="phone" />
                        </div>
                        <div class="ad-field">
                            <label for="st-address">Address</label>
                            <input id="st-address" class="ad-input" formControlName="address" />
                        </div>
                    </div>
                </section>

                <section class="ad-card">
                    <div class="ad-card__head"><h2>Stays</h2></div>
                    <div class="ad-card__body ad-form-grid ad-form-grid--3">
                        <div class="ad-field">
                            <label for="st-tz">Time zone</label>
                            <input id="st-tz" class="ad-input" formControlName="timezone" list="st-tz-list" autocomplete="off" />
                            <datalist id="st-tz-list">@for (z of zones; track z) { <option [value]="z"></option> }</datalist>
                            <span class="ad-field__hint">Decides when "today" starts for bookings.</span>
                            @if (err()['timezone']) { <span class="ad-field__error">{{ err()['timezone'] }}</span> }
                        </div>
                        <div class="ad-field">
                            <label for="st-in">Check-in from</label>
                            <input id="st-in" class="ad-input" type="time" formControlName="check_in_time" />
                        </div>
                        <div class="ad-field">
                            <label for="st-out">Check-out until</label>
                            <input id="st-out" class="ad-input" type="time" formControlName="check_out_time" />
                        </div>
                        <div class="ad-field">
                            <label for="st-min">Minimum nights</label>
                            <input id="st-min" class="ad-input" type="number" min="1" formControlName="min_nights" />
                        </div>
                        <div class="ad-field">
                            <label for="st-max">Maximum nights</label>
                            <input id="st-max" class="ad-input" type="number" min="1" formControlName="max_nights" />
                        </div>
                        <div class="ad-field">
                            <label for="st-adv">Book up to (days ahead)</label>
                            <input id="st-adv" class="ad-input" type="number" min="1" formControlName="max_advance_days" />
                        </div>
                    </div>
                </section>

                <section class="ad-card">
                    <div class="ad-card__head"><h2>Prices & payment</h2></div>
                    <div class="ad-card__body ad-form">
                        <div class="ad-form-grid ad-form-grid--3">
                            <div class="ad-field">
                                <label for="st-cur">Currency</label>
                                <select id="st-cur" class="ad-select" formControlName="currency">
                                    @for (c of currencies; track c) { <option [value]="c">{{ c }}</option> }
                                </select>
                                <span class="ad-field__hint">Room prices are not converted when you change it.</span>
                            </div>
                            <div class="ad-field">
                                <label for="st-tax">Taxes (%)</label>
                                <input id="st-tax" class="ad-input" type="number" min="0" max="100" step="0.01" formControlName="tax_percent" />
                                <span class="ad-field__hint">Added on top of the room price.</span>
                            </div>
                            <div class="ad-field">
                                <label for="st-dep">Online deposit (%)</label>
                                <input id="st-dep" class="ad-input" type="number" min="0" max="100" formControlName="deposit_percent" />
                                <span class="ad-field__hint">Share paid by PayPal when booking. 100 = full prepayment.</span>
                            </div>
                        </div>
                        <div class="ad-field">
                            <span class="ad-field__label">Payment options on the website</span>
                            <label class="ad-check"><input type="checkbox" [checked]="methods().includes('paypal')" (change)="toggleMethod('paypal')" /> PayPal (card or PayPal account)</label>
                            <label class="ad-check"><input type="checkbox" [checked]="methods().includes('pay_at_hotel')" (change)="toggleMethod('pay_at_hotel')" /> Pay at the hotel</label>
                            <span class="ad-field__hint">PayPal keys are set on the server (.env), not here.</span>
                        </div>
                        <div class="ad-form-grid">
                            <div class="ad-field">
                                <label for="st-hold">Hold a room while paying (minutes)</label>
                                <input id="st-hold" class="ad-input" type="number" min="5" max="120" formControlName="hold_minutes" />
                            </div>
                        </div>
                    </div>
                </section>

                <section class="ad-card">
                    <div class="ad-card__head"><h2>Cancellation</h2></div>
                    <div class="ad-card__body ad-form">
                        <div class="ad-form-grid">
                            <div class="ad-field">
                                <label for="st-cxl">Free cancellation until (hours before check-in)</label>
                                <input id="st-cxl" class="ad-input" type="number" min="0" formControlName="cancellation_hours" />
                            </div>
                        </div>
                        <label class="ad-check"><input type="checkbox" formControlName="auto_refund_on_cancel" /> Refund PayPal payments automatically when a guest cancels in time</label>
                    </div>
                </section>

                <div class="ad-form-actions" style="position:sticky;bottom:0;padding:12px 0;background:var(--ad-bg)">
                    @if (form.dirty || methodsDirty()) { <span class="ad-muted" style="align-self:center">Unsaved changes</span> }
                    <button class="ad-btn ad-btn--primary" type="submit" [disabled]="saving()">{{ saving() ? 'Saving…' : 'Save settings' }}</button>
                </div>
            </form>
        } @else if (!loadError()) {
            <div class="ad-skeleton" style="height:420px"></div>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPage implements OnInit {
    private readonly API = inject(AdminApiService);
    private readonly HOTEL = inject(HotelApiService);
    private readonly TOAST = inject(ToastService);

    protected readonly zones: string[] = (Intl as any).supportedValuesOf?.('timeZone') ?? [];
    protected currencies = [...PAYPAL_CURRENCIES];
    protected readonly loaded = signal(false);
    protected readonly loadError = signal<string | null>(null);
    protected readonly saving = signal(false);
    protected readonly err = signal<Record<string, string>>({});
    protected readonly methods = signal<PaymentMethod[]>([]);
    protected readonly methodsDirty = signal(false);

    protected readonly form = inject(FormBuilder).nonNullable.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: [''],
        address: [''],
        timezone: ['UTC', Validators.required],
        currency: ['USD', Validators.required],
        check_in_time: ['14:00'],
        check_out_time: ['11:00'],
        tax_percent: [0],
        deposit_percent: [100],
        min_nights: [1],
        max_nights: [30],
        max_advance_days: [365],
        hold_minutes: [15],
        cancellation_hours: [48],
        auto_refund_on_cancel: [true],
    });

    public ngOnInit(): void {
        this.API.settings().subscribe({
            next: s => this.fill(s),
            error: e => this.loadError.set(apiErrorMessage(e)),
        });
    }

    private fill(s: HotelSettingsData): void {
        if (!this.currencies.includes(s.currency)) this.currencies = [s.currency, ...this.currencies];
        this.form.reset({ ...s, phone: s.phone ?? '', address: s.address ?? '' });
        this.methods.set([...s.payment_methods]);
        this.methodsDirty.set(false);
        this.loaded.set(true);
    }

    protected toggleMethod(m: PaymentMethod): void {
        this.methods.update(list => list.includes(m) ? list.filter(x => x !== m) : [...list, m]);
        this.methodsDirty.set(true);
    }

    protected save(): void {
        this.err.set({});
        if (this.form.invalid) { this.form.markAllAsTouched(); this.TOAST.error('Check the highlighted fields.'); return; }
        if (!this.methods().length) { this.TOAST.error('Keep at least one payment option on.'); return; }
        const V = this.form.getRawValue();
        this.saving.set(true);
        this.API.saveSettings({ ...V, phone: V.phone || null, address: V.address || null, payment_methods: this.methods() }).subscribe({
            next: s => {
                this.saving.set(false);
                this.fill(s);
                this.HOTEL.forgetHotel();
                this.TOAST.success('Settings saved.');
            },
            error: e => { this.saving.set(false); this.err.set(apiFieldErrors(e)); this.TOAST.error(apiErrorMessage(e)); },
        });
    }
}
