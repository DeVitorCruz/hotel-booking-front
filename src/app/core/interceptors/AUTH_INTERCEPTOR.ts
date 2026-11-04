import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@core/services/auth/auth.service";
import { catchError, throwError } from "rxjs";

export const AUTH_INTERCEPTOR: HttpInterceptorFn = (req, next) => {
    const AUTH = inject(AuthService);
    const ROUTER = inject(Router);
    const TOKEN = AUTH.getToken();

    const HEADERS: Record<string, string> = { 'Accept': 'application/json' };

    // File uploads: let the browser set multipart/form-data with its boundary.
    if (!(req.body instanceof FormData)) {
        HEADERS['Content-Type'] = 'application/json';
    }

    if (TOKEN) {
        HEADERS['Authorization'] = `Bearer ${TOKEN}`;
    }

    return next(req.clone({ setHeaders: HEADERS })).pipe(
        catchError((err: unknown) => {
            // Expired / revoked token: forget it so the UI stops acting signed in.
            if (TOKEN && err instanceof HttpErrorResponse && err.status === 401) {
                AUTH.forgetSession();
                const URL = ROUTER.url;
                if (URL.startsWith('/admin') && !URL.startsWith('/admin/login')) {
                    ROUTER.navigate(['/admin/login'], { queryParams: { returnUrl: URL } });
                }
            }
            return throwError(() => err);
        })
    );
};
