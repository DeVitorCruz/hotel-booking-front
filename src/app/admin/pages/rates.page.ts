import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { HotelApiService } from '@core/services/hotel/hotel-api.service';
import { MoneyPipe } from '@core/services/hotel/money.pipe';
import { STAY_DATES } from '@core/services/hotel/stay-dates';
import { AdminApiService } from '../core/admin-api.service';
import { AdminRoomType, RateOverride } from '../core/admin.models';
import { apiErrorMessage, apiFieldErrors } from '../core/api-error';
import { ConfirmService } from '../core/confirm.service';
import { ToastService } from '../core/toast.service';
import { ADMIN_FORMAT } from '../shared/admin-format';

@Component({
    selector: 'ad-rates',
    imports: [ReactiveFormsModule, MoneyPipe],
    template: `
        <div class="ad-page-head">
            <div>
                <h1>Seasonal rates</h1>
                <p>Special prices for dates like high season or holidays. Existing bookings keep the price they were sold at.</p>
            </div>
            @if (canManage && !editing()) {
                <div class="ad-page-head__actions"><button class="ad-btn ad-btn--primary" type="button" (click)="startNew()">Add rate</button></div>
            }
        </div>

        @if (editing(); as e) {
            <form class="ad-card" [formGroup]="form" (ngSubmit)="save()" novalidate style="margin-bottom:16px">
                <div class="ad-card__head"><h2>{{ e === 'new' ? 'Add seasonal rate' : 'Edit rate' }}</h2></div>
                <div class="ad-card__body ad-form">
                    <div class="ad-form-grid ad-form-grid--3">
                        <div class="ad-field">
                            <label for="rate-type">Room type</label>
                            <select id="rate-type" class="ad-select" formControlName="room_type_id">
                                @for (t of types(); track t.id) { <option [ngValue]="t.id">{{ t.name }} ({{ t.base_price | money: currency() }})</option> }
                            </select>
                        </div>
                        <div class="ad-field">
                            <label for="rate-label">Label</label>
                            <input id="rate-label" class="ad-input" formControlName="label" placeholder="High season" />
                        </div>
                        <div class="ad-field">
                            <label for="rate-price">Price per night ({{ currency() }})</label>
                            <input id="rate-price" class="ad-input" type="number" min="0" step="0.01" formControlName="price" />
                            @if (err()['price']) { <span class="ad-field__error">{{ err()['price'] }}</span> }
                        </div>
                        <div class="ad-field">
                            <label for="rate-start">First night</label>
                            <input id="rate-start" class="ad-input" type="date" formControlName="start_date" />
                        </div>
                        <div class="ad-field">
                            <label for="rate-end">Last night</label>
                            <input id="rate-end" class="ad-input" type="date" formControlName="end_date" [min]="form.controls.start_date.value" />
                            <span class="ad-field__hint">Included. A stay is charged per night.</span>
                            @if (err()['end_date']) { <span class="ad-field__error">{{ err()['end_date'] }}</span> }
                        </div>
                        <div class="ad-field">
                            <label for="rate-min">Minimum nights <span class="ad-muted">(optional)</span></label>
                            <input id="rate-min" class="ad-input" type="number" min="1" formControlName="min_nights" />
                        </div>
                        <div class="ad-field">
                            <label for="rate-prio">Priority</label>
                            <input id="rate-prio" class="ad-input" type="number" min="0" formControlName="priority" />
                            <span class="ad-field__hint">When rates overlap, the higher number wins.</span>
                        </div>
                    </div>
                    <div class="ad-form-actions">
                        <button class="ad-btn" type="button" (click)="editing.set(null)">Cancel</button>
                        <button class="ad-btn ad-btn--primary" type="submit" [disabled]="saving()">{{ saving() ? 'Saving…' : 'Save rate' }}</button>
                    </div>
                </div>
            </form>
        }

        <section class="ad-card">
            <div class="ad-toolbar">
                <select class="ad-select" aria-label="Filter by room type" [value]="filterType()" (change)="filterType.set(+$any($event.target).value)">
                    <option value="0">All room types</option>
                    @for (t of types(); track t.id) { <option [value]="t.id">{{ t.name }}</option> }
                </select>
                <label class="ad-check"><input type="checkbox" [checked]="showPast()" (change)="showPast.set(!showPast())" /> Show past rates</label>
            </div>
            @if (error()) { <div class="ad-card__body"><div class="ad-alert ad-alert--error">{{ error() }}</div></div> }
            @if (!loaded()) {
                <div class="ad-card__body"><div class="ad-skeleton" style="height:160px"></div></div>
            } @else if (!shown().length) {
                <div class="ad-card__empty">No seasonal rates — every night is charged at the room type's base price.</div>
            } @else {
                <div class="ad-table-wrap">
                    <table class="ad-table ad-table--stack">
                        <thead><tr><th>Dates</th><th>Room type</th><th>Label</th><th class="num">Price</th><th>Min nights</th><th>Priority</th>@if (canManage) { <th></th> }</tr></thead>
                        <tbody>
                            @for (r of shown(); track r.id) {
                                <tr [class.ad-muted]="r.end_date < today">
                                    <td data-label="Dates" class="nowrap">{{ fmt.date(r.start_date) }} – {{ fmt.date(r.end_date) }}</td>
                                    <td data-label="Room type">{{ r.room_type }}</td>
                                    <td data-label="Label">{{ r.label || '—' }}</td>
                                    <td data-label="Price" class="num strong">{{ r.price | money: currency() }}</td>
                                    <td data-label="Min nights">{{ r.min_nights || '—' }}</td>
                                    <td data-label="Priority">{{ r.priority }}</td>
                                    @if (canManage) {
                                        <td class="actions">
                                            <button class="ad-btn ad-btn--sm" type="button" (click)="startEdit(r)">Edit</button>
                                            <button class="ad-btn ad-btn--sm ad-btn--danger" type="button" (click)="remove(r)">Delete</button>
                                        </td>
                                    }
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            }
        </section>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatesPage implements OnInit {
    private readonly API = inject(AdminApiService);
    private readonly TOAST = inject(ToastService);
    private readonly CONFIRM = inject(ConfirmService);

    protected readonly fmt = ADMIN_FORMAT;
    protected readonly today = STAY_DATES.today();
    protected readonly canManage = inject(AuthService).can('rates.manage');
    protected readonly rates = signal<RateOverride[]>([]);
    protected readonly types = signal<AdminRoomType[]>([]);
    protected readonly currency = signal('USD');
    protected readonly loaded = signal(false);
    protected readonly error = signal<string | null>(null);
    protected readonly filterType = signal(Number(inject(ActivatedRoute).snapshot.queryParamMap.get('type')) || 0);
    protected readonly showPast = signal(false);
    protected readonly editing = signal<RateOverride | 'new' | null>(null);
    protected readonly saving = signal(false);
    protected readonly err = signal<Record<string, string>>({});

    protected readonly shown = computed(() => this.rates()
        .filter(r => !this.filterType() || r.room_type_id === this.filterType())
        .filter(r => this.showPast() || r.end_date >= this.today));

    protected readonly form = inject(FormBuilder).group({
        room_type_id: [0, Validators.min(1)],
        label: [''],
        start_date: [this.today, Validators.required],
        end_date: [STAY_DATES.addDays(this.today, 6), Validators.required],
        price: [null as number | null, [Validators.required, Validators.min(0)]],
        min_nights: [null as number | null],
        priority: [0],
    });

    constructor() {
        inject(HotelApiService).hotel().subscribe({ next: h => this.currency.set(h.currency), error: () => {} });
    }

    public ngOnInit(): void {
        this.API.roomTypes().subscribe({ next: t => this.types.set(t), error: () => {} });
        this.load();
    }

    private load(): void {
        this.API.rates().subscribe({
            next: r => { this.rates.set(r); this.loaded.set(true); },
            error: e => { this.error.set(apiErrorMessage(e)); this.loaded.set(true); },
        });
    }

    protected startNew(): void {
        const TYPE = this.types().find(t => t.id === this.filterType()) ?? this.types()[0];
        this.err.set({});
        this.form.reset({
            room_type_id: TYPE?.id ?? 0, label: '', start_date: this.today, end_date: STAY_DATES.addDays(this.today, 6),
            price: TYPE ? Number(TYPE.base_price) : null, min_nights: null, priority: 0,
        });
        this.editing.set('new');
    }

    protected startEdit(r: RateOverride): void {
        this.err.set({});
        this.form.reset({
            room_type_id: r.room_type_id, label: r.label ?? '', start_date: r.start_date, end_date: r.end_date,
            price: Number(r.price), min_nights: r.min_nights, priority: r.priority,
        });
        this.editing.set(r);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    protected save(): void {
        if (this.form.invalid) { this.form.markAllAsTouched(); return; }
        const V = this.form.getRawValue();
        if (V.end_date! < V.start_date!) { this.err.set({ end_date: 'The last night must be on or after the first night.' }); return; }
        const BODY = { ...V, label: V.label || null, min_nights: V.min_nights || null, priority: V.priority ?? 0 } as unknown as Partial<RateOverride>;
        const E = this.editing();
        this.saving.set(true);
        const CALL = E === 'new' ? this.API.createRate(BODY) : this.API.updateRate((E as RateOverride).id, BODY);
        CALL.subscribe({
            next: () => { this.saving.set(false); this.editing.set(null); this.TOAST.success('Rate saved.'); this.load(); },
            error: e => { this.saving.set(false); this.err.set(apiFieldErrors(e)); this.TOAST.error(apiErrorMessage(e)); },
        });
    }

    protected async remove(r: RateOverride): Promise<void> {
        if (!await this.CONFIRM.ask({ title: 'Delete this rate?', message: `${r.label || 'Special rate'} · ${r.room_type}`, confirmLabel: 'Delete', danger: true })) return;
        this.API.deleteRate(r.id).subscribe({
            next: () => { this.TOAST.success('Rate deleted.'); this.load(); },
            error: e => this.TOAST.error(apiErrorMessage(e)),
        });
    }
}
