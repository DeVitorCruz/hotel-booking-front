import { Routes } from "@angular/router";
import { BannerBindRoute } from "@pages/shared/banner-bind-route/banner-bind-route";
import { AboutPage } from "@themes/luxury/pages/about/about.page";
import { ShopPage } from "./shop/shop.page";
import { CheckoutPage } from "./checkout/checkout.page";
import { CartPage } from "./cart/cart.page";
import { WishlistPage } from "./wishlist/wishlist.page";
import { OrderPage } from "./order/order.page";
import { FaqPage } from "./faq/faq.page";
import { TeamPage } from "./team/team.page";
import { TeamSinglePage } from "./team-single/team-single.page";
import { BlogPage } from "./blog/blog.page";
import { BlogSinglePage } from "./blog-single/blog-single.page";
import { ContactPage } from "./contact/contact.page";
import { Error404Page } from "./error-404/error-404.page";
import { ShopSinglePage } from "./shop-single/shop-single.page";
import { BANNER_HEADER } from "./banner-header/BANNER_HEADER";


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
                path: 'shop',
                component: ShopPage,
                data:  MAKE_ROUTE('shop'),
            },
            {
                path: 'shop/:id',
                component: ShopSinglePage,
                data: MAKE_ROUTE('shop', 'product'),
            },
            {
                path: 'cart',
                component: CartPage,
                data: MAKE_ROUTE('cart'),
            },
            {
                path: 'checkout',
                component: CheckoutPage,
                data: MAKE_ROUTE('checkout'),
            },
            {
                path: 'whishlist',
                component: WishlistPage,
                data: MAKE_ROUTE('whishlist'),
            },
            {
                path: 'order',
                component: OrderPage,
                data: MAKE_ROUTE('order'),
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
                data: MAKE_ROUTE('shop', 'team member'),
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