import { Component, inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import { LoginRequest } from "@core/models/auth/auth-response.model";
import { AuthService } from "@core/services/auth/auth.service";
import { FlexFormField } from "@shared/ui/flex-form/flex-form-item.interface";
import { AuthFormContent } from "@ui-building/auth-form/auth-form.interface";
import { AuthFormComponent } from "@ui-building/auth-form/auth-form.component";
import { LOGIN_CONTENT } from "./login-content/LOGIN_CONTENT";


@Component({
    selector: "app-login",
    imports: [
        AuthFormComponent
    ],
    templateUrl: "./login.page.html"
}) export class LoginPage {
    private readonly AUTH = inject(AuthService);
    private readonly ROUTER = inject(Router);

    public readonly _LOGIN_CONTENT: AuthFormContent = LOGIN_CONTENT;
    public readonly CREDENTIALS: LoginRequest = {
        email: '',
        password: '',
    };

    public readonly LOADING = signal<boolean>(false);
    public readonly ERROR = signal<string | null>(null);

    constructor() {
        const LOGIN_FIELDS_LIST: FlexFormField[] = this._LOGIN_CONTENT.formContent.fields;
        LOGIN_FIELDS_LIST[0].onValueChange = (value) => this.CREDENTIALS.email = value;
        LOGIN_FIELDS_LIST[1].onValueChange = (value) => this.CREDENTIALS.password = value;
    }

    public onSubmit(): void {
        this.LOADING.set(true);
        this.ERROR.set(null);

        this.AUTH.login(this.CREDENTIALS).subscribe({
            next: () => {
                this.LOADING.set(false);
                this.ROUTER.navigate(['/home']);
            },
            error: (err) => {
                this.LOADING.set(false);
                this.ERROR.set(err.error?.message ?? "Login failed. Please try again.");
            }
        });
    }
}