import { ChangeDetectionStrategy, Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StaySearch } from '@core/models/hotel/hotel.models';
import { STAY_DATES } from '@core/services/hotel/stay-dates';

/**
 * Dates + guests search. By default navigates to /rooms with the search as
 * query params; set `navigate` to false to just emit `searched`.
 */
@Component({
    selector: 'app-stay-search',
    imports: [FormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <form class="stay-search" [class.stay-search--stacked]="layout() === 'stacked'"
          (ngSubmit)="submit()" aria-label="Search availability">
        <div class="hb-field">
            <label class="hb-label" [for]="id + '-in'">Check-in</label>
            <input class="hb-input" type="date" [id]="id + '-in'" name="check_in" required
                   [min]="today" [ngModel]="checkIn()" (ngModelChange)="onCheckIn($event)">
        </div>
        <div class="hb-field">
            <label class="hb-label" [for]="id + '-out'">Check-out</label>
            <input class="hb-input" type="date" [id]="id + '-out'" name="check_out" required
                   [min]="minCheckOut()" [ngModel]="checkOut()" (ngModelChange)="checkOut.set($event)">
        </div>
        <div class="hb-field">
            <label class="hb-label" [for]="id + '-ad'">Adults</label>
            <select class="hb-select" [id]="id + '-ad'" name="adults" [ngModel]="adults()" (ngModelChange)="adults.set(+$event)">
                @for (n of adultOptions; track n) { <option [value]="n">{{ n }}</option> }
            </select>
        </div>
        <div class="hb-field">
            <label class="hb-label" [for]="id + '-ch'">Children</label>
            <select class="hb-select" [id]="id + '-ch'" name="children" [ngModel]="children()" (ngModelChange)="children.set(+$event)">
                @for (n of childOptions; track n) { <option [value]="n">{{ n }}</option> }
            </select>
        </div>
        <div class="stay-search__action">
            <button class="hb-btn hb-btn--gold hb-btn--block" type="submit" [disabled]="!valid()">
                {{ submitLabel() }}
            </button>
            @if (nights() > 0) {
                <span class="stay-search__nights">{{ nights() }} night{{ nights() > 1 ? 's' : '' }}</span>
            }
        </div>
    </form>
    `,
    styles: [`
    :host { display: block; }
    .stay-search {
        display: grid; gap: 12px; align-items: end;
        grid-template-columns: 1fr 1fr;
        padding: 20px; background: var(--hb-white); border-radius: var(--hb-radius); box-shadow: var(--hb-shadow);
    }
    .stay-search__action { grid-column: 1 / -1; display: flex; flex-direction: column; gap: 6px; }
    .stay-search__nights { font-size: 12px; color: var(--hb-muted); text-align: center; }
    @media (min-width: 900px) {
        .stay-search:not(.stay-search--stacked) { grid-template-columns: 1.3fr 1.3fr .8fr .8fr 1.2fr; padding: 24px; }
        .stay-search:not(.stay-search--stacked) .stay-search__action { grid-column: auto; position: relative; }
        .stay-search:not(.stay-search--stacked) .stay-search__nights { position: absolute; top: 100%; left: 0; right: 0; margin-top: 6px; }
    }
    .stay-search--stacked { grid-template-columns: 1fr 1fr; box-shadow: none; padding: 0; background: transparent; }
    `],
})
export class StaySearchComponent {
    private readonly ROUTER = inject(Router);
    private static seq = 0;

    public readonly initial = input<StaySearch | null>(null);
    public readonly layout = input<'bar' | 'stacked'>('bar');
    public readonly submitLabel = input('Check availability');
    public readonly navigate = input(true);
    /** Extra query params kept on navigation (e.g. the room slug). */
    public readonly target = input<string>('/rooms');
    public readonly searched = output<StaySearch>();

    public readonly id = `stay-${++StaySearchComponent.seq}`;
    public readonly today = STAY_DATES.today();
    public readonly adultOptions = [1, 2, 3, 4, 5, 6];
    public readonly childOptions = [0, 1, 2, 3, 4];

    public readonly checkIn = signal(STAY_DATES.addDays(this.today, 1));
    public readonly checkOut = signal(STAY_DATES.addDays(this.today, 3));
    public readonly adults = signal(2);
    public readonly children = signal(0);

    public readonly minCheckOut = computed(() => STAY_DATES.addDays(this.checkIn() || this.today, 1));
    public readonly nights = computed(() =>
        STAY_DATES.isValidIso(this.checkIn()) && STAY_DATES.isValidIso(this.checkOut())
            ? STAY_DATES.nights(this.checkIn(), this.checkOut()) : 0);
    public readonly valid = computed(() => this.nights() > 0 && this.checkIn() >= this.today);

    constructor() {
        effect(() => {
            const S = this.initial();
            if (!S) return;
            this.checkIn.set(S.check_in);
            this.checkOut.set(S.check_out);
            this.adults.set(S.adults);
            this.children.set(S.children);
        });
    }

    public onCheckIn(value: string): void {
        this.checkIn.set(value);
        // Keep the stay length sensible when check-in moves past check-out.
        if (STAY_DATES.isValidIso(value) && (!this.checkOut() || this.checkOut() <= value)) {
            this.checkOut.set(STAY_DATES.addDays(value, 1));
        }
    }

    public submit(): void {
        if (!this.valid()) return;
        const SEARCH: StaySearch = {
            check_in: this.checkIn(),
            check_out: this.checkOut(),
            adults: this.adults(),
            children: this.children(),
        };
        this.searched.emit(SEARCH);
        if (this.navigate()) {
            this.ROUTER.navigate([this.target()], { queryParams: SEARCH });
        }
    }
}
