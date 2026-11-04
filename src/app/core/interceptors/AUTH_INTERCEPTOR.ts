import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "@core/services/auth/auth.service";

export const AUTH_INTERCEPTOR: HttpInterceptorFn = (req, next) => {
    const AUTH = inject(AuthService);
    const TOKEN = AUTH.getToken();

    console.log('[AUTH_INTERCEPTOR] token:', TOKEN);

    const HEADERS: Record<string, string> = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    if (TOKEN) {
        HEADERS['Authorization'] = `Bearer ${TOKEN}`;
    }
    
    const AUTH_REQ = req.clone({ setHeaders: HEADERS, });
    return next(AUTH_REQ);
};