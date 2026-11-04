import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENVIRONMENT } from '@environments/environment';
import { Observable } from 'rxjs';
import {
    AdminAmenity, AdminImage, AdminRoom, AdminRoomType, BookingFilters, CalendarData, ContactMessage,
    Dashboard, Faq, HotelSettingsData, Paginated, RateOverride, RoomBlock, RoomTypeInput, StaffBooking,
    StaffMember, StaffRole, WalkInRequest,
} from './admin.models';

/** Thin client for /api/admin/*. Errors are left to callers (see apiErrorMessage). */
@Injectable({ providedIn: 'root' })
export class AdminApiService {
    private readonly HTTP = inject(HttpClient);
    private readonly API = ENVIRONMENT.apiUrl;
    private readonly ADMIN = `${ENVIRONMENT.apiUrl}/admin`;

    private params(values: Record<string, unknown> = {}): HttpParams {
        let p = new HttpParams();
        for (const [K, V] of Object.entries(values)) {
            if (V !== undefined && V !== null && V !== '') p = p.set(K, String(V));
        }
        return p;
    }

    // --- Front desk -------------------------------------------------------
    public dashboard(): Observable<Dashboard> {
        return this.HTTP.get<Dashboard>(`${this.ADMIN}/dashboard`);
    }

    public calendar(from: string, days: number): Observable<CalendarData> {
        return this.HTTP.get<CalendarData>(`${this.ADMIN}/calendar`, { params: this.params({ from, days }) });
    }

    public bookings(filters: BookingFilters): Observable<Paginated<StaffBooking>> {
        return this.HTTP.get<Paginated<StaffBooking>>(`${this.ADMIN}/bookings`, { params: this.params({ ...filters }) });
    }

    public booking(id: number): Observable<StaffBooking> {
        return this.HTTP.get<StaffBooking>(`${this.ADMIN}/bookings/${id}`);
    }

    public createBooking(body: WalkInRequest): Observable<StaffBooking> {
        return this.HTTP.post<StaffBooking>(`${this.ADMIN}/bookings`, body);
    }

    public setStatus(id: number, status: 'checked_in' | 'checked_out' | 'no_show', note?: string): Observable<StaffBooking> {
        return this.HTTP.patch<StaffBooking>(`${this.ADMIN}/bookings/${id}/status`, { status, note: note || null });
    }

    public markPaid(id: number): Observable<StaffBooking> {
        return this.HTTP.post<StaffBooking>(`${this.ADMIN}/bookings/${id}/mark-paid`, {});
    }

    public cancelBooking(id: number, reason: string, refund: boolean): Observable<{ booking: StaffBooking; refunded_amount: string | null }> {
        return this.HTTP.post<{ booking: StaffBooking; refunded_amount: string | null }>(`${this.ADMIN}/bookings/${id}/cancel`, { reason, refund });
    }

    public refund(id: number, amount?: number | null): Observable<{ booking: StaffBooking; refunded_amount: string }> {
        return this.HTTP.post<{ booking: StaffBooking; refunded_amount: string }>(`${this.ADMIN}/bookings/${id}/refund`, amount ? { amount } : {});
    }

    // --- Rooms & rates ----------------------------------------------------
    public amenities(): Observable<AdminAmenity[]> {
        return this.HTTP.get<AdminAmenity[]>(`${this.API}/amenities`);
    }

    public roomTypes(): Observable<AdminRoomType[]> {
        return this.HTTP.get<AdminRoomType[]>(`${this.ADMIN}/room-types`);
    }

    public roomType(id: number): Observable<AdminRoomType> {
        return this.HTTP.get<AdminRoomType>(`${this.ADMIN}/room-types/${id}`);
    }

    public createRoomType(body: RoomTypeInput): Observable<AdminRoomType> {
        return this.HTTP.post<AdminRoomType>(`${this.ADMIN}/room-types`, body);
    }

    public updateRoomType(id: number, body: RoomTypeInput): Observable<AdminRoomType> {
        return this.HTTP.patch<AdminRoomType>(`${this.ADMIN}/room-types/${id}`, body);
    }

    public deleteRoomType(id: number): Observable<void> {
        return this.HTTP.delete<void>(`${this.ADMIN}/room-types/${id}`);
    }

    public uploadImage(typeId: number, file: File, alt?: string): Observable<AdminImage> {
        const FORM = new FormData();
        FORM.append('image', file);
        if (alt) FORM.append('alt', alt);
        return this.HTTP.post<AdminImage>(`${this.ADMIN}/room-types/${typeId}/images`, FORM);
    }

    public addImageUrl(typeId: number, url: string, alt?: string): Observable<AdminImage> {
        return this.HTTP.post<AdminImage>(`${this.ADMIN}/room-types/${typeId}/images`, { url, alt: alt || null });
    }

    public orderImages(typeId: number, ids: number[]): Observable<AdminRoomType> {
        return this.HTTP.patch<AdminRoomType>(`${this.ADMIN}/room-types/${typeId}/images/order`, { ids });
    }

