import { HttpErrorResponse } from '@angular/common/http';

/**
 * Human message from an API error: booking errors ({ message, code }),
 * Laravel validation ({ message, errors: { field: [..] } }) or network failure.
 */
export function apiErrorMessage(err: unknown, fallback = 'Something went wrong. Please try again.'): string {
    if (err instanceof HttpErrorResponse) {
        if (err.status === 0) return 'Cannot reach the server. Check your connection.';
        if (err.status === 403) return err.error?.message && err.error.message !== 'This action is unauthorized.'
            ? err.error.message : 'Your role does not allow this action.';
        const ERRORS = err.error?.errors as Record<string, string[]> | undefined;
        if (ERRORS) {
            const FIRST = Object.values(ERRORS)[0]?.[0];
            if (FIRST) return FIRST;
        }
        if (typeof err.error?.message === 'string' && err.error.message) return err.error.message;
    }
    return fallback;
}

/** Field → first message, for inline form errors. */
export function apiFieldErrors(err: unknown): Record<string, string> {
    const OUT: Record<string, string> = {};
    if (err instanceof HttpErrorResponse && err.error?.errors) {
        for (const [K, V] of Object.entries(err.error.errors as Record<string, string[]>)) OUT[K] = V[0];
    }
    return OUT;
}
