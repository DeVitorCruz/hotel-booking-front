import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Live data (rooms, prices, availability) - rendered per request
  { path: '', renderMode: RenderMode.Server },
  { path: 'home', renderMode: RenderMode.Server },
  { path: 'rooms', renderMode: RenderMode.Server },
  { path: 'rooms/:slug', renderMode: RenderMode.Server },
  { path: 'team/:id', renderMode: RenderMode.Server },
  { path: 'blog/:id', renderMode: RenderMode.Server },
  { path: 'team', renderMode: RenderMode.Server },
  { path: 'faq', renderMode: RenderMode.Server },
  { path: 'contact', renderMode: RenderMode.Server },

  // Checkout and guest pages: browser only (PayPal SDK, saved booking tokens, never cached)
  { path: 'book', renderMode: RenderMode.Client },
  { path: 'booking/:reference', renderMode: RenderMode.Client },
  { path: 'auth', renderMode: RenderMode.Client },
  { path: 'auth/login', renderMode: RenderMode.Client },
  { path: 'auth/register', renderMode: RenderMode.Client },

  // Remaining static pages - prerendered at build time
  { path: '**', renderMode: RenderMode.Prerender },
];
