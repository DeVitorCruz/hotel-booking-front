import { Pipe, PipeTransform } from '@angular/core';

/** "150.00" + "USD" → "$150.00" (visitor locale). Accepts the API's decimal strings. */
@Pipe({ name: 'money' })
export class MoneyPipe implements PipeTransform {
    public transform(value: string | number | null | undefined, currency: string = 'USD', compact = false): string {
        const N = Number(value ?? 0);
        try {
            return new Intl.NumberFormat(undefined, {
                style: 'currency',
                currency,
                minimumFractionDigits: compact && Number.isInteger(N) ? 0 : 2,
                maximumFractionDigits: 2,
            }).format(N);
        } catch {
            return `${currency} ${N.toFixed(2)}`;
        }
    }
}
