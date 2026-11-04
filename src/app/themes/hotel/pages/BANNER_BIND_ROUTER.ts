import { Routes } from "@angular/router";
import { BannerBindRoute } from "@pages/shared/banner-bind-route/banner-bind-route";
import { AboutPage } from "@themes/hotel/pages/about/about.page";
import { FaqPage } from "./faq/faq.page";
import { TeamPage } from "./team/team.page";
import { TeamSinglePage } from "./team-single/team-single.page";
import { BlogPage } from "./blog/blog.page";
import { BlogSinglePage } from "./blog-single/blog-single.page";
import { ContactPage } from "./contact/contact.page";
import { Error404Page } from "./error-404/error-404.page";
import { BANNER_HEADER } from "./banner-header/BANNER_HEADER";
import { RoomsPage } from "./rooms/rooms.page";
import { RoomDetailPage } from "./room-detail/room-detail.page";
import { BookPage } from "./book/book.page";
import { BookingPage } from "./booking/booking.page";


const MAKE_ROUTE = (breadcrumb: string, paramLabel?: string): Record<string, any> => ({
    headerBlock: BANNER_HEADER,
    breadcrumb: breadcrumb,
    ...(paramLabel && { paramLabel }),
});

export const BANNER_BIND_ROUTER: Routes = [
    {
        path: '',
        component: BannerBindRoute,
        children: [
            {
                path: 'about',
                component: AboutPage,
                data: MAKE_ROUTE('about'),
            },
            {
                path: 'rooms',
                component: RoomsPage,
                data: MAKE_ROUTE('rooms'),
                title: 'Rooms & availability',
            },
            {
                path: 'rooms/:slug',
                component: RoomDetailPage,
                data: MAKE_ROUTE('rooms', 'room'),
                title: 'Room details',
            },
            {
                path: 'book',
                component: BookPage,
                data: MAKE_ROUTE('book your stay'),
                title: 'Book your stay',
            },
            {
                path: 'booking/:reference',
                component: BookingPage,
                data: MAKE_ROUTE('your booking'),
                title: 'Your booking',
            },
            {
                path: 'faq',
                component: FaqPage,
                data: MAKE_ROUTE('faq'),
            },
            {
                path: 'team',
                component: TeamPage,
                data: MAKE_ROUTE('team'),
            },
            {
                path: 'team/:id',
                component: TeamSinglePage,
                data: MAKE_ROUTE('team', 'team member'),
            },
            {
                path: 'blog',
                component: BlogPage,
                data: MAKE_ROUTE('blog'),
            },
            {
                path: 'blog/:id',
                component: BlogSinglePage,
                data: MAKE_ROUTE('blog', 'post'),
            },
            {
                path: 'contact',
                component: ContactPage,
                data: MAKE_ROUTE('contact'),
            },
            {
                path: 'error-404',
                component: Error404Page,
                data: MAKE_ROUTE('404'),
            },
        ],
    },
];