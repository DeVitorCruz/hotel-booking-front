import { Component, computed, input, output, signal } from '@angular/core';
import { FlexFormComponent } from '@shared/ui/flex-form/flex-form.component';
import { FlexHeadingComponent } from '@shared/ui/flex-heading/flex-heading.component';
import { TextBoxComponent } from '@shared/ui/text-box/text-box.component';
import { FaqContactContent } from './faq-contact.interface';

@Component({
  selector: 'app-faq-contact',
  imports: [
    FlexFormComponent,
    FlexHeadingComponent,
    TextBoxComponent,
  ],
  templateUrl: './faq-contact.html',
  styleUrl: './faq-contact.scss'
})
export class FaqContactComponent {
  public readonly CONTENT = input.required<FaqContactContent>();
  public readonly contactSubmit = output<void>();

  public readonly SUBMIT_SUCCESS = signal<boolean>(false);
  public readonly SUBMITTED_SUCCESSFULLY = computed(() => this.SUBMIT_SUCCESS());

  public handleSubmit(): void {
    this.contactSubmit.emit();
  }

  public showSuccess(): void {
    this.SUBMIT_SUCCESS.set(true);
  }
}
