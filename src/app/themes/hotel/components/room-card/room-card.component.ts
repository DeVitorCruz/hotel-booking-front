import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBed, faMaximize, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { Quote, RoomType, StaySearch } from '@core/models/hotel/hotel.models';
import { MoneyPipe } from '@core/services/hotel/money.pipe';
import { HOTEL_ICON } from '../hotel-icons';

@Component({
    selector: 'app-room-card',
    imports: [RouterLink, FontAwesomeModule, MoneyPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <article class="room-card hb-card" [class.room-card--soldout]="soldOut()">
        <a class="room-card__media" [routerLink]="['/rooms', room().slug]" [queryParams]="search()" tabindex="-1" aria-hidden="true">
            <img [src]="image()" [alt]="room().name" loading="lazy" (error)="onImgError($event)">
            @if (available() !== null && !soldOut() && available()! <= 2) {
                <span class="room-card__flag">Only {{ available() }} left</span>
            }
        </a>
        <div class="room-card__body">
            <h3 class="room-card__title"><a [routerLink]="['/rooms', room().slug]" [queryParams]="search()">{{ room().name }}</a></h3>
            <ul class="room-card__facts">
                <li><fa-icon [icon]="icons.guests" /> Up to {{ room().max_occupancy }}</li>
                @if (room().beds) { <li><fa-icon [icon]="icons.bed" /> {{ room().beds }}</li> }
                @if (room().size_sqm) { <li><fa-icon [icon]="icons.size" /> {{ room().size_sqm }} m²</li> }
            </ul>
            @if (room().short_description) { <p class="room-card__text">{{ room().short_description }}</p> }
            @if (topAmenities().length) {
                <ul class="room-card__amenities" aria-label="Amenities">
                    @for (a of topAmenities(); track a.slug) {
                        <li [title]="a.name"><fa-icon [icon]="iconFor(a.slug)" /><span class="hb-sr-only">{{ a.name }}</span></li>
                    }
                </ul>
            }
            <div class="room-card__footer">
                <div class="room-card__price">
                    @if (quote(); as q) {
                        <strong>{{ q.total | money: q.currency }}</strong>
                        <span>{{ q.nights }} night{{ q.nights > 1 ? 's' : '' }} · {{ q.average_nightly | money: q.currency }}/night</span>
                    } @else {
                        <span>From</span>
                        <strong>{{ room().base_price | money: room().currency : true }}</strong>
                        <span>per night</span>
                    }
                </div>
                @if (soldOut()) {
                    <span class="room-card__soldout">Not available</span>
                } @else {
                    <a class="hb-btn" [routerLink]="quote() ? ['/book'] : ['/rooms', room().slug]"
                       [queryParams]="quote() ? bookParams() : search()">
                        {{ quote() ? 'Book' : 'View' }}
                    </a>
                }
            </div>
        </div>
    </article>
    `,
    styles: [`
    :host { display: block; height: 100%; }
    .room-card { display: flex; flex-direction: column; height: 100%; overflow: hidden; transition: transform .2s, box-shadow .2s; }
    .room-card:hover { transform: translateY(-3px); }
    .room-card--soldout { opacity: .7; }
    .room-card__media { position: relative; display: block; aspect-ratio: 4 / 3; background: var(--hb-beige); overflow: hidden; }
    .room-card__media img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s; }
    .room-card:hover .room-card__media img { transform: scale(1.04); }
    .room-card__flag { position: absolute; top: 12px; left: 12px; background: var(--hb-gold); color: #fff; font: 600 11px/1 var(--hb-sans); letter-spacing: .08em; text-transform: uppercase; padding: 7px 10px; border-radius: 2px; }
    .room-card__body { display: flex; flex-direction: column; gap: 12px; padding: 20px; flex: 1; }
    .room-card__title { margin: 0; font: 700 20px/1.25 var(--hb-serif); }
    .room-card__title a { color: var(--hb-olive); text-decoration: none; }
    .room-card__title a:hover { color: var(--hb-gold-dark); }
    .room-card__facts { display: flex; flex-wrap: wrap; gap: 6px 16px; margin: 0; padding: 0; list-style: none; font-size: 13px; color: var(--hb-muted); }
    .room-card__facts fa-icon { color: var(--hb-gold); margin-right: 4px; }
    .room-card__text { margin: 0; font-size: 14px; line-height: 1.6; color: var(--hb-muted); }
    .room-card__amenities { display: flex; gap: 10px; margin: 0; padding: 0; list-style: none; color: var(--hb-olive); }
    .room-card__amenities li { display: grid; place-items: center; width: 32px; height: 32px; border-radius: 50%; background: var(--hb-cream); font-size: 13px; }
    .room-card__footer { margin-top: auto; padding-top: 16px; border-top: 1px solid var(--hb-line); display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    .room-card__price { display: flex; flex-direction: column; font-size: 12px; color: var(--hb-muted); }
    .room-card__price strong { font: 700 22px/1.2 var(--hb-sans); color: var(--hb-ink); }
    .room-card__soldout { font: 600 12px/1 var(--hb-sans); text-transform: uppercase; letter-spacing: .08em; color: var(--hb-danger); }
    `],
})
export class RoomCardComponent {
    public readonly room = input.required<RoomType>();
    public readonly quote = input<Quote | null>(null);
    public readonly available = input<number | null>(null);
    public readonly search = input<StaySearch | null>(null);
    public readonly placeholder = input('assets/hotel/room-placeholder.svg');

    public readonly icons = { guests: faUserGroup, bed: faBed, size: faMaximize };
    public readonly iconFor = HOTEL_ICON;

    public readonly soldOut = computed(() => this.available() !== null && this.available()! < 1);
    public readonly image = computed(() => this.room().images?.[0]?.url || this.placeholder());
    public readonly topAmenities = computed(() => (this.room().amenities ?? []).slice(0, 5));
    public readonly bookParams = computed(() => ({ room: this.room().slug, ...(this.search() ?? {}) }));

    public onImgError(event: Event): void {
        const IMG = event.target as HTMLImageElement;
        if (!IMG.src.endsWith(this.placeholder())) IMG.src = this.placeholder();
    }
}
