import {
    IconDefinition, faBath, faBed, faCheck, faCoffee, faDesktop, faLocationDot, faShieldHeart,
    faSnowflake, faTv, faUmbrellaBeach, faWater, faWifi, faWineGlass, faDoorOpen,
} from '@fortawesome/free-solid-svg-icons';

/** Amenity slug / content icon key → FontAwesome icon (fallback: check). */
const ICONS: Record<string, IconDefinition> = {
    'wifi': faWifi, 'free-wi-fi': faWifi,
    'ac_unit': faSnowflake, 'air-conditioning': faSnowflake,
    'breakfast': faCoffee, 'free_breakfast': faCoffee, 'breakfast-included': faCoffee,
    'bathtub': faBath, 'private-bathroom': faBath,
    'tv': faTv, 'smart-tv': faTv,
    'water': faWater, 'sea-view': faWater,
    'balcony': faDoorOpen,
    'local_bar': faWineGlass, 'mini-bar': faWineGlass,
    'desk': faDesktop, 'workspace': faDesktop,
    'location': faLocationDot, 'beach': faUmbrellaBeach,
    'shield': faShieldHeart, 'bed': faBed,
};

export const HOTEL_ICON = (key: string | null | undefined): IconDefinition => ICONS[key ?? ''] ?? faCheck;
