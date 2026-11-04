import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Dynamic routes - rendered on demand by the server
  {
    path: 'shop/:id',
    renderMode: RenderMode.Server  
  },
  {
    path: 'team/:id',
    renderMode: RenderMode.Server
  },
  {	
	  path: 'blog/:id',
	  renderMode: RenderMode.Server
  },
  
  // Static-shell pages that fetch live data - render per-request, not at buid time
  {
    path: 'shop',
    renderMode: RenderMode.Server,
  },
  {
    path: 'team',
    renderMode: RenderMode.Server,
  },
  {
    path: 'faq',
    renderMode: RenderMode.Server,
  },
  {
    path: 'contact',
    renderMode: RenderMode.Server,
  },
  {
    path: 'auth',
    renderMode: RenderMode.Server,
  },
  {
    path: 'auth/login',
    renderMode: RenderMode.Server,
  },
  {
    path: 'auth/register',
    renderMode: RenderMode.Server,
  },
  {
    path: 'cart',
    renderMode: RenderMode.Server,
  },
  {
    path: 'whishlist',
    renderMode: RenderMode.Server,
  },
  {
    path: 'order',
    renderMode: RenderMode.Server,
  },
  {
    path: 'checkout',
    renderMode: RenderMode.Server,
  },

  // All remaining static routes - prerendered at build time
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'home',
    renderMode: RenderMode.Prerender,
  },
];
  