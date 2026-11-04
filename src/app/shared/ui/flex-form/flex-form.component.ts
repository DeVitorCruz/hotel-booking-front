import { Component, computed, input, output } from '@angular/core';
import { ButtonFlex } from '../button/button.component';
import { FlexInputComponent } from '../flex-input/flex-input.component';
import { FlexFormItem } from './flex-form-item.interface';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-flex-form',
  imports: [
    FormsModule,
    ButtonFlex,
    FlexInputComponent,
    NgClass
  ],
  templateUrl: './flex-form.component.html'
})
export class FlexFormComponent {
  public readonly FLEX_FORM_ITEM = input.required<FlexFormItem>();
  public readonly FORM = computed(() => this.FLEX_FORM_ITEM());
  public readonly onSubmit = output<void>();
  public readonly formInputValueChange = output<string>();
 
  public handleSubmit(): void {
    this.onSubmit.emit();
  }

  public handleValueChange(field: any, value: string): void {
    this.formInputValueChange.emit(value);
    field.inputItem.value = value;

    if (field.onValueChange) {
      field.onValueChange(value);
    }
  }
}
