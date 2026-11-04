import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "@core/services/auth/auth.service";

export const AUTH_GUARD: CanActivateFn = () => {
    const AUTH = inject(AuthService);
    const ROUTER = inject(Router);
    
    if (AUTH._IS_AUTENTICATED_EFFECT()) {
        return true;
    }

    ROUTER.navigate(['/auth/login']);
    return false;
};