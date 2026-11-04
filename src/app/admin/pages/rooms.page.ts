import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { AdminApiService } from '../core/admin-api.service';
import { AdminRoom, AdminRoomType, RoomStatus } from '../core/admin.models';
import { apiErrorMessage, apiFieldErrors } from '../core/api-error';
import { ConfirmService } from '../core/confirm.service';
import { ToastService } from '../core/toast.service';
import { StatusBadgeComponent } from '../shared/status-badge.component';

@Component({
    selector: 'ad-rooms',
    imports: [ReactiveFormsModule, RouterLink, StatusBadgeComponent],
    template: `
        <div class="ad-page-head">
            <div>
                <h1>Rooms</h1>
                <p>The physical rooms. Guests book a room type; the system picks a free room of that type.</p>
            </div>
            @if (canManage && !editing()) {
                <div class="ad-page-head__actions"><button class="ad-btn ad-btn--primary" type="button" (click)="startNew()">Add room</button></div>
            }
        </div>

        @if (editing(); as e) {
            <form class="ad-card" [formGroup]="form" (ngSubmit)="save()" novalidate style="margin-bottom:16px">
                <div class="ad-card__head"><h2>{{ e === 'new' ? 'Add room' : 'Edit room ' + e.number }}</h2></div>
                <div class="ad-card__body ad-form">
                    <div class="ad-form-grid ad-form-grid--4">
                        <div class="ad-field">
                            <label for="rm-number">Room number / name</label>
                            <input id="rm-number" class="ad-input" formControlName="number" placeholder="101" />
                            @if (err()['number']) { <span class="ad-field__error">{{ err()['number'] }}</span> }
                        </div>
                        <div class="ad-field">
                            <label for="rm-type">Room type</label>
                            <select id="rm-type" class="ad-select" formControlName="room_type_id">
                                @for (t of types(); track t.id) { <option [ngValue]="t.id">{{ t.name }}</option> }
                            </select>
                            @if (err()['room_type_id']) { <span class="ad-field__error">{{ err()['room_type_id'] }}</span> }
                        </div>
                        <div class="ad-field">
                            <label for="rm-floor">Floor <span class="ad-muted">(optional)</span></label>
                            <input id="rm-floor" class="ad-input" formControlName="floor" />
                        </div>
                        <div class="ad-field">
                            <label for="rm-status">Status</label>
                            <select id="rm-status" class="ad-select" formControlName="status">
                                <option value="active">Active (on sale)</option>
                                <option value="maintenance">Maintenance</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                    <div class="ad-field">
                        <label for="rm-notes">Notes <span class="ad-muted">(staff only)</span></label>
                        <input id="rm-notes" class="ad-input" formControlName="notes" placeholder="Sea view, accessible bathroom…" />
                    </div>
                    <div class="ad-form-actions">
                        <button class="ad-btn" type="button" (click)="editing.set(null)">Cancel</button>
                        <button class="ad-btn ad-btn--primary" type="submit" [disabled]="saving()">{{ saving() ? 'Saving…' : 'Save room' }}</button>
                    </div>
                </div>
            </form>
        }

        <section class="ad-card">
            <div class="ad-toolbar">
                <label class="ad-row ad-muted" style="gap:8px">Type
                    <select class="ad-select" aria-label="Filter by room type" [value]="filterType()" (change)="filterType.set(+$any($event.target).value)">
                        <option value="0">All room types</option>
                        @for (t of types(); track t.id) { <option [value]="t.id">{{ t.name }}</option> }
                    </select>
                </label>
                <span class="ad-spacer"></span>
                <span class="ad-muted">{{ activeCount() }} of {{ shown().length }} on sale</span>
            </div>

            @if (error()) { <div class="ad-card__body"><div class="ad-alert ad-alert--error">{{ error() }}</div></div> }

            @if (!loaded()) {
                <div class="ad-card__body"><div class="ad-skeleton" style="height:200px"></div></div>
            } @else if (!types().length) {
                <div class="ad-card__empty">Create a <a routerLink="/admin/room-types/new">room type</a> first.</div>
            } @else if (!shown().length) {
                <div class="ad-card__empty">No rooms yet.</div>
            } @else {
                <div class="ad-table-wrap">
                    <table class="ad-table ad-table--stack">
                        <thead><tr><th>Room</th><th>Type</th><th>Floor</th><th>Notes</th><th>Status</th>@if (canManage) { <th></th> }</tr></thead>
                        <tbody>
                            @for (r of shown(); track r.id) {
                                <tr>
                                    <td data-label="Room" class="strong">{{ r.number }}</td>
                                    <td data-label="Type">{{ r.room_type }}</td>
                                    <td data-label="Floor" class="muted">{{ r.floor || '—' }}</td>
                                    <td data-label="Notes" class="muted">{{ r.notes || '—' }}</td>
                                    <td data-label="Status">
                                        @if (canManage) {
                                            <select class="ad-select" style="width:auto;min-height:30px;padding:3px 8px" [attr.aria-label]="'Status of room ' + r.number"
                                                    [value]="r.status" (change)="setStatus(r, $any($event.target).value)">
                                                <option value="active">Active</option>
                                                <option value="maintenance">Maintenance</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        } @else { <ad-status [status]="r.status" /> }
                                    </td>
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
export class RoomsPage implements OnInit {
    private readonly API = inject(AdminApiService);
    private readonly TOAST = inject(ToastService);
    private readonly CONFIRM = inject(ConfirmService);

    protected readonly canManage = inject(AuthService).can('rooms.manage');
    protected readonly rooms = signal<AdminRoom[]>([]);
    protected readonly types = signal<AdminRoomType[]>([]);
    protected readonly loaded = signal(false);
    protected readonly error = signal<string | null>(null);
    protected readonly filterType = signal(Number(inject(ActivatedRoute).snapshot.queryParamMap.get('type')) || 0);
    protected readonly editing = signal<AdminRoom | 'new' | null>(null);
    protected readonly saving = signal(false);
    protected readonly err = signal<Record<string, string>>({});

    protected readonly shown = computed(() => this.filterType() ? this.rooms().filter(r => r.room_type_id === this.filterType()) : this.rooms());
    protected readonly activeCount = computed(() => this.shown().filter(r => r.status === 'active').length);

    protected readonly form = inject(FormBuilder).nonNullable.group({
        number: ['', Validators.required],
        room_type_id: [0, Validators.min(1)],
        floor: [''],
        status: ['active' as RoomStatus],
        notes: [''],
    });

    public ngOnInit(): void {
        this.API.roomTypes().subscribe({ next: t => { this.types.set(t); this.loadRooms(); }, error: e => { this.error.set(apiErrorMessage(e)); this.loaded.set(true); } });
    }

    private loadRooms(): void {
        this.API.rooms().subscribe({
            next: r => { this.rooms.set(r); this.loaded.set(true); },
            error: e => { this.error.set(apiErrorMessage(e)); this.loaded.set(true); },
        });
    }

    protected startNew(): void {
        this.err.set({});
        this.form.reset({ number: this.suggestNumber(), room_type_id: this.filterType() || this.types()[0]?.id || 0, floor: '', status: 'active', notes: '' });
        this.editing.set('new');
    }

    protected startEdit(r: AdminRoom): void {
        this.err.set({});
        this.form.reset({ number: r.number, room_type_id: r.room_type_id, floor: r.floor ?? '', status: r.status, notes: r.notes ?? '' });
        this.editing.set(r);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    protected save(): void {
        if (this.form.invalid) { this.form.markAllAsTouched(); return; }
        const V = this.form.getRawValue();
        const BODY = { ...V, floor: V.floor || null, notes: V.notes || null };
        const E = this.editing();
        this.saving.set(true);
        const CALL = E === 'new' ? this.API.createRoom(BODY) : this.API.updateRoom((E as AdminRoom).id, BODY);
        CALL.subscribe({
            next: () => {
                this.saving.set(false);
                this.editing.set(null);
                this.TOAST.success(E === 'new' ? `Room ${V.number} added.` : 'Room saved.');
                this.loadRooms();
            },
            error: e => { this.saving.set(false); this.err.set(apiFieldErrors(e)); this.TOAST.error(apiErrorMessage(e)); },
        });
    }

    protected setStatus(r: AdminRoom, status: RoomStatus): void {
        this.API.updateRoom(r.id, { status }).subscribe({
            next: updated => {
                this.rooms.update(list => list.map(x => x.id === r.id ? updated : x));
                this.TOAST.success(`Room ${r.number}: ${status === 'active' ? 'back on sale' : status}.`);
            },
            error: e => { this.TOAST.error(apiErrorMessage(e)); this.loadRooms(); },
        });
    }

    protected async remove(r: AdminRoom): Promise<void> {
        const OK = await this.CONFIRM.ask({
            title: `Delete room ${r.number}?`,
            message: 'Rooms with booking history cannot be deleted; set them to Inactive instead.',
            confirmLabel: 'Delete', danger: true,
        });
        if (!OK) return;
        this.API.deleteRoom(r.id).subscribe({
            next: () => { this.TOAST.success('Room deleted.'); this.loadRooms(); },
            error: e => this.TOAST.error(apiErrorMessage(e)),
        });
    }

    /** Next free number after the highest numeric room ("104" → "105"). */
    private suggestNumber(): string {
        const NUMS = this.rooms().map(r => Number(r.number)).filter(Number.isFinite);
        return NUMS.length ? String(Math.max(...NUMS) + 1) : '';
    }
}
