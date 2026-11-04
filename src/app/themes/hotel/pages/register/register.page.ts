import { Component, inject, signal } from "@angular/core";
import { REGISTER_CONTENT } from "./register-content/REGISTER_CONTENT";
import { AuthFormContent } from "@ui-building/auth-form/auth-form.interface";
import { AuthFormComponent } from "@ui-building/auth-form/auth-form.component";
import { FlexFormField } from "@shared/ui/flex-form/flex-form-item.interface";
import { RegisterRequest } from "@core/models/auth/auth-response.model";
import { AuthService } from "@core/services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-register-page',
    standalone: true,
    imports: [
        AuthFormComponent
    ],
    templateUrl: './register.page.html'
}) export class RegisterPage {
    private readonly AUTH = inject(AuthService);
    private readonly ROUTER = inject(Router);

    public readonly _REGISTER_CONTENT: AuthFormContent = REGISTER_CONTENT; 
    public readonly CREDENTIALS: RegisterRequest = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    };

    public readonly LOADING = signal<boolean>(false);
    public readonly ERROR = signal<string | null>(null);

    constructor() {
        const FORM_FIELDS_LIST: FlexFormField[] = this._REGISTER_CONTENT.formContent.fields;
        
        FORM_FIELDS_LIST[0].onValueChange = (value: string) => this.CREDENTIALS.name = value;
        FORM_FIELDS_LIST[1].onValueChange = (value: string) => this.CREDENTIALS.email = value;
        FORM_FIELDS_LIST[2].onValueChange = (value: string) => this.CREDENTIALS.password = value;
        FORM_FIELDS_LIST[3].onValueChange = (value: string) => this.CREDENTIALS.password_confirmation = value;
    }

    public onSubmit(): void {
        this.LOADING.set(true);
        this.ERROR.set(null);

        this.AUTH.register(this.CREDENTIALS).subscribe({
            next: () => {       
                this.LOADING.set(false);
                this.ROUTER.navigate(['/home']);
            },
            error: (err) => {
                this.LOADING.set(false);
                this.ERROR.set(err.error?.message ?? 'Registration failed. Please try again.');
            }
        });
    }
}