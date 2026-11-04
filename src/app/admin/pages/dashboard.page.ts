import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { MoneyPipe } from '@core/services/hotel/money.pipe';
import { AdminApiService } from '../core/admin-api.service';
import { BookingSummary, Dashboard } from '../core/admin.models';
import { apiErrorMessage } from '../core/api-error';
import { ADMIN_FORMAT } from '../shared/admin-format';
import { StatusBadgeComponent } from '../shared/status-badge.component';

@Component({
    selector: 'ad-dashboard',
    imports: [RouterLink, MoneyPipe, StatusBadgeComponent],
    template: `
        <div class="ad-page-head">
            <div>
                <h1>Today</h1>
                <p>{{ d() ? fmt.date(d()!.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '' }}</p>
            </div>
            <div class="ad-page-head__actions">
                @if (canManage) { <a class="ad-btn ad-btn--primary" routerLink="/admin/bookings/new">New booking</a> }
                <a class="ad-btn" routerLink="/admin/calendar">Open calendar</a>
            </div>
        </div>

        @if (error()) { <div class="ad-alert ad-alert--error">{{ error() }} <button class="ad-btn ad-btn--sm" (click)="load()">Retry</button></div> }

        @if (d(); as d) {
            <div class="ad-stats">
                <div class="ad-stat">
                    <div class="ad-stat__label">Occupancy tonight</div>
                    <div class="ad-stat__value">{{ d.occupancy_today }}%</div>
                    <div class="ad-meter" aria-hidden="true"><span [style.width.%]="d.occupancy_today"></span></div>
                </div>
                <div class="ad-stat">
                    <div class="ad-stat__label">Next 30 days</div>
                    <div class="ad-stat__value">{{ d.occupancy_next_30 }}%</div>
                    <div class="ad-meter" aria-hidden="true"><span [style.width.%]="d.occupancy_next_30"></span></div>
                </div>
                <div class="ad-stat">
                    <div class="ad-stat__label">Guests in house</div>
                    <div class="ad-stat__value">{{ d.in_house }}</div>
                    <div class="ad-stat__hint">{{ d.rooms_sellable }} rooms on sale</div>
                </div>
                <div class="ad-stat">
                    <div class="ad-stat__label">Upcoming bookings</div>
                    <div class="ad-stat__value">{{ d.upcoming_confirmed }}</div>
                    <div class="ad-stat__hint">{{ d.pending_holds }} awaiting payment</div>
                </div>
                <div class="ad-stat">
                    <div class="ad-stat__label">Collected this month</div>
                    <div class="ad-stat__value ad-money">{{ d.revenue_month | money: d.currency }}</div>
                    <div class="ad-stat__hint">net of refunds</div>
                </div>
            </div>

            <div class="ad-grid ad-grid--2">
                <section class="ad-card">
                    <div class="ad-card__head"><h2>Arrivals ({{ d.arrivals.length }})</h2></div>
                    @if (!d.arrivals.length) { <div class="ad-card__empty">No arrivals today.</div> }
                    <div class="ad-table-wrap">
                        @if (d.arrivals.length) {
                            <table class="ad-table ad-table--stack">
                                <thead><tr><th>Guest</th><th>Room</th><th>Leaves</th><th>Status</th></tr></thead>
                                <tbody>
                                    @for (b of d.arrivals; track b.id) {
                                        <tr class="is-link" (click)="open(b)" (keydown.enter)="open(b)" tabindex="0">
                                            <td data-label="Guest" class="strong">{{ b.guest_name }} <span class="ad-muted">· {{ party(b) }}</span></td>
                                            <td data-label="Room">{{ b.room_number }} <span class="ad-muted">{{ b.room_type }}</span></td>
                                            <td data-label="Leaves" class="nowrap">{{ fmt.date(b.check_out, { day: 'numeric', month: 'short' }) }}</td>
                                            <td data-label="Status"><ad-status [status]="b.status" /></td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        }
                    </div>
                </section>

                <section class="ad-card">
                    <div class="ad-card__head"><h2>Departures ({{ d.departures.length }})</h2></div>
                    @if (!d.departures.length) { <div class="ad-card__empty">No departures today.</div> }
                    <div class="ad-table-wrap">
                        @if (d.departures.length) {
                            <table class="ad-table ad-table--stack">
                                <thead><tr><th>Guest</th><th>Room</th><th>Arrived</th><th>Status</th></tr></thead>
                                <tbody>
                                    @for (b of d.departures; track b.id) {
                                        <tr class="is-link" (click)="open(b)" (keydown.enter)="open(b)" tabindex="0">
                                            <td data-label="Guest" class="strong">{{ b.guest_name }}</td>
                                            <td data-label="Room">{{ b.room_number }} <span class="ad-muted">{{ b.room_type }}</span></td>
                                            <td data-label="Arrived" class="nowrap">{{ fmt.date(b.check_in, { day: 'numeric', month: 'short' }) }}</td>
                                            <td data-label="Status"><ad-status [status]="b.status" /></td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        }
                    </div>
                </section>
            </div>

            @if (d.unread_messages > 0) {
                <div class="ad-alert ad-alert--info" style="margin-top:16px">
                    {{ d.unread_messages }} unread {{ d.unread_messages === 1 ? 'message' : 'messages' }} from the website.
                    <a class="ad-link" routerLink="/admin/messages" style="font-weight:600">Read</a>
                </div>
            }
        } @else if (!error()) {
            <div class="ad-stats">
                @for (i of [1, 2, 3, 4, 5]; track i) { <div class="ad-skeleton" style="height:92px"></div> }
            </div>
            <div class="ad-grid ad-grid--2">
                <div class="ad-skeleton" style="height:220px"></div>
                <div class="ad-skeleton" style="height:220px"></div>
            </div>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage implements OnInit {
    private readonly API = inject(AdminApiService);
    private readonly ROUTER = inject(Router);

    protected readonly fmt = ADMIN_FORMAT;
    protected readonly d = signal<Dashboard | null>(null);
    protected readonly error = signal<string | null>(null);
    protected readonly canManage = inject(AuthService).can('bookings.manage');

    public ngOnInit(): void {
        this.load();
    }

    protected load(): void {
        this.error.set(null);
        this.API.dashboard().subscribe({
            next: d => this.d.set(d),
            error: e => this.error.set(apiErrorMessage(e)),
        });
    }

    protected party(b: BookingSummary): string {
        return `${b.adults} ad${b.children ? ` + ${b.children} ch` : ''}`;
    }

    protected open(b: BookingSummary): void {
        this.ROUTER.navigate(['/admin/bookings', b.id]);
    }
}
