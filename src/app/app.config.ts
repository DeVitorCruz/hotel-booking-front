import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { THEME_CONFIG } from './core/tokens/theme.token';
import { HOTEL_THEME_CONFIG } from './themes/hotel/theme.config';
import { AUTH_INTERCEPTOR } from '@core/interceptors/AUTH_INTERCEPTOR';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top', anchorScrolling: 'enabled' })),
    provideClientHydration(withEventReplay()),
    { 
      provide: THEME_CONFIG, 
      useValue: HOTEL_THEME_CONFIG 
    },
    provideHttpClient(withFetch(), withInterceptors([AUTH_INTERCEPTOR])),
  ]
};
  