    public deleteImage(typeId: number, imageId: number): Observable<void> {
        return this.HTTP.delete<void>(`${this.ADMIN}/room-types/${typeId}/images/${imageId}`);
    }

    public rooms(roomTypeId?: number): Observable<AdminRoom[]> {
        return this.HTTP.get<AdminRoom[]>(`${this.ADMIN}/rooms`, { params: this.params({ room_type_id: roomTypeId }) });
    }

    public createRoom(body: Partial<AdminRoom>): Observable<AdminRoom> {
        return this.HTTP.post<AdminRoom>(`${this.ADMIN}/rooms`, body);
    }

    public updateRoom(id: number, body: Partial<AdminRoom>): Observable<AdminRoom> {
        return this.HTTP.patch<AdminRoom>(`${this.ADMIN}/rooms/${id}`, body);
    }

    public deleteRoom(id: number): Observable<void> {
        return this.HTTP.delete<void>(`${this.ADMIN}/rooms/${id}`);
    }

    public rates(roomTypeId?: number, from?: string): Observable<RateOverride[]> {
        return this.HTTP.get<RateOverride[]>(`${this.ADMIN}/rates`, { params: this.params({ room_type_id: roomTypeId, from }) });
    }

    public createRate(body: Partial<RateOverride>): Observable<RateOverride> {
        return this.HTTP.post<RateOverride>(`${this.ADMIN}/rates`, body);
    }

    public updateRate(id: number, body: Partial<RateOverride>): Observable<RateOverride> {
        return this.HTTP.patch<RateOverride>(`${this.ADMIN}/rates/${id}`, body);
    }

    public deleteRate(id: number): Observable<void> {
        return this.HTTP.delete<void>(`${this.ADMIN}/rates/${id}`);
    }

    public blocks(from?: string): Observable<RoomBlock[]> {
        return this.HTTP.get<RoomBlock[]>(`${this.ADMIN}/room-blocks`, { params: this.params({ from }) });
    }

    public createBlock(body: { room_id: number; start_date: string; end_date: string; reason?: string | null }): Observable<RoomBlock> {
        return this.HTTP.post<RoomBlock>(`${this.ADMIN}/room-blocks`, body);
    }

    public deleteBlock(id: number): Observable<unknown> {
        return this.HTTP.delete(`${this.ADMIN}/room-blocks/${id}`);
    }

    // --- Hotel & team -----------------------------------------------------
    public settings(): Observable<HotelSettingsData> {
        return this.HTTP.get<HotelSettingsData>(`${this.ADMIN}/settings`);
    }

    public saveSettings(body: Partial<HotelSettingsData>): Observable<HotelSettingsData> {
        return this.HTTP.patch<HotelSettingsData>(`${this.ADMIN}/settings`, body);
    }

    public staff(): Observable<StaffMember[]> {
        return this.HTTP.get<StaffMember[]>(`${this.ADMIN}/staff`);
    }

    public createStaff(body: { name: string; email: string; password: string; role: StaffRole }): Observable<StaffMember> {
        return this.HTTP.post<StaffMember>(`${this.ADMIN}/staff`, body);
    }

    public updateStaff(id: number, body: { name?: string; role?: StaffRole; password?: string }): Observable<StaffMember> {
        return this.HTTP.patch<StaffMember>(`${this.ADMIN}/staff/${id}`, body);
    }

    public removeStaff(id: number): Observable<void> {
        return this.HTTP.delete<void>(`${this.ADMIN}/staff/${id}`);
    }

    // --- Content ----------------------------------------------------------
    public messages(status?: string, page = 1): Observable<Paginated<ContactMessage>> {
        return this.HTTP.get<Paginated<ContactMessage>>(`${this.ADMIN}/contacts`, { params: this.params({ status, page }) });
    }

    public message(id: number): Observable<ContactMessage> {
        return this.HTTP.get<ContactMessage>(`${this.ADMIN}/contacts/${id}`);
    }

    public setMessageStatus(id: number, status: ContactMessage['status']): Observable<ContactMessage> {
        return this.HTTP.patch<ContactMessage>(`${this.ADMIN}/contacts/${id}`, { status });
    }

    public deleteMessage(id: number): Observable<void> {
        return this.HTTP.delete<void>(`${this.ADMIN}/contacts/${id}`);
    }

    public faqs(): Observable<Faq[]> {
        return this.HTTP.get<Faq[]>(`${this.ADMIN}/faqs`);
    }

    public createFaq(body: Partial<Faq>): Observable<Faq> {
        return this.HTTP.post<Faq>(`${this.ADMIN}/faqs`, body);
    }

    public updateFaq(id: number, body: Partial<Faq>): Observable<Faq> {
        return this.HTTP.patch<Faq>(`${this.ADMIN}/faqs/${id}`, body);
    }

    public deleteFaq(id: number): Observable<void> {
        return this.HTTP.delete<void>(`${this.ADMIN}/faqs/${id}`);
    }
}
