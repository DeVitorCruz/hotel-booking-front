import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { MoneyPipe } from '@core/services/hotel/money.pipe';
import { debounceTime, Subject } from 'rxjs';
import { AdminApiService } from '../core/admin-api.service';
import { BookingFilters, Paginated, StaffBooking } from '../core/admin.models';
import { apiErrorMessage } from '../core/api-error';
import { ADMIN_FORMAT } from '../shared/admin-format';
import { StatusBadgeComponent } from '../shared/status-badge.component';

const STATUS_VIEWS = [
    { value: 'pending,confirmed,checked_in', label: 'Active' },
    { value: 'checked_in', label: 'In house' },
    { value: 'pending', label: 'Awaiting payment' },
    { value: 'checked_out', label: 'Checked out' },
    { value: 'cancelled,expired,no_show', label: 'Cancelled' },
    { value: '', label: 'All' },
];

@Component({
    selector: 'ad-bookings',
    imports: [FormsModule, RouterLink, MoneyPipe, StatusBadgeComponent],
    template: `
        <div class="ad-page-head">
            <div>
                <h1>Bookings</h1>
                <p>{{ page()?.total ?? '…' }} {{ page()?.total === 1 ? 'booking' : 'bookings' }}</p>
            </div>
            @if (canManage) {
                <div class="ad-page-head__actions"><a class="ad-btn ad-btn--primary" routerLink="/admin/bookings/new">New booking</a></div>
            }
        </div>

        <section class="ad-card">
            <div class="ad-toolbar">
                <div class="ad-tabs" role="group" aria-label="Status">
                    @for (v of views; track v.value) {
                        <button type="button" [class.is-active]="filters().status === v.value" (click)="patch({ status: v.value })">{{ v.label }}</button>
                    }
                </div>
                <span class="ad-spacer"></span>
                <input class="ad-input ad-input--search" type="search" placeholder="Reference, name or email" aria-label="Search bookings"
                       [ngModel]="filters().q" (ngModelChange)="search$.next($event)" />
                <label class="ad-row ad-muted" style="gap:6px">Staying
                    <input class="ad-input" type="date" aria-label="Staying from" [ngModel]="filters().from" (ngModelChange)="patch({ from: $event })" />
                    –
                    <input class="ad-input" type="date" aria-label="Staying until" [ngModel]="filters().to" (ngModelChange)="patch({ to: $event })" />
                </label>
                @if (filters().from || filters().to || filters().q) {
                    <button class="ad-btn ad-btn--ghost ad-btn--sm" type="button" (click)="patch({ from: '', to: '', q: '' })">Clear</button>
                }
            </div>

            @if (error()) { <div class="ad-card__body"><div class="ad-alert ad-alert--error">{{ error() }}</div></div> }

            @if (page(); as p) {
                @if (!p.data.length) {
                    <div class="ad-card__empty">No bookings match these filters.</div>
                } @else {
                    <div class="ad-table-wrap">
                        <table class="ad-table ad-table--stack">
                            <thead>
                                <tr><th>Reference</th><th>Guest</th><th>Stay</th><th>Room</th><th class="num">Total</th><th class="num">Balance</th><th>Status</th></tr>
                            </thead>
                            <tbody>
                                @for (b of p.data; track b.id) {
                                    <tr class="is-link" tabindex="0" (click)="open(b)" (keydown.enter)="open(b)">
                                        <td data-label="Reference" class="ad-mono">{{ b.reference }}</td>
                                        <td data-label="Guest"><span class="strong">{{ b.guest_name }}</span><span class="hide-sm"><br><span class="ad-muted">{{ b.guest_email }}</span></span></td>
                                        <td data-label="Stay" class="nowrap">{{ fmt.stay(b.check_in, b.check_out) }} <span class="ad-muted">· {{ b.nights }}n</span></td>
                                        <td data-label="Room">{{ b.room_number }} <span class="ad-muted">{{ b.room_type?.name }}</span></td>
                                        <td data-label="Total" class="num">{{ b.total | money: b.currency }}</td>
                                        <td data-label="Balance" class="num" [class.strong]="+b.balance_due > 0">{{ b.balance_due | money: b.currency }}</td>
                                        <td data-label="Status"><ad-status [status]="b.status" /></td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    @if (p.last_page > 1) {
                        <div class="ad-pager">
                            <span>Page {{ p.current_page }} of {{ p.last_page }}</span>
                            <span class="ad-row">
                                <button class="ad-btn ad-btn--sm" type="button" [disabled]="p.current_page <= 1" (click)="patch({ page: p.current_page - 1 }, false)">Previous</button>
                                <button class="ad-btn ad-btn--sm" type="button" [disabled]="p.current_page >= p.last_page" (click)="patch({ page: p.current_page + 1 }, false)">Next</button>
                            </span>
                        </div>
                    }
                }
            } @else if (!error()) {
                <div class="ad-card__body"><div class="ad-skeleton" style="height:240px"></div></div>
            }
        </section>
    `,
    styles: [`@media (max-width: 699px) { .hide-sm { display:none; } }`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingsPage implements OnInit {
    private readonly API = inject(AdminApiService);
    private readonly ROUTER = inject(Router);
    private readonly ROUTE = inject(ActivatedRoute);
    private readonly DESTROY = inject(DestroyRef);

    protected readonly fmt = ADMIN_FORMAT;
    protected readonly views = STATUS_VIEWS;
    protected readonly canManage = inject(AuthService).can('bookings.manage');

    protected readonly filters = signal<Required<Omit<BookingFilters, 'page'>> & { page: number }>({
        status: STATUS_VIEWS[0].value, q: '', from: '', to: '', page: 1,
    });
    protected readonly page = signal<Paginated<StaffBooking> | null>(null);
    protected readonly error = signal<string | null>(null);
    protected readonly search$ = new Subject<string>();
    private seq = 0;

    public ngOnInit(): void {
        const Q = this.ROUTE.snapshot.queryParamMap;
        this.filters.set({
            status: Q.has('status') ? Q.get('status')! : STATUS_VIEWS[0].value,
            q: Q.get('q') ?? '', from: Q.get('from') ?? '', to: Q.get('to') ?? '',
            page: Number(Q.get('page')) || 1,
        });
        this.search$.pipe(debounceTime(300), takeUntilDestroyed(this.DESTROY)).subscribe(q => this.patch({ q }));
        this.load();
    }

    protected patch(change: Partial<BookingFilters>, resetPage = true): void {
        this.filters.update(f => ({ ...f, ...change, page: resetPage ? 1 : (change.page ?? f.page) }));
        this.load();
    }

    protected open(b: StaffBooking): void {
        this.ROUTER.navigate(['/admin/bookings', b.id]);
    }

    private load(): void {
        const F = this.filters();
        const SEQ = ++this.seq;
        this.error.set(null);
        this.ROUTER.navigate([], {
            replaceUrl: true,
            queryParams: { status: F.status, q: F.q || null, from: F.from || null, to: F.to || null, page: F.page > 1 ? F.page : null },
        });
        this.API.bookings(F).subscribe({
            next: p => { if (SEQ === this.seq) this.page.set(p); },
            error: e => { if (SEQ === this.seq) this.error.set(apiErrorMessage(e)); },
        });
    }
}
