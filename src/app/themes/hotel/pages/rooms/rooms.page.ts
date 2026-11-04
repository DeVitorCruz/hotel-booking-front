import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { HotelApiService } from '@core/services/hotel/hotel-api.service';
import { STAY_DATES } from '@core/services/hotel/stay-dates';
import { ApiError, AvailabilityResult, RoomType, StaySearch } from '@core/models/hotel/hotel.models';
import { StaySearchComponent } from '../../components/stay-search/stay-search.component';
import { RoomCardComponent } from '../../components/room-card/room-card.component';
import { hotelContent } from '../hotel-content';

type RoomsState =
  | { kind: 'loading' }
  | { kind: 'catalog'; rooms: RoomType[] }
  | { kind: 'results'; search: StaySearch; results: AvailabilityResult[] }
  | { kind: 'error'; error: ApiError };

/**
 * /rooms                          → all room types with "from" prices
 * /rooms?check_in=&check_out=&... → live availability and stay prices
 */
@Component({
  selector: 'app-rooms-page',
  imports: [StaySearchComponent, RoomCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <section class="hb-section rooms">
    <div class="hb-container">
      <div class="rooms__search">
        <app-stay-search [initial]="search()" submitLabel="Update search" />
      </div>

      @switch (state().kind) {
        @case ('loading') {
          <div class="rooms__grid" aria-busy="true">
            @for (i of [1, 2, 3]; track i) { <div class="hb-skeleton rooms__skeleton"></div> }
          </div>
        }
        @case ('error') {
          <p class="hb-alert hb-alert--error" role="alert">{{ errorMessage() }}</p>
        }
        @case ('catalog') {
          <header class="rooms__head">
            <h2 class="hb-title">{{ C.rooms.title }}</h2>
            <p class="hb-subtitle">Choose your dates above to see live prices and availability.</p>
          </header>
          <div class="rooms__grid">
            @for (room of catalog(); track room.id) {
              <app-room-card [room]="room" [placeholder]="C.roomPlaceholder" />
            } @empty { <p class="hb-subtitle">No rooms are published yet.</p> }
          </div>
        }
        @case ('results') {
          <header class="rooms__head" aria-live="polite">
            <h2 class="hb-title">{{ availableCount() }} option{{ availableCount() === 1 ? '' : 's' }} for your stay</h2>
            <p class="hb-subtitle">{{ summary() }}</p>
          </header>
          @if (results().length === 0) {
            <p class="hb-alert">No room fits {{ guestsLabel() }}. Try fewer guests per room or contact us for group bookings.</p>
          } @else if (availableCount() === 0) {
            <p class="hb-alert">We're fully booked for these dates. Try moving your stay by a day or two.</p>
          }
          <div class="rooms__grid">
            @for (r of results(); track r.room_type.id) {
              <app-room-card [room]="r.room_type" [quote]="r.available ? r.quote : null" [available]="r.available"
                             [search]="search()" [placeholder]="C.roomPlaceholder" />
            }
          </div>
        }
      }
    </div>
  </section>
  `,
  styles: [`
  .rooms__search { margin-bottom: 48px; }
  .rooms__head { margin-bottom: 28px; }
  .rooms__grid { display: grid; gap: 24px; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }
  .rooms__skeleton { height: 460px; }
  `],
})
export class RoomsPage {
  private readonly API = inject(HotelApiService);
  private readonly ROUTE = inject(ActivatedRoute);
  public readonly C = hotelContent();

  private readonly params = toSignal(this.ROUTE.queryParams, { initialValue: {} as Record<string, unknown> });
  public readonly search = computed(() => STAY_DATES.hasSearch(this.params()) ? STAY_DATES.fromParams(this.params()) : null);

  public readonly state = toSignal(
    this.ROUTE.queryParams.pipe(
      switchMap((params): import('rxjs').Observable<RoomsState> => {
        if (!STAY_DATES.hasSearch(params)) {
          return this.API.roomTypes().pipe(
            map(rooms => ({ kind: 'catalog', rooms }) as RoomsState),
            catchError(e => of({ kind: 'error', error: HotelApiService.toApiError(e) } as RoomsState)),
            startWith({ kind: 'loading' } as RoomsState),
          );
        }
        const SEARCH = STAY_DATES.fromParams(params);
        return this.API.availability(SEARCH).pipe(
          map(res => ({ kind: 'results', search: SEARCH, results: res.results }) as RoomsState),
          catchError(e => of({ kind: 'error', error: HotelApiService.toApiError(e) } as RoomsState)),
          startWith({ kind: 'loading' } as RoomsState),
        );
      }),
    ),
    { initialValue: { kind: 'loading' } as RoomsState },
  );

  public readonly catalog = computed(() => { const S = this.state(); return S.kind === 'catalog' ? S.rooms : []; });
  public readonly results = computed(() => {
    const S = this.state();
    // Available first, then by price
    return S.kind === 'results'
      ? [...S.results].sort((a, b) => (+(b.available > 0) - +(a.available > 0)) || (+a.quote.total - +b.quote.total))
      : [];
  });
  public readonly availableCount = computed(() => this.results().filter(r => r.available > 0).length);
  public readonly errorMessage = computed(() => { const S = this.state(); return S.kind === 'error' ? S.error.message : ''; });

  public readonly guestsLabel = computed(() => {
    const S = this.search();
    if (!S) return '';
    return `${S.adults} adult${S.adults > 1 ? 's' : ''}` + (S.children ? ` and ${S.children} child${S.children > 1 ? 'ren' : ''}` : '');
  });

  public readonly summary = computed(() => {
    const S = this.search();
    if (!S) return '';
    const N = STAY_DATES.nights(S.check_in, S.check_out);
    return `${STAY_DATES.pretty(S.check_in)} – ${STAY_DATES.pretty(S.check_out)} · ${N} night${N > 1 ? 's' : ''} · ${this.guestsLabel()}`;
  });
}
