import { Component, input, InputSignal, output, OutputEmitterRef, signal, WritableSignal } from '@angular/core';
import { ContactContent } from './contact.interface';
import { FlexFormComponent } from '@shared/ui/flex-form/flex-form.component';
import { TextBoxComponent } from '@shared/ui/text-box/text-box.component';
import { IconFlexComponent } from '@shared/ui/icon-flex/icon-flex.component';

@Component({
  selector: 'app-ui-contact',
  imports: [ TextBoxComponent, FlexFormComponent, IconFlexComponent ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  public readonly CONTENT: InputSignal<ContactContent> = input.required<ContactContent>();
  public readonly contactSubmit: OutputEmitterRef<void> = output<void>();
  public readonly SUBMIT_SUCCESS: WritableSignal<boolean> = signal<boolean>(false);

  public handleSubmit(): void {
    this.contactSubmit.emit();
  }

  public showSuccess(): void {
    this.SUBMIT_SUCCESS.set(true);
  }
}
