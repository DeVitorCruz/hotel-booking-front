import type { ThemeConfig } from "../../core/themes-features/theme.config.interface";
import { FASHION_CLOTHES_CONTENT } from "./theme.content";
import { FASHION_CLOTHES_THEME_ROUTE } from "./theme.route";

export const FASHION_CLOTHES_THEME_CONFIG: ThemeConfig = {
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
    content: FASHION_CLOTHES_CONTENT,
    routes: FASHION_CLOTHES_THEME_ROUTE
};