/** Formatting helpers shared by admin pages. */
export const ADMIN_FORMAT = {
    /** "2026-12-20" → "20 Dec 2026" */
    date(iso: string | null | undefined, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' }): string {
        if (!iso) return '—';
        const [Y, M, D] = iso.slice(0, 10).split('-').map(Number);
        return new Date(Y, M - 1, D).toLocaleDateString(undefined, opts);
    },

    dateTime(iso: string | null | undefined): string {
        if (!iso) return '—';
        return new Date(iso).toLocaleString(undefined, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    },

    /** "20 – 23 Dec" style stay range. */
    stay(checkIn: string, checkOut: string): string {
        const A = ADMIN_FORMAT.date(checkIn, { day: 'numeric', month: 'short' });
        const B = ADMIN_FORMAT.date(checkOut, { day: 'numeric', month: 'short', year: 'numeric' });
        return `${A} → ${B}`;
    },

    initials(name: string | null | undefined): string {
        return (name ?? '?').split(/\s+/).filter(Boolean).slice(0, 2).map(p => p[0]!.toUpperCase()).join('');
    },
};
