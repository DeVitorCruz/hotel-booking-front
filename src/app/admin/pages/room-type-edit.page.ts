import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowDown, faArrowLeft, faArrowUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@core/services/auth/auth.service';
import { HotelApiService } from '@core/services/hotel/hotel-api.service';
import { MoneyPipe } from '@core/services/hotel/money.pipe';
import { AdminApiService } from '../core/admin-api.service';
import { AdminAmenity, AdminRoom, AdminRoomType, RateOverride } from '../core/admin.models';
import { apiErrorMessage, apiFieldErrors } from '../core/api-error';
import { ConfirmService } from '../core/confirm.service';
import { ToastService } from '../core/toast.service';
import { ADMIN_FORMAT } from '../shared/admin-format';
import { StatusBadgeComponent } from '../shared/status-badge.component';

const MAX_UPLOAD_MB = 5;

@Component({
    selector: 'ad-room-type-edit',
    imports: [ReactiveFormsModule, RouterLink, FaIconComponent, MoneyPipe, StatusBadgeComponent],
    template: `
        <a class="ad-back" routerLink="/admin/room-types"><fa-icon [icon]="icons.back" /> Room types</a>
        <div class="ad-page-head">
            <div>
                <h1>{{ isNew ? 'New room type' : (type()?.name ?? 'Room type') }}</h1>
                @if (type(); as t) {
                    <p>{{ t.rooms_count }} {{ t.rooms_count === 1 ? 'room' : 'rooms' }} · shown on the website at <span class="ad-mono">/rooms/{{ t.slug }}</span></p>
                }
            </div>
            @if (type() && canManage) {
                <div class="ad-page-head__actions">
                    <button class="ad-btn ad-btn--danger" type="button" (click)="remove()">Delete</button>
                </div>
            }
        </div>

        @if (loadError()) { <div class="ad-alert ad-alert--error">{{ loadError() }}</div> }

        <div class="ad-grid ad-grid--side">
            <form class="ad-card" [formGroup]="form" (ngSubmit)="save()" novalidate>
                <div class="ad-card__head"><h2>Details</h2>
                    <label class="ad-check"><input type="checkbox" formControlName="is_active" /> Bookable on website</label>
                </div>
                <div class="ad-card__body ad-form">
                    <div class="ad-form-grid">
                        <div class="ad-field span-all">
                            <label for="rt-name">Name</label>
                            <input id="rt-name" class="ad-input" formControlName="name" placeholder="Deluxe King" />
                            @if (err()['name']) { <span class="ad-field__error">{{ err()['name'] }}</span> }
                        </div>
                        <div class="ad-field">
                            <label for="rt-price">Price per night ({{ currency() }})</label>
                            <input id="rt-price" class="ad-input" type="number" min="0" step="0.01" formControlName="base_price" />
                            <span class="ad-field__hint">Default price. Seasonal rates override it.</span>
                            @if (err()['base_price']) { <span class="ad-field__error">{{ err()['base_price'] }}</span> }
                        </div>
                        <div class="ad-field">
                            <label for="rt-beds">Beds</label>
                            <input id="rt-beds" class="ad-input" formControlName="beds" placeholder="1 King" />
                        </div>
                    </div>
                    <div class="ad-form-grid ad-form-grid--4">
                        <div class="ad-field">
                            <label for="rt-adults">Max adults</label>
                            <input id="rt-adults" class="ad-input" type="number" min="1" formControlName="max_adults" />
                        </div>
                        <div class="ad-field">
                            <label for="rt-children">Max children</label>
                            <input id="rt-children" class="ad-input" type="number" min="0" formControlName="max_children" />
                        </div>
                        <div class="ad-field">
                            <label for="rt-occ">Max guests</label>
                            <input id="rt-occ" class="ad-input" type="number" min="1" formControlName="max_occupancy" />
                            @if (err()['max_occupancy']) { <span class="ad-field__error">{{ err()['max_occupancy'] }}</span> }
                        </div>
                        <div class="ad-field">
                            <label for="rt-size">Size (m²)</label>
                            <input id="rt-size" class="ad-input" type="number" min="1" formControlName="size_sqm" />
                        </div>
                    </div>
                    <div class="ad-field">
                        <label for="rt-short">Short description</label>
                        <input id="rt-short" class="ad-input" formControlName="short_description" maxlength="500" placeholder="One line shown on room cards" />
                    </div>
                    <div class="ad-field">
                        <label for="rt-desc">Full description</label>
                        <textarea id="rt-desc" class="ad-textarea" rows="5" formControlName="description"></textarea>
                    </div>

                    @if (amenities().length) {
                        <div class="ad-field">
                            <span class="ad-field__label">Amenities</span>
                            <div class="ad-checks">
                                @for (a of amenities(); track a.id) {
                                    <label class="ad-check">
                                        <input type="checkbox" [checked]="amenityIds().includes(a.id)" [disabled]="!canManage" (change)="toggleAmenity(a.id)" />
                                        {{ a.name }}
                                    </label>
                                }
                            </div>
                        </div>
                    }

                    <div class="ad-form-grid">
                        <div class="ad-field">
                            <label for="rt-sort">Order on website</label>
                            <input id="rt-sort" class="ad-input" type="number" min="0" formControlName="sort_order" />
                            <span class="ad-field__hint">Lower numbers are listed first.</span>
                        </div>
                        <div class="ad-field">
                            <label for="rt-slug">Web address</label>
                            <input id="rt-slug" class="ad-input" formControlName="slug" placeholder="made from the name" />
                            @if (err()['slug']) { <span class="ad-field__error">{{ err()['slug'] }}</span> }
                        </div>
                    </div>

                    @if (canManage) {
                        <div class="ad-form-actions">
                            <button class="ad-btn ad-btn--primary" type="submit" [disabled]="saving()">{{ saving() ? 'Saving…' : (isNew ? 'Create room type' : 'Save changes') }}</button>
                        </div>
                    }
                </div>
            </form>

            <div class="ad-stack">
                <section class="ad-card">
                    <div class="ad-card__head"><h2>Photos</h2><span class="ad-muted">First is the cover</span></div>
                    <div class="ad-card__body">
                        @if (!type()) {
                            <p class="ad-muted">Save the room type first, then add photos.</p>
                        } @else {
                            <div class="rt-photos">
                                @for (img of type()!.images; track img.id; let first = $first; let last = $last) {
                                    <figure class="rt-photo">
                                        <img [src]="img.url" [alt]="img.alt || type()!.name" loading="lazy" />
                                        @if (canManage) {
                                            <figcaption>
                                                <button class="ad-btn ad-btn--sm ad-btn--icon" type="button" [disabled]="first || busy()" aria-label="Move earlier" (click)="move(img.id, -1)"><fa-icon [icon]="icons.up" /></button>
                                                <button class="ad-btn ad-btn--sm ad-btn--icon" type="button" [disabled]="last || busy()" aria-label="Move later" (click)="move(img.id, 1)"><fa-icon [icon]="icons.down" /></button>
                                                <span class="ad-spacer"></span>
                                                <button class="ad-btn ad-btn--sm ad-btn--icon ad-btn--danger" type="button" [disabled]="busy()" aria-label="Delete photo" (click)="deleteImage(img.id)"><fa-icon [icon]="icons.trash" /></button>
                                            </figcaption>
                                        }
                                    </figure>
                                } @empty {
                                    <p class="ad-muted">No photos yet. The website shows a placeholder.</p>
                                }
                            </div>
                            @if (canManage) {
                                <div class="ad-form" style="margin-top:14px">
                                    <label class="ad-btn ad-btn--block" [class.is-disabled]="busy()">
                                        <input type="file" accept="image/jpeg,image/png,image/webp" multiple hidden (change)="upload($event)" [disabled]="busy()" />
                                        {{ busy() ? 'Uploading…' : 'Upload photos' }}
                                    </label>
                                    <div class="ad-row">
                                        <input #url class="ad-input" type="url" placeholder="…or paste an image URL" aria-label="Image URL" style="flex:1;width:auto" />
                                        <button class="ad-btn" type="button" [disabled]="busy()" (click)="addUrl(url.value); url.value = ''">Add</button>
                                    </div>
                                    <span class="ad-field__hint">JPG, PNG or WebP, up to {{ maxMb }} MB each. Landscape 1600 × 1000 looks best.</span>
                                </div>
                            }
                        }
                    </div>
                </section>

                @if (type()) {
                    <section class="ad-card">
                        <div class="ad-card__head"><h2>Rooms</h2><a class="ad-btn ad-btn--sm" routerLink="/admin/rooms" [queryParams]="{ type: type()!.id }">Manage</a></div>
                        @if (rooms().length) {
                            <table class="ad-table"><tbody>
                                @for (r of rooms(); track r.id) {
                                    <tr><td class="strong">{{ r.number }}</td><td class="muted">{{ r.floor }}</td><td class="actions"><ad-status [status]="r.status" /></td></tr>
                                }
                            </tbody></table>
                        } @else { <div class="ad-card__empty">No rooms of this type yet — it cannot be booked until you add one.</div> }
                    </section>

                    <section class="ad-card">
                        <div class="ad-card__head"><h2>Seasonal rates</h2><a class="ad-btn ad-btn--sm" routerLink="/admin/rates" [queryParams]="{ type: type()!.id }">Manage</a></div>
                        @if (rates().length) {
                            <table class="ad-table"><tbody>
                                @for (r of rates(); track r.id) {
                                    <tr>
                                        <td>{{ r.label || 'Special rate' }}<br><span class="ad-muted">{{ fmt.date(r.start_date, { day: 'numeric', month: 'short' }) }} – {{ fmt.date(r.end_date) }}</span></td>
                                        <td class="num strong">{{ r.price | money: currency() }}</td>
                                    </tr>
                                }
                            </tbody></table>
                        } @else { <div class="ad-card__empty">Always {{ type()!.base_price | money: currency() }} per night.</div> }
                    </section>
                }
            </div>
        </div>
    `,
    styles: [`
        .rt-photos { display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:10px; }
        .rt-photo { margin:0; border:1px solid var(--ad-line); border-radius:var(--ad-radius); overflow:hidden; background:#f4f1ea; }
        .rt-photo:first-child { grid-column:1 / -1; }
        .rt-photo img { display:block; width:100%; aspect-ratio:16/10; object-fit:cover; }
        .rt-photo figcaption { display:flex; gap:6px; padding:6px; background:#fff; }
        label.ad-btn { cursor:pointer; }
        label.ad-btn.is-disabled { opacity:.5; pointer-events:none; }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomTypeEditPage implements OnInit {
    private readonly API = inject(AdminApiService);
    private readonly ROUTE = inject(ActivatedRoute);
    private readonly ROUTER = inject(Router);
    private readonly TOAST = inject(ToastService);
    private readonly CONFIRM = inject(ConfirmService);

    protected readonly icons = { back: faArrowLeft, up: faArrowUp, down: faArrowDown, trash: faTrash };
    protected readonly fmt = ADMIN_FORMAT;
    protected readonly maxMb = MAX_UPLOAD_MB;
    protected readonly canManage = inject(AuthService).can('rooms.manage');
    protected readonly isNew = !this.ROUTE.snapshot.paramMap.get('id');

    protected readonly type = signal<AdminRoomType | null>(null);
    protected readonly amenities = signal<AdminAmenity[]>([]);
    protected readonly amenityIds = signal<number[]>([]);
    protected readonly rooms = signal<AdminRoom[]>([]);
    protected readonly rates = signal<RateOverride[]>([]);
    protected readonly currency = signal('USD');
    protected readonly saving = signal(false);
    protected readonly busy = signal(false);
    protected readonly err = signal<Record<string, string>>({});
    protected readonly loadError = signal<string | null>(null);

    protected readonly form = inject(FormBuilder).group({
        name: ['', Validators.required],
        slug: [''],
        base_price: [100 as number | null, [Validators.required, Validators.min(0)]],
        beds: [''],
        max_adults: [2, [Validators.required, Validators.min(1)]],
        max_children: [0, Validators.min(0)],
        max_occupancy: [2, [Validators.required, Validators.min(1)]],
        size_sqm: [null as number | null],
        short_description: [''],
        description: [''],
        sort_order: [0],
        is_active: [true],
    });

    constructor() {
        inject(HotelApiService).hotel().subscribe({ next: h => this.currency.set(h.currency), error: () => {} });
        if (!this.canManage) this.form.disable();
    }

    public ngOnInit(): void {
        this.API.amenities().subscribe({ next: a => this.amenities.set(a), error: () => {} });
        const ID = Number(this.ROUTE.snapshot.paramMap.get('id'));
        if (ID) this.load(ID);
    }

    private load(id: number): void {
        this.API.roomType(id).subscribe({
            next: t => this.fill(t),
            error: e => this.loadError.set(apiErrorMessage(e, 'Room type not found.')),
        });
        this.API.rooms(id).subscribe({ next: r => this.rooms.set(r), error: () => {} });
        this.API.rates(id).subscribe({ next: r => this.rates.set(r), error: () => {} });
    }

    private fill(t: AdminRoomType): void {
        this.type.set(t);
        this.amenityIds.set([...t.amenity_ids]);
        this.form.patchValue({
            name: t.name, slug: t.slug, base_price: Number(t.base_price), beds: t.beds ?? '',
            max_adults: t.max_adults, max_children: t.max_children, max_occupancy: t.max_occupancy,
            size_sqm: t.size_sqm, short_description: t.short_description ?? '', description: t.description ?? '',
            sort_order: t.sort_order, is_active: t.is_active,
        });
    }

    protected toggleAmenity(id: number): void {
        this.amenityIds.update(ids => ids.includes(id) ? ids.filter(x => x !== id) : [...ids, id]);
    }

    protected save(): void {
        this.err.set({});
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            this.TOAST.error('Check the highlighted fields.');
            return;
        }
        const V = this.form.getRawValue();
        const BODY = {
            ...V,
            slug: V.slug?.trim() || null,
            beds: V.beds || null,
            size_sqm: V.size_sqm || null,
            short_description: V.short_description || null,
            description: V.description || null,
            amenity_ids: this.amenityIds(),
        } as any;

        this.saving.set(true);
        const CALL = this.type() ? this.API.updateRoomType(this.type()!.id, BODY) : this.API.createRoomType(BODY);
        CALL.subscribe({
            next: t => {
                this.saving.set(false);
                this.fill(t);
                if (this.isNew) {
                    this.TOAST.success('Room type created. Now add photos and rooms.');
                    this.ROUTER.navigate(['/admin/room-types', t.id], { replaceUrl: true });
                } else {
                    this.TOAST.success('Saved.');
                }
            },
            error: e => {
                this.saving.set(false);
                this.err.set(apiFieldErrors(e));
                this.TOAST.error(apiErrorMessage(e));
            },
        });
    }

    protected upload(ev: Event): void {
        const INPUT = ev.target as HTMLInputElement;
        const FILES = Array.from(INPUT.files ?? []);
        INPUT.value = '';
        const TOO_BIG = FILES.filter(f => f.size > MAX_UPLOAD_MB * 1024 * 1024);
        if (TOO_BIG.length) this.TOAST.error(`${TOO_BIG.map(f => f.name).join(', ')}: larger than ${MAX_UPLOAD_MB} MB.`);
        const OK = FILES.filter(f => f.size <= MAX_UPLOAD_MB * 1024 * 1024);
        if (!OK.length) return;

        this.busy.set(true);
        const NEXT = (i: number) => {
            if (i >= OK.length) {
                this.busy.set(false);
                this.refresh();
                return;
            }
            this.API.uploadImage(this.type()!.id, OK[i], this.type()!.name).subscribe({
                next: () => NEXT(i + 1),
                error: e => { this.TOAST.error(`${OK[i].name}: ${apiErrorMessage(e)}`); NEXT(i + 1); },
            });
        };
        NEXT(0);
    }

    protected addUrl(url: string): void {
        if (!/^https?:\/\/\S+$/.test(url.trim())) {
            this.TOAST.error('Paste a full image address starting with https://');
            return;
        }
        this.busy.set(true);
        this.API.addImageUrl(this.type()!.id, url.trim(), this.type()!.name).subscribe({
            next: () => { this.busy.set(false); this.refresh(); },
            error: e => { this.busy.set(false); this.TOAST.error(apiErrorMessage(e)); },
        });
    }

    protected move(id: number, dir: -1 | 1): void {
        const IDS = this.type()!.images.map(i => i.id);
        const I = IDS.indexOf(id);
        [IDS[I], IDS[I + dir]] = [IDS[I + dir], IDS[I]];
        this.busy.set(true);
        this.API.orderImages(this.type()!.id, IDS).subscribe({
            next: t => { this.busy.set(false); this.type.set(t); },
            error: e => { this.busy.set(false); this.TOAST.error(apiErrorMessage(e)); },
        });
    }

    protected async deleteImage(id: number): Promise<void> {
        if (!await this.CONFIRM.ask({ title: 'Delete this photo?', confirmLabel: 'Delete', danger: true })) return;
        this.busy.set(true);
        this.API.deleteImage(this.type()!.id, id).subscribe({
            next: () => { this.busy.set(false); this.refresh(); },
            error: e => { this.busy.set(false); this.TOAST.error(apiErrorMessage(e)); },
        });
    }

    protected async remove(): Promise<void> {
        const T = this.type()!;
        const OK = await this.CONFIRM.ask({
            title: `Delete ${T.name}?`,
            message: 'Only possible for room types that have no rooms and were never booked. To stop selling it, untick "Bookable on website" instead.',
            confirmLabel: 'Delete',
            danger: true,
        });
        if (!OK) return;
        this.API.deleteRoomType(T.id).subscribe({
            next: () => { this.TOAST.success('Room type deleted.'); this.ROUTER.navigate(['/admin/room-types']); },
            error: e => this.TOAST.error(apiErrorMessage(e)),
        });
    }

    private refresh(): void {
        this.API.roomType(this.type()!.id).subscribe({ next: t => this.type.set(t), error: () => {} });
    }
}
