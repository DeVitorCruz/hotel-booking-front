import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { NightlyRate } from '@core/models/hotel/hotel.models';
import { MoneyPipe } from '@core/services/hotel/money.pipe';
import { STAY_DATES } from '@core/services/hotel/stay-dates';

/** Price breakdown used by the booking page and the booking confirmation. */
@Component({
    selector: 'app-price-summary',
    imports: [MoneyPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <dl class="price">
        <div class="price__row">
            <dt>
                {{ nightlyRates().length }} night{{ nightlyRates().length > 1 ? 's' : '' }}
                @if (nightlyRates().length > 1) {
                    <button type="button" class="price__toggle" (click)="open.set(!open())" [attr.aria-expanded]="open()">
                        {{ open() ? 'hide' : 'details' }}
                    </button>
                }
            </dt>
            <dd>{{ subtotal() | money: currency() }}</dd>
        </div>
        @if (open()) {
            @for (n of nightlyRates(); track n.date) {
                <div class="price__row price__row--night"><dt>{{ pretty(n.date) }}</dt><dd>{{ n.price | money: currency() }}</dd></div>
            }
        }
        @if (+taxes() > 0) {
            <div class="price__row"><dt>Taxes & fees</dt><dd>{{ taxes() | money: currency() }}</dd></div>
        }
        <div class="price__row price__row--total"><dt>Total</dt><dd>{{ total() | money: currency() }}</dd></div>
        @if (dueNow() !== null && +dueNow()! < +total() && +dueNow()! > 0) {
            <div class="price__row price__row--due"><dt>Pay now</dt><dd>{{ dueNow() | money: currency() }}</dd></div>
            <div class="price__row price__row--note"><dt>Pay at the hotel</dt><dd>{{ (+total() - +dueNow()!) | money: currency() }}</dd></div>
        }
    </dl>
    `,
    styles: [`
    .price { margin: 0; display: flex; flex-direction: column; gap: 10px; font-size: 14px; }
    .price__row { display: flex; justify-content: space-between; gap: 12px; }
    .price__row dt { color: var(--hb-muted); }
    .price__row dd { margin: 0; color: var(--hb-ink); font-variant-numeric: tabular-nums; }
    .price__row--night { font-size: 13px; padding-left: 12px; }
    .price__row--total { padding-top: 12px; border-top: 1px solid var(--hb-line); font-weight: 700; font-size: 18px; }
    .price__row--total dt, .price__row--total dd { color: var(--hb-ink); }
    .price__row--due dd { font-weight: 700; color: var(--hb-olive); }
    .price__toggle { margin-left: 6px; background: none; border: 0; padding: 0; color: var(--hb-gold-dark); font-size: 12px; text-decoration: underline; cursor: pointer; }
    `],
})
export class PriceSummaryComponent {
    public readonly currency = input.required<string>();
    public readonly nightlyRates = input<NightlyRate[]>([]);
    public readonly subtotal = input.required<string>();
    public readonly taxes = input<string>('0');
    public readonly total = input.required<string>();
    public readonly dueNow = input<string | null>(null);

    public readonly open = signal(false);
    public readonly pretty = (iso: string) => STAY_DATES.pretty(iso);
}
