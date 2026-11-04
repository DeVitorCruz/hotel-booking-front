import { StaySearch } from '@core/models/hotel/hotel.models';

/** Date helpers working on plain YYYY-MM-DD strings (no timezone surprises). */
export const STAY_DATES = {
    today(): string {
        return STAY_DATES.toIso(new Date());
    },

    addDays(iso: string, days: number): string {
        const [Y, M, D] = iso.split('-').map(Number);
        return STAY_DATES.toIso(new Date(Y, M - 1, D + days));
    },

    nights(checkIn: string, checkOut: string): number {
        const A = Date.UTC(...(STAY_DATES.parts(checkIn)));
        const B = Date.UTC(...(STAY_DATES.parts(checkOut)));
        return Math.round((B - A) / 86_400_000);
    },

    toIso(d: Date): string {
        const PAD = (n: number) => String(n).padStart(2, '0');
        return `${d.getFullYear()}-${PAD(d.getMonth() + 1)}-${PAD(d.getDate())}`;
    },

    parts(iso: string): [number, number, number] {
        const [Y, M, D] = iso.split('-').map(Number);
        return [Y, M - 1, D];
    },

    /** "Fri, 20 Dec 2026" in the visitor's locale. */
    pretty(iso: string, locale?: string): string {
        const [Y, M, D] = STAY_DATES.parts(iso);
        return new Date(Y, M, D).toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
    },

    isValidIso(value: unknown): value is string {
        return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);
    },

    /** Read a StaySearch from query params; falls back to tomorrow → +2 nights, 2 adults. */
    fromParams(params: Record<string, unknown>): StaySearch {
        const TOMORROW = STAY_DATES.addDays(STAY_DATES.today(), 1);
        const CHECK_IN = STAY_DATES.isValidIso(params['check_in']) ? params['check_in'] : TOMORROW;
        let checkOut = STAY_DATES.isValidIso(params['check_out']) ? params['check_out'] : STAY_DATES.addDays(CHECK_IN, 2);
        if (checkOut <= CHECK_IN) checkOut = STAY_DATES.addDays(CHECK_IN, 1);

        const NUM = (v: unknown, def: number, min: number) => {
            const N = Number(v);
            return Number.isFinite(N) && N >= min ? Math.floor(N) : def;
        };

        return {
            check_in: CHECK_IN,
            check_out: checkOut,
            adults: NUM(params['adults'], 2, 1),
            children: NUM(params['children'], 0, 0),
        };
    },

    hasSearch(params: Record<string, unknown>): boolean {
        return STAY_DATES.isValidIso(params['check_in']) && STAY_DATES.isValidIso(params['check_out']);
    },
};
