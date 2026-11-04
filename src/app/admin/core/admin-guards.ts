import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { catchError, map, of } from 'rxjs';

/** Signed-in staff only. Refreshes /me once per app load so permissions are current. */
let refreshed = false;

export const STAFF_GUARD: CanActivateFn = (_route, state) => {
    const AUTH = inject(AuthService);
    const ROUTER = inject(Router);

    if (!isPlatformBrowser(inject(PLATFORM_ID))) return false; // admin is browser-only
    const TO_LOGIN = ROUTER.createUrlTree(['/admin/login'], { queryParams: { returnUrl: state.url } });

    if (!AUTH._IS_AUTENTICATED_EFFECT()) return TO_LOGIN;

    const CHECK = () => AUTH._IS_STAFF_EFFECT() ? true : ROUTER.createUrlTree(['/admin/login'], { queryParams: { denied: 1 } });
    if (refreshed) return CHECK();

    return AUTH.refreshMe().pipe(
        map(() => { refreshed = true; return CHECK(); }),
        catchError(() => of(TO_LOGIN)),
    );
};

/** Route-level permission (route data: { permission: 'rooms.manage' }). */
export const PERMISSION_GUARD: CanActivateFn = (route) => {
    const AUTH = inject(AuthService);
    const NEED = route.data['permission'] as string | string[] | undefined;
    if (!NEED) return true;
    const LIST = Array.isArray(NEED) ? NEED : [NEED];
    return LIST.some(p => AUTH.can(p)) ? true : inject(Router).createUrlTree(['/admin']);
};

export function resetStaffRefresh(): void {
    refreshed = false;
}
