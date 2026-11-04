import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { MoneyPipe } from '@core/services/hotel/money.pipe';
import { HotelApiService } from '@core/services/hotel/hotel-api.service';
import { AdminApiService } from '../core/admin-api.service';
import { AdminRoomType } from '../core/admin.models';
import { apiErrorMessage } from '../core/api-error';
import { StatusBadgeComponent } from '../shared/status-badge.component';

@Component({
    selector: 'ad-room-types',
    imports: [RouterLink, MoneyPipe, StatusBadgeComponent],
    template: `
        <div class="ad-page-head">
            <div>
                <h1>Room types</h1>
                <p>What guests book on the website. Each type has its own price, photos and rooms.</p>
            </div>
            @if (canManage) {
                <div class="ad-page-head__actions"><a class="ad-btn ad-btn--primary" routerLink="/admin/room-types/new">New room type</a></div>
            }
        </div>

        @if (error()) { <div class="ad-alert ad-alert--error">{{ error() }}</div> }

        @if (types(); as list) {
            @if (!list.length) {
                <section class="ad-card"><div class="ad-card__empty">No room types yet.</div></section>
            }
            <div class="rt-grid">
                @for (t of list; track t.id) {
                    <a class="ad-card rt-card" [routerLink]="['/admin/room-types', t.id]">
                        <div class="rt-card__img">
                            @if (t.images[0]; as img) { <img [src]="img.url" [alt]="img.alt || t.name" loading="lazy" (error)="$any($event.target).style.visibility='hidden'" /> }
                            @else { <span>No photo</span> }
                        </div>
                        <div class="rt-card__body">
                            <div class="ad-row" style="justify-content:space-between">
                                <strong>{{ t.name }}</strong>
                                <ad-status [status]="t.is_active ? 'active' : 'hidden'" />
                            </div>
                            <div class="ad-muted">{{ t.beds || 'Beds not set' }} · up to {{ t.max_occupancy }} guests</div>
                            <div class="ad-row" style="justify-content:space-between;margin-top:8px">
                                <span><strong class="ad-money">{{ t.base_price | money: currency() }}</strong> <span class="ad-muted">/ night</span></span>
                                <span class="ad-muted">{{ t.rooms_count }} {{ t.rooms_count === 1 ? 'room' : 'rooms' }}</span>
                            </div>
                        </div>
                    </a>
                }
            </div>
        } @else if (!error()) {
            <div class="rt-grid">@for (i of [1, 2, 3]; track i) { <div class="ad-skeleton" style="height:250px"></div> }</div>
        }
    `,
    styles: [`
        .rt-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); gap:16px; }
        .rt-grid > .ad-card + .ad-card { margin-top:0; }
        .rt-card { text-decoration:none; overflow:hidden; transition:box-shadow .15s, border-color .15s; }
        .rt-card:hover { border-color:var(--ad-line-strong); box-shadow:0 10px 30px -18px rgba(0,0,0,.35); }
        .rt-card__img { aspect-ratio:16/10; background:#eeeae1; display:grid; place-items:center; color:var(--ad-muted); font-size:12.5px; }
        .rt-card__img img { width:100%; height:100%; object-fit:cover; }
        .rt-card__body { padding:14px 16px; display:flex; flex-direction:column; gap:3px; }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomTypesPage implements OnInit {
    private readonly API = inject(AdminApiService);
    protected readonly canManage = inject(AuthService).can('rooms.manage');
    protected readonly types = signal<AdminRoomType[] | null>(null);
    protected readonly error = signal<string | null>(null);
    protected readonly currency = signal('USD');

    constructor() {
        inject(HotelApiService).hotel().subscribe({ next: h => this.currency.set(h.currency), error: () => {} });
    }

    public ngOnInit(): void {
        this.API.roomTypes().subscribe({ next: t => this.types.set(t), error: e => this.error.set(apiErrorMessage(e)) });
    }
}
