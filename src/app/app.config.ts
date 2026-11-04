import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { THEME_CONFIG } from './core/tokens/theme.token';
import { JEWELRY_LUXURY_THEME_CONFIG } from './themes/luxury/theme.config';
import { AUTH_INTERCEPTOR } from '@core/interceptors/AUTH_INTERCEPTOR';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    { 
      provide: THEME_CONFIG, 
      useValue: JEWELRY_LUXURY_THEME_CONFIG 
    },
    provideHttpClient(withInterceptors([AUTH_INTERCEPTOR])),
  ]
};
  