import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import {
    faBed, faCalendarDays, faCalendarPlus, faChartLine, faCircleQuestion, faDoorClosed,
    faEnvelope, faGear, faListCheck, faTags, faUsers, faBan,
} from '@fortawesome/free-solid-svg-icons';

export interface AdminNavItem {
    label: string;
    path: string;
    icon: IconDefinition;
    /** Any of these permissions shows the item. */
    permission: string | string[];
    exact?: boolean;
}

export interface AdminNavGroup {
    label: string;
    items: AdminNavItem[];
}

/** Back-office menu. Order here is also the landing-page priority. */
export const ADMIN_NAV: AdminNavGroup[] = [
    {
        label: 'Front desk',
        items: [
            { label: 'Dashboard', path: '/admin/dashboard', icon: faChartLine, permission: 'bookings.view-any' },
            { label: 'Calendar', path: '/admin/calendar', icon: faCalendarDays, permission: 'bookings.view-any' },
            { label: 'Bookings', path: '/admin/bookings', icon: faListCheck, permission: 'bookings.view-any', exact: true },
            { label: 'New booking', path: '/admin/bookings/new', icon: faCalendarPlus, permission: 'bookings.manage' },
        ],
    },
    {
        label: 'Rooms',
        items: [
            { label: 'Room types', path: '/admin/room-types', icon: faBed, permission: 'rooms.view' },
            { label: 'Rooms', path: '/admin/rooms', icon: faDoorClosed, permission: 'rooms.view' },
            { label: 'Seasonal rates', path: '/admin/rates', icon: faTags, permission: 'rooms.view' },
            { label: 'Room blocks', path: '/admin/blocks', icon: faBan, permission: 'room-blocks.manage' },
        ],
    },
    {
        label: 'Content',
        items: [
            { label: 'Messages', path: '/admin/messages', icon: faEnvelope, permission: 'contacts.view-any' },
            { label: 'FAQ', path: '/admin/faq', icon: faCircleQuestion, permission: 'faq.manage' },
        ],
    },
    {
        label: 'Setup',
        items: [
            { label: 'Hotel settings', path: '/admin/settings', icon: faGear, permission: 'settings.manage' },
            { label: 'Team', path: '/admin/team', icon: faUsers, permission: 'staff.manage' },
        ],
    },
];

export function canSee(item: AdminNavItem, can: (p: string) => boolean): boolean {
    return (Array.isArray(item.permission) ? item.permission : [item.permission]).some(can);
}
