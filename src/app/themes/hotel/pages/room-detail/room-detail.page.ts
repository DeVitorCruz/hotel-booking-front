import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBed, faChild, faMaximize, faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { catchError, combineLatest, map, of, startWith, switchMap } from 'rxjs';
import { HotelApiService } from '@core/services/hotel/hotel-api.service';
import { STAY_DATES } from '@core/services/hotel/stay-dates';
import { MoneyPipe } from '@core/services/hotel/money.pipe';
import { AvailabilityResult, RoomType, StaySearch } from '@core/models/hotel/hotel.models';
import { StaySearchComponent } from '../../components/stay-search/stay-search.component';
import { PriceSummaryComponent } from '../../components/price-summary/price-summary.component';
import { HOTEL_ICON } from '../../components/hotel-icons';
import { hotelContent } from '../hotel-content';

type Quote = { kind: 'idle' } | { kind: 'loading' } | { kind: 'ok'; result: AvailabilityResult | null } | { kind: 'error'; message: string };

@Component({
  selector: 'app-room-detail-page',
  imports: [RouterLink, FontAwesomeModule, MoneyPipe, StaySearchComponent, PriceSummaryComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './room-detail.page.html',
  styleUrl: './room-detail.page.scss',
})
export class RoomDetailPage {
  private readonly API = inject(HotelApiService);
  private readonly ROUTE = inject(ActivatedRoute);
  private readonly ROUTER = inject(Router);
  public readonly C = hotelContent();
  public readonly iconFor = HOTEL_ICON;
  public readonly icons = { guests: faUserGroup, adult: faUser, child: faChild, bed: faBed, size: faMaximize };

  private readonly slug$ = this.ROUTE.paramMap.pipe(map(p => p.get('slug') ?? ''));

  public readonly room = toSignal(
    this.slug$.pipe(switchMap(slug => this.API.roomType(slug).pipe(
      map(r => r as RoomType | 'missing'),
      catchError(() => of('missing' as const)),
    ))),
    { initialValue: null },
  );

  private readonly params = toSignal(this.ROUTE.queryParams, { initialValue: {} as Record<string, unknown> });
  public readonly search = computed<StaySearch | null>(() =>
    STAY_DATES.hasSearch(this.params()) ? STAY_DATES.fromParams(this.params()) : null);

  public readonly quote = toSignal(
    combineLatest([this.slug$, this.ROUTE.queryParams]).pipe(
      switchMap(([slug, params]) => {
        if (!STAY_DATES.hasSearch(params)) return of<Quote>({ kind: 'idle' });
        return this.API.availability(STAY_DATES.fromParams(params)).pipe(
          map(res => ({ kind: 'ok', result: res.results.find(r => r.room_type.slug === slug) ?? null }) as Quote),
          catchError(e => of<Quote>({ kind: 'error', message: HotelApiService.toApiError(e).message })),
          startWith<Quote>({ kind: 'loading' }),
        );
      }),
    ),
    { initialValue: { kind: 'idle' } as Quote },
  );

  public readonly result = computed(() => { const Q = this.quote(); return Q.kind === 'ok' ? Q.result : null; });
  public readonly fits = computed(() => this.quote().kind !== 'ok' || this.result() !== null);
  public readonly bookable = computed(() => (this.result()?.available ?? 0) > 0);

  public readonly activeImage = signal(0);
  public readonly images = computed(() => {
    const R = this.room();
    const LIST = R && R !== 'missing' ? R.images ?? [] : [];
    return LIST.length ? LIST : [{ url: this.C.roomPlaceholder, alt: '' }];
  });

  public readonly bookParams = computed(() => {
    const R = this.room();
    return R && R !== 'missing' ? { room: R.slug, ...(this.search() ?? {}) } : {};
  });

  public onSearch(search: StaySearch): void {
    this.ROUTER.navigate([], { relativeTo: this.ROUTE, queryParams: search, replaceUrl: true });
  }

  public onImgError(event: Event): void {
    const IMG = event.target as HTMLImageElement;
    if (!IMG.src.endsWith(this.C.roomPlaceholder)) IMG.src = this.C.roomPlaceholder;
  }
}
