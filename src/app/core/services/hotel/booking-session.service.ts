import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Remembers manage tokens of bookings made in this browser so a refresh of the
 * booking page (or the PayPal redirect flow) still works without the email link.
 */
@Injectable({ providedIn: 'root' })
export class BookingSessionService {
    private readonly IS_BROWSER = isPlatformBrowser(inject(PLATFORM_ID));
    private readonly KEY = 'hb_booking_tokens';

    public remember(reference: string, token: string): void {
        if (!this.IS_BROWSER) return;
        try {
            const ALL = this.all();
            ALL[reference] = token;
            localStorage.setItem(this.KEY, JSON.stringify(ALL));
        } catch { /* storage blocked: the email link still works */ }
    }

    public token(reference: string): string | null {
        return this.all()[reference] ?? null;
    }

    private all(): Record<string, string> {
        if (!this.IS_BROWSER) return {};
        try {
            return JSON.parse(localStorage.getItem(this.KEY) ?? '{}') as Record<string, string>;
        } catch {
            return {};
        }
    }
}
