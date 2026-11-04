import { inject } from '@angular/core';
import { ThemeService } from '@core/services/theme.service';

/** Copy and imagery a client customizes in theme.content.ts. */
export interface HotelThemeContent {
    hero: { eyebrow: string; title: string; subtitle: string; image: string };
    rooms: { eyebrow: string; title: string; subtitle: string };
    highlights: { icon: string; title: string; text: string }[];
    about: { eyebrow: string; title: string; text: string; ctaLabel: string; ctaLink: string; image: string };
    testimonial: { quote: string; author: string; role: string };
    cta: { title: string; text: string; label: string };
    roomPlaceholder: string;
}

/** Theme copy/imagery for hotel pages (call in an injection context). */
export const hotelContent = (): HotelThemeContent =>
    (inject(ThemeService).getTheme()?.content ?? {}) as unknown as HotelThemeContent;
