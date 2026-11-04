import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowUpRightFromSquare, faBars, faRightFromBracket, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@core/services/auth/auth.service';
import { HotelApiService } from '@core/services/hotel/hotel-api.service';
import { filter } from 'rxjs';
import { AdminApiService } from '../core/admin-api.service';
import { resetStaffRefresh } from '../core/admin-guards';
import { ADMIN_FORMAT } from '../shared/admin-format';
import { ADMIN_NAV, canSee } from './admin-nav';

@Component({
    selector: 'ad-shell',
    imports: [RouterOutlet, RouterLink, RouterLinkActive, FaIconComponent],
    template: `
        <div class="ad-shell">
            <aside class="ad-sidebar" [class.is-open]="menuOpen()" aria-label="Back office menu">
                <a class="ad-brand" routerLink="/admin" (click)="menuOpen.set(false)">
                    <span class="ad-brand__mark" aria-hidden="true">{{ hotelInitial() }}</span>
                    <span>
                        <span class="ad-brand__name">{{ hotelName() }}</span>
                        <span class="ad-brand__sub">Back office</span>
                    </span>
                </a>

                <nav class="ad-nav">
                    @for (group of nav(); track group.label) {
                        <div class="ad-nav__group">
                            <div class="ad-nav__label">{{ group.label }}</div>
                            @for (item of group.items; track item.path) {
                                <a class="ad-nav__item" [routerLink]="item.path" routerLinkActive="is-active"
                                   [routerLinkActiveOptions]="{ exact: !!item.exact }" (click)="menuOpen.set(false)">
                                    <fa-icon [icon]="item.icon" />
                                    {{ item.label }}
                                    @if (item.path === '/admin/messages' && unread() > 0) {
                                        <span class="ad-nav__count" [attr.aria-label]="unread() + ' unread'">{{ unread() }}</span>
                                    }
                                </a>
                            }
                        </div>
                    }
                </nav>

                <div class="ad-sidebar__foot">
                    <a href="/" target="_blank" rel="noopener">
                        <fa-icon [icon]="icons.external" /> View website
                    </a>
                </div>
            </aside>

            @if (menuOpen()) {
                <button type="button" class="ad-scrim" aria-label="Close menu" (click)="menuOpen.set(false)"></button>
            }

            <div class="ad-main">
                <header class="ad-topbar">
                    <button type="button" class="ad-btn ad-btn--ghost ad-btn--icon ad-topbar__menu"
                            [attr.aria-expanded]="menuOpen()" aria-label="Menu" (click)="menuOpen.set(!menuOpen())">
                        <fa-icon [icon]="menuOpen() ? icons.close : icons.menu" />
                    </button>
                    <div class="ad-topbar__spacer"></div>
                    <div class="ad-topbar__user">
                        <span class="ad-topbar__avatar" aria-hidden="true">{{ initials() }}</span>
                        <span class="ad-topbar__who">
                            <span class="ad-topbar__name">{{ user()?.name }}</span><br>
                            <span class="ad-topbar__role">{{ role() }}</span>
                        </span>
                        <button type="button" class="ad-btn ad-btn--ghost ad-btn--sm" (click)="logout()">
                            <fa-icon [icon]="icons.logout" /> Sign out
                        </button>
                    </div>
                </header>

                <main class="ad-content" id="ad-main">
                    <router-outlet />
                </main>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminShellComponent implements OnInit {
    private readonly AUTH = inject(AuthService);
    private readonly API = inject(AdminApiService);
    private readonly HOTEL = inject(HotelApiService);
    private readonly ROUTER = inject(Router);
    private readonly DESTROY = inject(DestroyRef);

    protected readonly icons = { menu: faBars, close: faXmark, logout: faRightFromBracket, external: faArrowUpRightFromSquare };
    protected readonly menuOpen = signal(false);
    protected readonly unread = signal(0);
    protected readonly hotelName = signal('Hotel');
    protected readonly hotelInitial = computed(() => this.hotelName().trim().charAt(0).toUpperCase() || 'H');

    protected readonly user = this.AUTH._USER_EFFECT;
    protected readonly role = computed(() => this.user()?.roles?.[0] ?? '');
    protected readonly initials = computed(() => ADMIN_FORMAT.initials(this.user()?.name));

    protected readonly nav = computed(() => {
        this.user(); // re-evaluate when permissions change
        const CAN = (p: string) => this.AUTH.can(p);
        return ADMIN_NAV
            .map(g => ({ ...g, items: g.items.filter(i => canSee(i, CAN)) }))
            .filter(g => g.items.length);
    });

    public ngOnInit(): void {
        this.HOTEL.hotel().subscribe({ next: h => this.hotelName.set(h.name), error: () => {} });
        this.loadUnread();

        // Refresh the unread badge as the user moves around (cheap, one count query).
        this.ROUTER.events.pipe(filter(e => e instanceof NavigationEnd), takeUntilDestroyed(this.DESTROY))
            .subscribe(() => this.loadUnread());
    }

    private loadUnread(): void {
        if (!this.AUTH.can('contacts.view-any')) return;
        this.API.messages('unread').subscribe({ next: p => this.unread.set(p.total), error: () => {} });
    }

    protected logout(): void {
        this.AUTH.logout().subscribe({
            complete: () => this.afterLogout(),
            error: () => this.afterLogout(),
        });
    }

    private afterLogout(): void {
        resetStaffRefresh();
        this.ROUTER.navigate(['/admin/login']);
    }
}
