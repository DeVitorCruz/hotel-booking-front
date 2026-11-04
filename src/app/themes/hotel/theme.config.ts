import type { ThemeConfig } from "../../core/themes-features/theme.config.interface";
import { HOTEL_CONTENT } from "./theme.content";
import { HOTEL_THEME_ROUTE } from "./theme.route";

export const HOTEL_THEME_CONFIG: ThemeConfig = {
    id: 'hotel-boutique',
    name: 'Hotel - Boutique',
    category: 'hotel',
    variant: 'boutique',
    styles: {
        '--primary-color': '#D4AF37',
        '--bg-color': '#fffaf0',
        '--text-color': '#222'
    },
    rootClassName: 'hotel-boutique',
    content: HOTEL_CONTENT,
    routes: HOTEL_THEME_ROUTE
};