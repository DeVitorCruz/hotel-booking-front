import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { HotelApiService } from '@core/services/hotel/hotel-api.service';
import { apiErrorMessage } from '../core/api-error';
import { resetStaffRefresh } from '../core/admin-guards';

@Component({
    selector: 'ad-login',
    imports: [ReactiveFormsModule],
    template: `
        <div class="ad-login">
            <div class="ad-login__card">
                <div class="ad-login__brand">
                    <div class="ad-brand__mark" aria-hidden="true">{{ hotelName().charAt(0) }}</div>
                    <h1>{{ hotelName() }}</h1>
                    <p class="ad-login__sub">Staff sign in</p>
                </div>

                @if (error()) { <div class="ad-alert ad-alert--error" role="alert" style="margin-bottom:14px">{{ error() }}</div> }

                <form class="ad-form" [formGroup]="form" (ngSubmit)="submit()" novalidate>
                    <div class="ad-field">
                        <label for="ad-email">Email</label>
                        <input id="ad-email" class="ad-input" type="email" formControlName="email" autocomplete="username" required />
                    </div>
                    <div class="ad-field">
                        <label for="ad-password">Password</label>
                        <input id="ad-password" class="ad-input" type="password" formControlName="password" autocomplete="current-password" required />
                    </div>
                    <button class="ad-btn ad-btn--primary ad-btn--block" type="submit" [disabled]="loading()" style="min-height:42px">
                        {{ loading() ? 'Signing in…' : 'Sign in' }}
                    </button>
                </form>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLoginPage implements OnInit {
    private readonly AUTH = inject(AuthService);
    private readonly ROUTER = inject(Router);
    private readonly ROUTE = inject(ActivatedRoute);
    private readonly HOTEL = inject(HotelApiService);

    protected readonly loading = signal(false);
    protected readonly error = signal<string | null>(null);
    protected readonly hotelName = signal('Back office');

    protected readonly form = inject(FormBuilder).nonNullable.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
    });

    public ngOnInit(): void {
        this.HOTEL.hotel().subscribe({ next: h => this.hotelName.set(h.name), error: () => {} });
        if (this.ROUTE.snapshot.queryParamMap.get('denied')) {
            this.error.set('This account has no back-office access.');
        }
    }

    protected submit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            this.error.set('Enter your email and password.');
            return;
        }
        this.loading.set(true);
        this.error.set(null);

        this.AUTH.login(this.form.getRawValue()).subscribe({
            next: res => {
                this.loading.set(false);
                const STAFF = (res.user.roles ?? []).some(r => AuthService.STAFF_ROLES.includes(r));
                if (!STAFF) {
                    this.AUTH.logout().subscribe({ error: () => {} });
                    this.error.set('This account has no back-office access.');
                    return;
                }
                resetStaffRefresh();
                const RETURN = this.ROUTE.snapshot.queryParamMap.get('returnUrl');
                this.ROUTER.navigateByUrl(RETURN?.startsWith('/admin') && !RETURN.startsWith('/admin/login') ? RETURN : '/admin');
            },
            error: err => {
                this.loading.set(false);
                this.error.set(apiErrorMessage(err, 'Sign in failed. Please try again.'));
            },
        });
    }
}
