import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { catchError, map, of } from 'rxjs';
import { hotelContent } from '../hotel-content';
import { HotelApiService } from '@core/services/hotel/hotel-api.service';
import { RoomType } from '@core/models/hotel/hotel.models';
import { StaySearchComponent } from '../../components/stay-search/stay-search.component';
import { RoomCardComponent } from '../../components/room-card/room-card.component';
import { HOTEL_ICON } from '../../components/hotel-icons';

@Component({
  selector: 'app-new-home',
  imports: [RouterLink, FontAwesomeModule, StaySearchComponent, RoomCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class Home {
  private readonly API = inject(HotelApiService);
  public readonly C = hotelContent();
  public readonly iconFor = HOTEL_ICON;
  public readonly quoteIcon = faQuoteLeft;

  /** null = loading, [] = none / error */
  public readonly rooms = toSignal(
    this.API.roomTypes().pipe(map(r => r.slice(0, 3)), catchError(() => of([] as RoomType[]))),
    { initialValue: null },
  );
  public readonly hotel = toSignal(this.API.hotel().pipe(catchError(() => of(null))), { initialValue: null });
}
