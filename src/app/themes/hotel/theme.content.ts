import type { ThemeContent } from "../../core/themes-features/theme.content.type";
import { HOTEL_PAGES } from "./pages/HOTEL_PAGES";
import type { HotelThemeContent } from "./pages/hotel-content";

/**
 * Per-client copy and imagery. Swap these values (and the files in
 * src/assets/hotel/) to rebrand the template for a new hotel.
 * Hotel name, contacts, times and prices come from the API (GET /hotel).
 */
export const HOTEL_CONTENT: ThemeContent & HotelThemeContent = {
    hero: {
        eyebrow: 'Boutique hotel by the sea',
        title: 'Slow mornings, ocean views',
        subtitle: 'A small hotel with a big welcome. Book direct for the best rate and free cancellation.',
        image: 'assets/hotel/hero.svg',
    },
    rooms: {
        eyebrow: 'Stay with us',
        title: 'Rooms & suites',
        subtitle: 'Every room has fresh linen, fast Wi-Fi and a view worth waking up for.',
    },
    highlights: [
        { icon: 'wifi', title: 'Free Wi-Fi', text: 'Fast connection in every room and common area.' },
        { icon: 'breakfast', title: 'Breakfast', text: 'Local, seasonal breakfast served every morning.' },
        { icon: 'location', title: 'Great location', text: 'Steps from the beach, close to restaurants and shops.' },
        { icon: 'shield', title: 'Book direct', text: 'Best rate guaranteed and free cancellation.' },
    ],
    about: {
        eyebrow: 'Our story',
        title: 'Run by a family, made for travellers',
        text: 'We opened our doors to share the place we love. Expect personal recommendations, quiet rooms and a team that remembers your name.',
        ctaLabel: 'About us',
        ctaLink: '/about',
        image: 'assets/hotel/about.svg',
    },
    testimonial: {
        quote: 'The kind of place you want to keep a secret. Spotless room, amazing breakfast and the staff made us feel at home from the first minute.',
        author: 'Mariana & Tom',
        role: 'Stayed in the Deluxe King',
    },
    cta: {
        title: 'Ready for your stay?',
        text: 'Check availability and book in less than two minutes.',
        label: 'Check availability',
    },
    roomPlaceholder: 'assets/hotel/room-placeholder.svg',
    pages: HOTEL_PAGES
};
