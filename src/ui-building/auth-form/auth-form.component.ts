import { Component, input, output } from "@angular/core";
import { AuthFormContent } from "./auth-form.interface";
import { FlexFormComponent } from "@shared/ui/flex-form/flex-form.component";
import { ContainerComponent } from "@shared/ui/container/container.component";
import { TextBoxComponent } from "@shared/ui/text-box/text-box.component";

@Component({
    selector: 'app-auth-form',
    standalone: true,
    imports: [
        FlexFormComponent, 
        ContainerComponent,
        TextBoxComponent
    ],
    templateUrl: './auth-form.component.html',
    styleUrl: './auth-form.component.scss'
}) export class AuthFormComponent {
    public readonly CONTENT = input.required<AuthFormContent>();
    public readonly authFormSubmit = output<void>();

    public handleSubmit(): void {
        this.authFormSubmit.emit();
    }
}
