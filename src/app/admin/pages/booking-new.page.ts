import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { AvailabilityResult } from '@core/models/hotel/hotel.models';
import { HotelApiService } from '@core/services/hotel/hotel-api.service';
import { MoneyPipe } from '@core/services/hotel/money.pipe';
import { STAY_DATES } from '@core/services/hotel/stay-dates';
import { debounceTime } from 'rxjs';
import { AdminApiService } from '../core/admin-api.service';
import { AdminRoomType } from '../core/admin.models';
import { apiErrorMessage, apiFieldErrors } from '../core/api-error';
import { ToastService } from '../core/toast.service';
import { ADMIN_FORMAT } from '../shared/admin-format';

/** Phone / walk-in booking: confirmed at once, paid at the hotel. */
@Component({
    selector: 'ad-booking-new',
    imports: [ReactiveFormsModule, RouterLink, FaIconComponent, MoneyPipe],
    template: `
        <a class="ad-back" routerLink="/admin/bookings"><fa-icon [icon]="icons.back" /> Bookings</a>
        <div class="ad-page-head">
            <div>
                <h1>New booking</h1>
                <p>For phone and walk-in guests. Confirmed immediately; the guest pays at the hotel.</p>
            </div>
        </div>

        <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
            <div class="ad-grid ad-grid--side">
                <div class="ad-stack">
                    <section class="ad-card">
                        <div class="ad-card__head"><h2>Stay</h2></div>
                        <div class="ad-card__body ad-form-grid ad-form-grid--4">
                            <div class="ad-field">
                                <label for="nb-in">Check-in</label>
                                <input id="nb-in" class="ad-input" type="date" formControlName="check_in" [min]="today" />
                            </div>
                            <div class="ad-field">
                                <label for="nb-out">Check-out</label>
                                <input id="nb-out" class="ad-input" type="date" formControlName="check_out" [min]="form.controls.check_in.value" />
                            </div>
                            <div class="ad-field">
                                <label for="nb-ad">Adults</label>
                                <input id="nb-ad" class="ad-input" type="number" min="1" max="20" formControlName="adults" />
                            </div>
                            <div class="ad-field">
                                <label for="nb-ch">Children</label>
                                <input id="nb-ch" class="ad-input" type="number" min="0" max="20" formControlName="children" />
                            </div>
                        </div>
                    </section>

                    <section class="ad-card">
                        <div class="ad-card__head"><h2>Room type</h2><span class="ad-muted">{{ nights() }} {{ nights() === 1 ? 'night' : 'nights' }}</span></div>
                        @if (searchError()) { <div class="ad-card__body"><div class="ad-alert ad-alert--error">{{ searchError() }}</div></div> }
                        <div class="nb-types">
                            @for (t of types(); track t.id) {
                                @let r = result(t.id);
                                <label class="nb-type" [class.is-selected]="form.controls.room_type_id.value === t.id" [class.is-off]="!r">
                                    <input type="radio" formControlName="room_type_id" [value]="t.id" [attr.disabled]="!r ? true : null" />
                                    <span class="nb-type__main">
                                        <strong>{{ t.name }}</strong>
                                        <span class="ad-muted">Up to {{ t.max_adults }} {{ t.max_adults === 1 ? 'adult' : 'adults' }}{{ t.max_children ? ', ' + t.max_children + (t.max_children === 1 ? ' child' : ' children') : '' }}</span>
                                    </span>
                                    <span class="nb-type__side">
                                        @if (searching()) { <span class="ad-muted">Checking…</span> }
                                        @else if (r) {
                                            <strong>{{ r.quote.total | money: r.quote.currency }}</strong>
                                            <span class="ad-muted">{{ r.available }} free</span>
                                        } @else { <span class="ad-muted">{{ fits(t) ? 'Full' : 'Too many guests' }}</span> }
                                    </span>
                                </label>
                            } @empty {
                                <div class="ad-card__empty">No room types yet. <a routerLink="/admin/room-types/new">Create one</a>.</div>
                            }
                        </div>
                    </section>

                    <section class="ad-card">
                        <div class="ad-card__head"><h2>Guest</h2></div>
                        <div class="ad-card__body ad-form-grid">
                            <div class="ad-field">
                                <label for="nb-name">Full name</label>
                                <input id="nb-name" class="ad-input" formControlName="guest_name" autocomplete="off" />
                                @if (fieldErrors()['guest_name']) { <span class="ad-field__error">{{ fieldErrors()['guest_name'] }}</span> }
                            </div>
                            <div class="ad-field">
                                <label for="nb-email">Email</label>
                                <input id="nb-email" class="ad-input" type="email" formControlName="guest_email" autocomplete="off" />
                                <span class="ad-field__hint">The confirmation is sent here.</span>
                                @if (fieldErrors()['guest_email']) { <span class="ad-field__error">{{ fieldErrors()['guest_email'] }}</span> }
                            </div>
                            <div class="ad-field">
                                <label for="nb-phone">Phone <span class="ad-muted">(optional)</span></label>
                                <input id="nb-phone" class="ad-input" type="tel" formControlName="guest_phone" autocomplete="off" />
                            </div>
                            <div class="ad-field span-all">
                                <label for="nb-req">Requests / notes <span class="ad-muted">(optional)</span></label>
                                <textarea id="nb-req" class="ad-textarea" formControlName="special_requests"></textarea>
                            </div>
                        </div>
                    </section>
                </div>

                <aside class="ad-card nb-summary">
                    <div class="ad-card__head"><h2>Summary</h2></div>
                    <div class="ad-card__body">
                        @if (selected(); as s) {
                            <p class="strong">{{ s.room_type.name }}</p>
                            <p class="ad-muted" style="margin:4px 0 12px">{{ fmt.stay(form.controls.check_in.value, form.controls.check_out.value) }}</p>
                            <table class="ad-table">
                                <tbody>
                                    <tr><td class="muted">{{ s.quote.nights }} × avg {{ s.quote.average_nightly | money: s.quote.currency }}</td><td class="num">{{ s.quote.subtotal | money: s.quote.currency }}</td></tr>
                                    @if (+s.quote.taxes > 0) { <tr><td class="muted">Taxes</td><td class="num">{{ s.quote.taxes | money: s.quote.currency }}</td></tr> }
                                    <tr><td class="strong">Total, paid at hotel</td><td class="num strong">{{ s.quote.total | money: s.quote.currency }}</td></tr>
                                </tbody>
                            </table>
                        } @else {
                            <p class="ad-muted">Choose dates and a room type with free rooms.</p>
                        }
                        @if (error()) { <div class="ad-alert ad-alert--error" role="alert" style="margin-top:12px">{{ error() }}</div> }
                        <button class="ad-btn ad-btn--primary ad-btn--block" type="submit" style="margin-top:16px;min-height:42px" [disabled]="saving() || !selected()">
                            {{ saving() ? 'Booking…' : 'Confirm booking' }}
                        </button>
                    </div>
                </aside>
            </div>
        </form>
    `,
    styles: [`
        .nb-types { display:flex; flex-direction:column; }
        .nb-type { display:flex; align-items:center; gap:12px; padding:12px 18px; border-bottom:1px solid var(--ad-line); cursor:pointer; }
        .nb-type:last-child { border-bottom:0; }
        .nb-type input { accent-color:var(--ad-brand); width:16px; height:16px; flex:none; }
        .nb-type.is-selected { background:#f4f6ee; }
        .nb-type.is-off { cursor:not-allowed; opacity:.6; }
        .nb-type__main, .nb-type__side { display:flex; flex-direction:column; line-height:1.35; }
        .nb-type__main { flex:1; min-width:0; }
        .nb-type__side { text-align:right; font-variant-numeric:tabular-nums; }
        .nb-summary { position:sticky; top:76px; }
        @media (max-width: 1099px) { .nb-summary { position:static; } }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingNewPage implements OnInit {
    private readonly API = inject(AdminApiService);
    private readonly HOTEL = inject(HotelApiService);
    private readonly ROUTER = inject(Router);
    private readonly ROUTE = inject(ActivatedRoute);
    private readonly TOAST = inject(ToastService);
    private readonly DESTROY = inject(DestroyRef);

    protected readonly icons = { back: faArrowLeft };
    protected readonly fmt = ADMIN_FORMAT;
    protected readonly today = STAY_DATES.today();

    protected readonly types = signal<AdminRoomType[]>([]);
    protected readonly results = signal<AvailabilityResult[]>([]);
    protected readonly searching = signal(false);
    protected readonly searchError = signal<string | null>(null);
    protected readonly saving = signal(false);
    protected readonly error = signal<string | null>(null);
    protected readonly fieldErrors = signal<Record<string, string>>({});

    protected readonly form = inject(FormBuilder).nonNullable.group({
        check_in: [this.today, Validators.required],
        check_out: [STAY_DATES.addDays(this.today, 1), Validators.required],
        adults: [2, [Validators.required, Validators.min(1)]],
        children: [0, [Validators.min(0)]],
        room_type_id: [0, Validators.min(1)],
        guest_name: ['', Validators.required],
        guest_email: ['', [Validators.required, Validators.email]],
        guest_phone: [''],
        special_requests: [''],
    });

    private readonly value = signal(this.form.getRawValue());
    protected readonly nights = computed(() => Math.max(0, STAY_DATES.nights(this.value().check_in, this.value().check_out)));
    protected readonly selected = computed(() => this.results().find(r => r.room_type.id === this.value().room_type_id) ?? null);

    public ngOnInit(): void {
        const Q = this.ROUTE.snapshot.queryParamMap;
        if (STAY_DATES.isValidIso(Q.get('check_in')) && Q.get('check_in')! >= this.today) {
            const IN = Q.get('check_in')!;
            const OUT = STAY_DATES.isValidIso(Q.get('check_out')) && Q.get('check_out')! > IN ? Q.get('check_out')! : STAY_DATES.addDays(IN, 1);
            this.form.patchValue({ check_in: IN, check_out: OUT });
        }
        if (Number(Q.get('room_type_id'))) this.form.patchValue({ room_type_id: Number(Q.get('room_type_id')) });
        this.value.set(this.form.getRawValue());

        this.API.roomTypes().subscribe({ next: t => this.types.set(t.filter(x => x.is_active)), error: e => this.searchError.set(apiErrorMessage(e)) });

        // Keep check-out after check-in
        this.form.controls.check_in.valueChanges.pipe(takeUntilDestroyed(this.DESTROY)).subscribe(IN => {
            if (STAY_DATES.isValidIso(IN) && this.form.controls.check_out.value <= IN) {
                this.form.controls.check_out.setValue(STAY_DATES.addDays(IN, 1));
            }
        });

        this.form.valueChanges.pipe(takeUntilDestroyed(this.DESTROY)).subscribe(() => this.value.set(this.form.getRawValue()));
        this.form.valueChanges.pipe(debounceTime(250), takeUntilDestroyed(this.DESTROY)).subscribe(() => this.searchIfChanged());
        this.searchIfChanged();
    }

    protected result(typeId: number): AvailabilityResult | undefined {
        return this.results().find(r => r.room_type.id === typeId);
    }

    protected fits(t: AdminRoomType): boolean {
        const V = this.value();
        return V.adults <= t.max_adults && V.children <= t.max_children && V.adults + V.children <= t.max_occupancy;
    }

    private lastKey = '';
    private searchIfChanged(): void {
        const V = this.form.getRawValue();
        const KEY = `${V.check_in}|${V.check_out}|${V.adults}|${V.children}`;
        if (KEY === this.lastKey) return;
        this.lastKey = KEY;

        if (!STAY_DATES.isValidIso(V.check_in) || !STAY_DATES.isValidIso(V.check_out) || V.check_out <= V.check_in || V.adults < 1) {
            this.results.set([]);
            return;
        }
        this.searching.set(true);
        this.searchError.set(null);
        this.HOTEL.availability({ check_in: V.check_in, check_out: V.check_out, adults: V.adults, children: V.children || 0 }).subscribe({
            next: res => {
                if (KEY !== this.lastKey) return;
                this.searching.set(false);
                this.results.set(res.results);
                // Drop a selection that is no longer available
                if (!res.results.some(r => r.room_type.id === this.form.controls.room_type_id.value)) {
                    this.form.controls.room_type_id.setValue(res.results.length === 1 ? res.results[0].room_type.id : 0, { emitEvent: true });
                }
            },
            error: e => {
                if (KEY !== this.lastKey) return;
                this.searching.set(false);
                this.results.set([]);
                this.searchError.set(HotelApiService.toApiError(e).message);
            },
        });
    }

    protected submit(): void {
        this.error.set(null);
        this.fieldErrors.set({});
        if (this.form.invalid || !this.selected()) {
            this.form.markAllAsTouched();
            this.error.set(!this.selected() ? 'Choose a room type with free rooms.' : 'Fill in the guest name and a valid email.');
            return;
        }
        const V = this.form.getRawValue();
        this.saving.set(true);
        this.API.createBooking({
            ...V,
            children: V.children || 0,
            guest_phone: V.guest_phone || null,
            special_requests: V.special_requests || null,
        }).subscribe({
            next: b => {
                this.TOAST.success(`Booking ${b.reference} confirmed — room ${b.room_number}.`);
                this.ROUTER.navigate(['/admin/bookings', b.id]);
            },
            error: e => {
                this.saving.set(false);
                this.fieldErrors.set(apiFieldErrors(e));
                this.error.set(apiErrorMessage(e));
                this.lastKey = '';
                this.searchIfChanged();
            },
        });
    }
}
