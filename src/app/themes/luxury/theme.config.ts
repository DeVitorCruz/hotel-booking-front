import type { ThemeConfig } from "../../core/themes-features/theme.config.interface";
import { JEWELRY_LUXURY_CONTENT } from "./theme.content";
import { JEWELRY_LUXURY_THEME_ROUTE } from "./theme.route";

export const JEWELRY_LUXURY_THEME_CONFIG: ThemeConfig = {
    id: 'ecommerce-blog-jewelry-luxury',
    name: 'Jewelry - Luxury',
    category: 'ecommerce',
    variant: 'luxury',
    styles: {
        '--primary-color': '#D4AF37',
        '--bg-color': '#fffaf0',
        '--text-color': '#222'
    },
    rootClassName: 'ecommerce-blog-jewelry-luxury',
    content: JEWELRY_LUXURY_CONTENT,
    routes: JEWELRY_LUXURY_THEME_ROUTE
};