import { Component, computed, effect, input, output, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { DynamicAttributesDirective } from '../../../core/directives/attributes/dynamic-attributes.directive';
import { FlexInputItem } from '../../../core/models/share-info/flex-input-item.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-flex-input',
  imports: [
    MatInputModule,
    DynamicAttributesDirective,
    NgClass
  ],
  templateUrl: './flex-input.component.html'
})
export class FlexInputComponent {
  public readonly INPUT_ITEM = input.required<FlexInputItem>();
  public readonly INPUT = computed(() => this.INPUT_ITEM());
  public readonly flexInputValueChange = output<string>();
  
  public readonly INIT_VALUE = signal<string>('');
  public readonly VALUE = computed(() => this.INIT_VALUE());

  constructor() {
    effect(() => {
      this.INIT_VALUE.set(this.INPUT().value);
    });
  }

  public onValueChange(value: string): void {
    this.flexInputValueChange.emit(value);
  }
}
