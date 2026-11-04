/**
 * Contracts of the /api/admin/* endpoints (hotel-booking-back).
 * Money values are decimal strings ("150.00"); dates are YYYY-MM-DD.
 */
import { Booking, BookingStatus, PaymentMethod } from '@core/models/hotel/hotel.models';

export type { BookingStatus, PaymentMethod };

export interface StaffBooking extends Booking {
    id: number;
    room_id: number;
    room_number?: string;
    source: 'web' | 'admin';
    history: { from: BookingStatus | null; to: BookingStatus; note: string | null; by: number | null; at: string }[];
}

export interface Paginated<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface BookingFilters {
    status?: string;
    q?: string;
    from?: string;
    to?: string;
    page?: number;
}

export interface BookingSummary {
    id: number;
    reference: string;
    guest_name: string;
    room_number: string | null;
    room_type: string | null;
    check_in: string;
    check_out: string;
    status: BookingStatus;
    adults: number;
    children: number;
}

export interface Dashboard {
    date: string;
    currency: string;
    rooms_sellable: number;
    occupancy_today: number;
    occupancy_next_30: number;
    in_house: number;
    pending_holds: number;
    upcoming_confirmed: number;
    revenue_month: string;
    unread_messages: number;
    arrivals: BookingSummary[];
    departures: BookingSummary[];
}

export interface CalendarRoom {
    id: number;
    number: string;
    status: RoomStatus;
    room_type_id: number;
    room_type: string | null;
}

export interface CalendarData {
    from: string;
    days: number;
    rooms: CalendarRoom[];
    bookings: { id: number; reference: string; room_id: number; guest_name: string; status: BookingStatus; check_in: string; check_out: string }[];
    blocks: { id: number; room_id: number; reason: string | null; start_date: string; end_date: string }[];
}

export interface AdminImage {
    id: number;
    url: string;
    alt: string | null;
    sort_order: number;
}

export interface AdminRoomType {
    id: number;
    name: string;
    slug: string;
    short_description: string | null;
    description: string | null;
    max_adults: number;
    max_children: number;
    max_occupancy: number;
    beds: string | null;
    size_sqm: number | null;
    base_price: string;
    is_active: boolean;
    sort_order: number;
    rooms_count: number;
    amenity_ids: number[];
    images: AdminImage[];
}

export type RoomTypeInput = Partial<Omit<AdminRoomType, 'id' | 'rooms_count' | 'images' | 'base_price'>> & { base_price?: number | string };

export interface AdminAmenity {
    id: number;
    name: string;
    slug: string;
    icon: string | null;
}

export type RoomStatus = 'active' | 'maintenance' | 'inactive';

export interface AdminRoom {
    id: number;
    number: string;
    floor: string | null;
    status: RoomStatus;
    notes: string | null;
    room_type_id: number;
    room_type: string | null;
}

export interface RateOverride {
    id: number;
    room_type_id: number;
    room_type: string | null;
    label: string | null;
    start_date: string;
    end_date: string; // inclusive
    price: string;
    min_nights: number | null;
    priority: number;
}

export interface RoomBlock {
    id: number;
    room_id: number;
    room?: { id: number; number: string };
    start_date: string;
    end_date: string; // exclusive
    reason: string | null;
}

export interface HotelSettingsData {
    name: string;
    email: string;
    phone: string | null;
    address: string | null;
    timezone: string;
    currency: string;
    check_in_time: string;
    check_out_time: string;
    tax_percent: number;
    deposit_percent: number;
    min_nights: number;
    max_nights: number;
    max_advance_days: number;
    hold_minutes: number;
    cancellation_hours: number;
    auto_refund_on_cancel: boolean;
    payment_methods: PaymentMethod[];
}

export type StaffRole = 'owner' | 'admin' | 'receptionist' | 'editor';

export interface StaffMember {
    id: number;
    name: string;
    email: string;
    role: StaffRole | null;
    created_at: string | null;
}

export interface ContactMessage {
    id: number;
    name: string;
    email: string;
    subject: string | null;
    message: string;
    status: 'unread' | 'read' | 'replied';
    created_at: string;
    user?: { id: number; name: string; email: string } | null;
}

export interface Faq {
    id: number;
    question: string;
    answer: string;
    category: string | null;
    order: number;
    active: boolean;
}

export interface WalkInRequest {
    room_type_id: number;
    check_in: string;
    check_out: string;
    adults: number;
    children: number;
    guest_name: string;
    guest_email: string;
    guest_phone?: string | null;
    special_requests?: string | null;
}
