import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { PERMISSION_GUARD, STAFF_GUARD } from './core/admin-guards';
import { ADMIN_NAV, canSee } from './layout/admin-nav';

/** First menu entry the signed-in user may open (editors land on Messages, etc.). */
const LANDING = () => {
    const AUTH = inject(AuthService);
    const FIRST = ADMIN_NAV.flatMap(g => g.items).find(i => canSee(i, p => AUTH.can(p)));
    return inject(Router).parseUrl(FIRST?.path ?? '/admin/login?denied=1');
};

const page = (path: string, permission: string | string[], load: () => Promise<any>, title: string) => ({
    path, loadComponent: load, canActivate: [PERMISSION_GUARD], data: { permission }, title: `${title} · Back office`,
});

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./layout/admin-root.component').then(m => m.AdminRootComponent),
        children: [
            { path: 'login', title: 'Sign in · Back office', loadComponent: () => import('./pages/login.page').then(m => m.AdminLoginPage) },
            {
                path: '',
                canActivate: [STAFF_GUARD],
                loadComponent: () => import('./layout/admin-shell.component').then(m => m.AdminShellComponent),
                children: [
                    { path: '', pathMatch: 'full', redirectTo: LANDING },
                    page('dashboard', 'bookings.view-any', () => import('./pages/dashboard.page').then(m => m.DashboardPage), 'Dashboard'),
                    page('calendar', 'bookings.view-any', () => import('./pages/calendar.page').then(m => m.CalendarPage), 'Calendar'),
                    page('bookings', 'bookings.view-any', () => import('./pages/bookings.page').then(m => m.BookingsPage), 'Bookings'),
                    page('bookings/new', 'bookings.manage', () => import('./pages/booking-new.page').then(m => m.BookingNewPage), 'New booking'),
                    page('bookings/:id', 'bookings.view-any', () => import('./pages/booking-detail.page').then(m => m.BookingDetailPage), 'Booking'),
                    page('room-types', 'rooms.view', () => import('./pages/room-types.page').then(m => m.RoomTypesPage), 'Room types'),
                    page('room-types/new', 'rooms.manage', () => import('./pages/room-type-edit.page').then(m => m.RoomTypeEditPage), 'New room type'),
                    page('room-types/:id', 'rooms.view', () => import('./pages/room-type-edit.page').then(m => m.RoomTypeEditPage), 'Room type'),
                    page('rooms', 'rooms.view', () => import('./pages/rooms.page').then(m => m.RoomsPage), 'Rooms'),
                    page('rates', 'rooms.view', () => import('./pages/rates.page').then(m => m.RatesPage), 'Seasonal rates'),
                    page('blocks', 'room-blocks.manage', () => import('./pages/blocks.page').then(m => m.BlocksPage), 'Room blocks'),
                    page('messages', 'contacts.view-any', () => import('./pages/messages.page').then(m => m.MessagesPage), 'Messages'),
                    page('faq', 'faq.manage', () => import('./pages/faq.page').then(m => m.FaqPage), 'FAQ'),
                    page('settings', 'settings.manage', () => import('./pages/settings.page').then(m => m.SettingsPage), 'Hotel settings'),
                    page('team', 'staff.manage', () => import('./pages/team.page').then(m => m.TeamPage), 'Team'),
                    { path: '**', redirectTo: '' },
                ],
            },
        ],
    },
];
