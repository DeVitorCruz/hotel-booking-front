import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';
import { ENVIRONMENT } from '@environments/environment';
import {
    ApiError, AvailabilityResponse, Booking, CancelBookingResponse, CreateBookingRequest,
    HotelInfo, RoomType, StaySearch,
} from '@core/models/hotel/hotel.models';

/**
 * Single entry point to the hotel API. Pages never call HttpClient directly.
 */
@Injectable({ providedIn: 'root' })
export class HotelApiService {
    private readonly HTTP = inject(HttpClient);
    private readonly BASE = ENVIRONMENT.apiUrl;

    /** Hotel info rarely changes: fetched once per app load. */
    private hotel$?: Observable<HotelInfo>;

    public hotel(): Observable<HotelInfo> {
        return this.hotel$ ??= this.HTTP.get<HotelInfo>(`${this.BASE}/hotel`).pipe(
            // A failed request must not be cached forever
            tap({ error: () => this.hotel$ = undefined }),
            shareReplay(1),
        );
    }

    /** Drop the cached hotel info (after staff change the settings). */
    public forgetHotel(): void {
        this.hotel$ = undefined;
    }

    public roomTypes(): Observable<RoomType[]> {
        return this.HTTP.get<RoomType[]>(`${this.BASE}/room-types`);
    }

    public roomType(slug: string): Observable<RoomType> {
        return this.HTTP.get<RoomType>(`${this.BASE}/room-types/${encodeURIComponent(slug)}`);
    }

    public availability(search: StaySearch): Observable<AvailabilityResponse> {
        const PARAMS = new HttpParams({ fromObject: { ...search } as Record<string, string | number> });
        return this.HTTP.get<AvailabilityResponse>(`${this.BASE}/availability`, { params: PARAMS });
    }

    public createBooking(body: CreateBookingRequest): Observable<Booking> {
        return this.HTTP.post<Booking>(`${this.BASE}/bookings`, body);
    }

    public booking(reference: string, token: string): Observable<Booking> {
        return this.HTTP.get<Booking>(`${this.BASE}/bookings/${reference}`, { headers: this.tokenHeader(token) });
    }

    public capturePayPal(reference: string, token: string, orderId: string): Observable<Booking> {
        return this.HTTP.post<Booking>(
            `${this.BASE}/bookings/${reference}/paypal/capture`,
            { order_id: orderId },
            { headers: this.tokenHeader(token) },
        );
    }

    public retryPayPal(reference: string, token: string): Observable<Booking> {
        return this.HTTP.post<Booking>(`${this.BASE}/bookings/${reference}/paypal/retry`, {}, { headers: this.tokenHeader(token) });
    }

    public cancelBooking(reference: string, token: string): Observable<CancelBookingResponse> {
        return this.HTTP.post<CancelBookingResponse>(`${this.BASE}/bookings/${reference}/cancel`, {}, { headers: this.tokenHeader(token) });
    }

    /** Normalizes any HTTP failure into { message, code }. */
    public static toApiError(error: unknown): ApiError {
        if (error instanceof HttpErrorResponse) {
            const BODY = error.error as Partial<ApiError> | null;
            if (BODY?.errors) {
                const FIRST = Object.values(BODY.errors)[0]?.[0];
                return { message: FIRST ?? BODY.message ?? 'Please check the form.', code: 'validation', errors: BODY.errors };
            }
            if (BODY?.message) {
                return { message: BODY.message, code: BODY.code };
            }
            if (error.status === 0) {
                return { message: 'We could not reach the hotel server. Check your connection and try again.', code: 'network' };
            }
        }
        return { message: 'Something went wrong. Please try again.', code: 'unknown' };
    }

    private tokenHeader(token: string): HttpHeaders {
        return new HttpHeaders({ 'X-Booking-Token': token });
    }
}
