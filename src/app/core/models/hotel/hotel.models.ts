/**
 * Contracts of the hotel-booking-back API.
 * Money values come as decimal strings ("150.00") to avoid float rounding.
 */

export type PaymentMethod = 'paypal' | 'pay_at_hotel';

export type BookingStatus =
    | 'pending' | 'confirmed' | 'checked_in' | 'checked_out'
    | 'cancelled' | 'expired' | 'no_show';

export interface HotelInfo {
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
    payment_methods: PaymentMethod[];
    paypal: { client_id: string; mode: 'sandbox' | 'live'; currency: string } | null;
}

export interface Amenity {
    name: string;
    slug: string;
    icon: string | null;
}

export interface RoomImage {
    url: string;
    alt: string;
}

export interface RoomType {
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
    currency: string;
    images?: RoomImage[];
    amenities?: Amenity[];
}

export interface NightlyRate {
    date: string;
    price: string;
}

export interface Quote {
    currency: string;
    nights: number;
    nightly_rates: NightlyRate[];
    subtotal: string;
    taxes: string;
    total: string;
    amount_due_now: string;
    average_nightly: string;
    min_nights: number;
}

export interface StaySearch {
    check_in: string;   // YYYY-MM-DD
    check_out: string;  // YYYY-MM-DD, exclusive
    adults: number;
    children: number;
}

export interface AvailabilityResult {
    room_type: RoomType;
    available: number;
    quote: Quote;
}

export interface AvailabilityResponse extends StaySearch {
    results: AvailabilityResult[];
}

export interface BookingPayment {
    gateway: PaymentMethod;
    status: 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded';
    paypal_order_id?: string;
    approve_url?: string;
    instructions?: string;
}

export interface Booking {
    reference: string;
    manage_token?: string;
    status: BookingStatus;
    room_type?: RoomType;
    guest_name: string;
    guest_email: string;
    guest_phone?: string;
    adults: number;
    children: number;
    special_requests?: string;
    check_in: string;
    check_out: string;
    nights: number;
    currency: string;
    nightly_rates: NightlyRate[];
    subtotal: string;
    taxes: string;
    total: string;
    amount_due_now: string;
    amount_paid: string;
    amount_refunded: string;
    balance_due: string;
    payment_method: PaymentMethod;
    payment?: BookingPayment;
    hold_expires_at?: string;
    confirmed_at?: string;
    cancelled_at?: string;
    cancellation_reason?: string;
    created_at?: string;
}

export interface CreateBookingRequest extends StaySearch {
    room_type_id: number;
    guest_name: string;
    guest_email: string;
    guest_phone?: string | null;
    special_requests?: string | null;
    payment_method: PaymentMethod;
}

export interface CancelBookingResponse {
    booking: Booking;
    free_cancellation: boolean;
    refunded_amount: string | null;
}

/** Error body of the booking flow: { message, code } (or Laravel validation errors). */
export interface ApiError {
    message: string;
    code?: string;
    errors?: Record<string, string[]>;
}
