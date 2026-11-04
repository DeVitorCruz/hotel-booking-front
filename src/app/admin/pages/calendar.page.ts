import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@core/services/auth/auth.service';
import { STAY_DATES } from '@core/services/hotel/stay-dates';
import { AdminApiService } from '../core/admin-api.service';
import { CalendarData } from '../core/admin.models';
import { apiErrorMessage } from '../core/api-error';
import { ADMIN_FORMAT } from '../shared/admin-format';

interface Bar {
    key: string;
    row: number;
    start: number; // column index (0-based day)
    end: number;   // exclusive
    label: string;
    title: string;
    kind: string;  // booking status or 'block'
    clipStart: boolean;
    clipEnd: boolean;
    link: (string | number)[];
}

/** Rooms × days "tape chart": who sleeps where, and what is free. */
@Component({
    selector: 'ad-calendar',
    imports: [RouterLink, FaIconComponent],
    template: `
        <div class="ad-page-head">
            <div>
                <h1>Calendar</h1>
                <p>{{ rangeLabel() }}</p>
            </div>
            <div class="ad-page-head__actions">
                <div class="ad-row">
                    <button class="ad-btn ad-btn--icon" type="button" aria-label="Previous week" (click)="shift(-7)"><fa-icon [icon]="icons.prev" /></button>
                    <button class="ad-btn" type="button" (click)="goToday()">Today</button>
                    <button class="ad-btn ad-btn--icon" type="button" aria-label="Next week" (click)="shift(7)"><fa-icon [icon]="icons.next" /></button>
                    <input class="ad-input" type="date" aria-label="Start date" [value]="from()" (change)="jump($any($event.target).value)" style="width:auto" />
                    <div class="ad-tabs" role="group" aria-label="Days shown">
                        @for (n of [14, 28]; track n) {
                            <button type="button" [class.is-active]="days() === n" (click)="setDays(n)">{{ n }} days</button>
                        }
                    </div>
                </div>
            </div>
        </div>

        @if (error()) { <div class="ad-alert ad-alert--error">{{ error() }}</div> }

        <section class="ad-card">
            <div class="cal-legend">
                <span><i class="cal-key cal-key--confirmed"></i>Confirmed</span>
                <span><i class="cal-key cal-key--checked_in"></i>In house</span>
                <span><i class="cal-key cal-key--pending"></i>Awaiting payment</span>
                <span><i class="cal-key cal-key--checked_out"></i>Checked out</span>
                <span><i class="cal-key cal-key--block"></i>Blocked</span>
                @if (canBook) { <span class="ad-muted">Click a free night to book it.</span> }
            </div>

            <div class="cal-scroll">
                @if (data(); as cal) {
                    <div class="cal" [style.grid-template-columns]="cols()" role="grid" [attr.aria-rowcount]="cal.rooms.length + 1">
                        <div class="cal__corner" style="grid-row:1;grid-column:1">Room</div>
                        @for (d of dates(); track d.iso; let i = $index) {
                            <div class="cal__day" [class.is-weekend]="d.weekend" [class.is-today]="d.iso === today" [style.grid-row]="1" [style.grid-column]="i + 2">
                                <span>{{ d.dow }}</span><strong>{{ d.day }}</strong>
                            </div>
                        }

                        @for (room of cal.rooms; track room.id; let r = $index) {
                            <div class="cal__room" [style.grid-row]="r + 2" style="grid-column:1">
                                <strong>{{ room.number }}</strong>
                                <span>{{ room.room_type }}</span>
                                @if (room.status !== 'active') { <em>{{ room.status }}</em> }
                            </div>
                            @for (d of dates(); track d.iso; let i = $index) {
                                <button type="button" class="cal__cell" [class.is-weekend]="d.weekend" [class.is-today]="d.iso === today"
                                        [class.is-off]="room.status !== 'active'"
                                        [style.grid-row]="r + 2" [style.grid-column]="i + 2"
                                        [disabled]="!canBook || room.status !== 'active' || d.iso < today"
                                        [attr.aria-label]="'Book room ' + room.number + ' from ' + d.iso"
                                        (click)="bookFrom(room.room_type_id, d.iso)"></button>
                            }
                        }

                        @for (b of bars(); track b.key) {
                            <a class="cal__bar" [class]="'cal__bar cal__bar--' + b.kind" [class.clip-start]="b.clipStart" [class.clip-end]="b.clipEnd"
                               [style.grid-row]="b.row + 2" [style.grid-column]="(b.start + 2) + ' / ' + (b.end + 2)"
                               [routerLink]="b.link" [title]="b.title">{{ b.label }}</a>
                        }
                    </div>
                    @if (!cal.rooms.length) {
                        <div class="ad-card__empty">No rooms yet. <a routerLink="/admin/rooms">Add rooms</a> to start selling.</div>
                    }
                } @else if (!error()) {
                    <div class="ad-skeleton" style="height:360px;margin:14px"></div>
                }
            </div>
        </section>
    `,
    styles: [`
        .cal-legend { display:flex; flex-wrap:wrap; gap:8px 18px; padding:12px 16px; border-bottom:1px solid var(--ad-line); font-size:12.5px; }
        .cal-legend span { display:inline-flex; align-items:center; gap:6px; }
        .cal-key { width:14px; height:10px; border-radius:3px; display:inline-block; }
        .cal-scroll { overflow-x:auto; }
        .cal { display:grid; grid-auto-rows:44px; min-width:max-content; position:relative; }
        .cal__corner, .cal__day { position:sticky; top:0; background:#faf8f4; border-bottom:1px solid var(--ad-line); z-index:3; }
        .cal__corner { left:0; z-index:4; display:flex; align-items:center; padding:0 12px; font-size:11.5px; text-transform:uppercase; letter-spacing:.06em; color:var(--ad-muted); font-weight:600; border-right:1px solid var(--ad-line); }
        .cal__day { display:flex; flex-direction:column; align-items:center; justify-content:center; font-size:11px; color:var(--ad-muted); border-left:1px solid #f0ece4; line-height:1.15; }
        .cal__day strong { font-size:13.5px; color:var(--ad-ink); }
        .cal__day.is-today { background:#f1ead9; }
        .cal__day.is-today strong { color:var(--ad-brand); }
        .cal__room { position:sticky; left:0; z-index:2; background:#fff; border-right:1px solid var(--ad-line); border-bottom:1px solid var(--ad-line); padding:4px 12px; display:flex; flex-direction:column; justify-content:center; line-height:1.2; min-width:0; }
        .cal__room span { font-size:11.5px; color:var(--ad-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .cal__room em { font-size:10.5px; font-style:normal; color:var(--ad-warn); text-transform:capitalize; }
        .cal__cell { border:0; border-left:1px solid #f0ece4; border-bottom:1px solid var(--ad-line); background:#fff; padding:0; cursor:pointer; }
        .cal__cell.is-weekend { background:#fcfbf8; }
        .cal__cell.is-today { background:#fbf7ee; }
        .cal__cell.is-off { background:repeating-linear-gradient(45deg,#f6f3ec,#f6f3ec 5px,#fff 5px,#fff 10px); }
        .cal__cell:not(:disabled):hover { background:#eef0e6; }
        .cal__cell:disabled { cursor:default; }
        .cal__bar { z-index:1; align-self:center; height:30px; margin:0 3px; border-radius:6px; padding:0 8px; display:flex; align-items:center; font-size:12px; font-weight:600; text-decoration:none; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; min-width:0; border:1px solid transparent; }
        .cal__bar.clip-start { border-top-left-radius:0; border-bottom-left-radius:0; margin-left:0; }
        .cal__bar.clip-end { border-top-right-radius:0; border-bottom-right-radius:0; margin-right:0; }
        .cal__bar:hover { filter:brightness(.96); }
        .cal__bar:focus-visible { outline:2px solid var(--ad-accent); outline-offset:1px; }
        .cal__bar--confirmed, .cal-key--confirmed { background:#dfe8d3; color:#34481f; border-color:#c3d3b0; }
        .cal__bar--checked_in, .cal-key--checked_in { background:var(--ad-brand); color:#fff; }
        .cal__bar--pending, .cal-key--pending { background:#fbecc9; color:#73520f; border-color:#efd79c; border-style:dashed; }
        .cal__bar--checked_out, .cal-key--checked_out { background:#ebe8e1; color:#6c6e66; }
        .cal__bar--block, .cal-key--block { background:repeating-linear-gradient(45deg,#e8d9d3,#e8d9d3 6px,#f3e9e5 6px,#f3e9e5 12px); color:#7c2f20; border-color:#dcc2b8; }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarPage implements OnInit {
    private readonly API = inject(AdminApiService);
    private readonly ROUTER = inject(Router);
    private readonly ROUTE = inject(ActivatedRoute);

    protected readonly icons = { prev: faChevronLeft, next: faChevronRight };
    protected readonly today = STAY_DATES.today();
    protected readonly canBook = inject(AuthService).can('bookings.manage');

    protected readonly from = signal(STAY_DATES.addDays(STAY_DATES.today(), -1));
    protected readonly days = signal(14);
    protected readonly data = signal<CalendarData | null>(null);
    protected readonly error = signal<string | null>(null);

    protected readonly cols = computed(() => `minmax(130px, 160px) repeat(${this.days()}, minmax(46px, 1fr))`);

    protected readonly dates = computed(() => Array.from({ length: this.days() }, (_, i) => {
        const ISO = STAY_DATES.addDays(this.from(), i);
        const [Y, M, D] = STAY_DATES.parts(ISO);
        const DATE = new Date(Y, M, D);
        return {
            iso: ISO,
            day: D,
            dow: DATE.toLocaleDateString(undefined, { weekday: 'short' }),
            weekend: DATE.getDay() === 0 || DATE.getDay() === 6,
        };
    }));

    protected readonly rangeLabel = computed(() => {
        const LAST = STAY_DATES.addDays(this.from(), this.days() - 1);
        return `${ADMIN_FORMAT.date(this.from())} – ${ADMIN_FORMAT.date(LAST)}`;
    });

    protected readonly bars = computed<Bar[]>(() => {
        const CAL = this.data();
        if (!CAL) return [];
        const ROW = new Map(CAL.rooms.map((r, i) => [r.id, i]));
        const N = this.days();
        const col = (iso: string) => STAY_DATES.nights(this.from(), iso);
        const OUT: Bar[] = [];

        const add = (key: string, roomId: number, startIso: string, endIso: string, rest: Pick<Bar, 'label' | 'title' | 'kind' | 'link'>) => {
            const ROW_I = ROW.get(roomId);
            if (ROW_I === undefined) return;
            const S = col(startIso), E = col(endIso);
            if (E <= 0 || S >= N) return;
            OUT.push({ key, row: ROW_I, start: Math.max(0, S), end: Math.min(N, E), clipStart: S < 0, clipEnd: E > N, ...rest });
        };

        for (const B of CAL.bookings) {
            add(`b${B.id}`, B.room_id, B.check_in, B.check_out, {
                label: B.guest_name, kind: B.status, link: ['/admin/bookings', B.id],
                title: `${B.guest_name} · ${B.reference} · ${ADMIN_FORMAT.stay(B.check_in, B.check_out)}`,
            });
        }
        for (const K of CAL.blocks) {
            add(`k${K.id}`, K.room_id, K.start_date, K.end_date, {
                label: K.reason || 'Blocked', kind: 'block', link: ['/admin/blocks'],
                title: `Blocked: ${K.reason || 'no reason'} · ${ADMIN_FORMAT.stay(K.start_date, K.end_date)}`,
            });
        }
        return OUT;
    });

    public ngOnInit(): void {
        const Q = this.ROUTE.snapshot.queryParamMap;
        if (STAY_DATES.isValidIso(Q.get('from'))) this.from.set(Q.get('from')!);
        if (Q.get('days') === '28') this.days.set(28);
        this.load();
    }

    protected shift(n: number): void { this.from.set(STAY_DATES.addDays(this.from(), n)); this.load(); }
    protected goToday(): void { this.from.set(STAY_DATES.addDays(this.today, -1)); this.load(); }
    protected setDays(n: number): void { this.days.set(n); this.load(); }
    protected jump(iso: string): void { if (STAY_DATES.isValidIso(iso)) { this.from.set(iso); this.load(); } }

    protected bookFrom(roomTypeId: number, iso: string): void {
        this.ROUTER.navigate(['/admin/bookings/new'], {
            queryParams: { room_type_id: roomTypeId, check_in: iso, check_out: STAY_DATES.addDays(iso, 1) },
        });
    }

    private load(): void {
        this.error.set(null);
        this.ROUTER.navigate([], { queryParams: { from: this.from(), days: this.days() }, replaceUrl: true });
        this.API.calendar(this.from(), this.days()).subscribe({
            next: d => this.data.set(d),
            error: e => this.error.set(apiErrorMessage(e)),
        });
    }
}
