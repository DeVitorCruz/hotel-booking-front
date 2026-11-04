import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { STAY_DATES } from '@core/services/hotel/stay-dates';
import { AdminApiService } from '../core/admin-api.service';
import { AdminRoom, RoomBlock } from '../core/admin.models';
import { apiErrorMessage } from '../core/api-error';
import { ConfirmService } from '../core/confirm.service';
import { ToastService } from '../core/toast.service';
import { ADMIN_FORMAT } from '../shared/admin-format';

/** Take a room off sale for some nights (repairs, owner stay, deep clean…). */
@Component({
    selector: 'ad-blocks',
    imports: [ReactiveFormsModule],
    template: `
        <div class="ad-page-head">
            <div>
                <h1>Room blocks</h1>
                <p>Close a room for some nights. Blocked nights cannot be booked; existing bookings are never overwritten.</p>
            </div>
        </div>

        <div class="ad-grid ad-grid--side">
            <section class="ad-card">
                <div class="ad-card__head"><h2>Upcoming blocks</h2></div>
                @if (error()) { <div class="ad-card__body"><div class="ad-alert ad-alert--error">{{ error() }}</div></div> }
                @if (!loaded()) {
                    <div class="ad-card__body"><div class="ad-skeleton" style="height:140px"></div></div>
                } @else if (!blocks().length) {
                    <div class="ad-card__empty">No rooms are blocked.</div>
                } @else {
                    <div class="ad-table-wrap">
                        <table class="ad-table ad-table--stack">
                            <thead><tr><th>Room</th><th>Nights</th><th>Reason</th><th></th></tr></thead>
                            <tbody>
                                @for (b of blocks(); track b.id) {
                                    <tr>
                                        <td data-label="Room" class="strong">{{ b.room?.number }}</td>
                                        <td data-label="Nights" class="nowrap">{{ fmt.date(b.start_date) }} → {{ fmt.date(b.end_date) }} <span class="ad-muted">· {{ nights(b) }}n</span></td>
                                        <td data-label="Reason">{{ b.reason || '—' }}</td>
                                        <td class="actions"><button class="ad-btn ad-btn--sm ad-btn--danger" type="button" (click)="remove(b)">Remove</button></td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                }
            </section>

            <form class="ad-card" [formGroup]="form" (ngSubmit)="create()" novalidate>
                <div class="ad-card__head"><h2>Block a room</h2></div>
                <div class="ad-card__body ad-form">
                    <div class="ad-field">
                        <label for="bl-room">Room</label>
                        <select id="bl-room" class="ad-select" formControlName="room_id">
                            <option [ngValue]="0" disabled>Choose a room</option>
                            @for (r of rooms(); track r.id) { <option [ngValue]="r.id">{{ r.number }} · {{ r.room_type }}</option> }
                        </select>
                    </div>
                    <div class="ad-form-grid">
                        <div class="ad-field">
                            <label for="bl-start">From</label>
                            <input id="bl-start" class="ad-input" type="date" formControlName="start_date" />
                        </div>
                        <div class="ad-field">
                            <label for="bl-end">Until</label>
                            <input id="bl-end" class="ad-input" type="date" formControlName="end_date" [min]="form.controls.start_date.value" />
                            <span class="ad-field__hint">Room is free again this day.</span>
                        </div>
                    </div>
                    <div class="ad-field">
                        <label for="bl-reason">Reason</label>
                        <input id="bl-reason" class="ad-input" formControlName="reason" placeholder="Painting" />
                    </div>
                    @if (formError()) { <div class="ad-alert ad-alert--error" role="alert">{{ formError() }}</div> }
                    <button class="ad-btn ad-btn--primary" type="submit" [disabled]="saving()">{{ saving() ? 'Saving…' : 'Block room' }}</button>
                </div>
            </form>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlocksPage implements OnInit {
    private readonly API = inject(AdminApiService);
    private readonly TOAST = inject(ToastService);
    private readonly CONFIRM = inject(ConfirmService);

    protected readonly fmt = ADMIN_FORMAT;
    private readonly today = STAY_DATES.today();
    protected readonly blocks = signal<RoomBlock[]>([]);
    protected readonly rooms = signal<AdminRoom[]>([]);
    protected readonly loaded = signal(false);
    protected readonly error = signal<string | null>(null);
    protected readonly formError = signal<string | null>(null);
    protected readonly saving = signal(false);

    protected readonly form = inject(FormBuilder).nonNullable.group({
        room_id: [0, Validators.min(1)],
        start_date: [STAY_DATES.today(), Validators.required],
        end_date: [STAY_DATES.addDays(STAY_DATES.today(), 1), Validators.required],
        reason: [''],
    });

    public ngOnInit(): void {
        this.API.rooms().subscribe({ next: r => this.rooms.set(r), error: () => {} });
        this.load();
    }

    protected nights(b: RoomBlock): number {
        return STAY_DATES.nights(b.start_date, b.end_date);
    }

    private load(): void {
        this.API.blocks(this.today).subscribe({
            next: b => { this.blocks.set(b); this.loaded.set(true); },
            error: e => { this.error.set(apiErrorMessage(e)); this.loaded.set(true); },
        });
    }

    protected create(): void {
        this.formError.set(null);
        const V = this.form.getRawValue();
        if (!V.room_id) { this.formError.set('Choose a room.'); return; }
        if (!(V.end_date > V.start_date)) { this.formError.set('"Until" must be after "From".'); return; }
        this.saving.set(true);
        this.API.createBlock({ ...V, reason: V.reason || null }).subscribe({
            next: () => {
                this.saving.set(false);
                this.TOAST.success('Room blocked.');
                this.form.patchValue({ reason: '' });
                this.load();
            },
            error: e => { this.saving.set(false); this.formError.set(apiErrorMessage(e)); },
        });
    }

    protected async remove(b: RoomBlock): Promise<void> {
        if (!await this.CONFIRM.ask({ title: `Reopen room ${b.room?.number}?`, message: 'These nights become bookable again.', confirmLabel: 'Remove block' })) return;
        this.API.deleteBlock(b.id).subscribe({
            next: () => { this.TOAST.success('Block removed.'); this.load(); },
            error: e => this.TOAST.error(apiErrorMessage(e)),
        });
    }
}
