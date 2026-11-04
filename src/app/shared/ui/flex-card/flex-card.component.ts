import { CommonModule, NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { TextBoxComponent } from '../text-box/text-box.component';
import { ImgFlex } from '../img-flex/img-flex.component';
import { FlexCardItem } from './flex-card-item';

@Component({
  selector: 'app-flex-card',
  imports: [
    CommonModule,
    TextBoxComponent,
    ImgFlex,
    NgClass
  ],
  templateUrl: './flex-card.component.html'
})
export class FlexCardComponent {
  public readonly FLEX_CARD_ITEM = input.required<FlexCardItem>();
  public readonly CARD = computed(() => { return this.FLEX_CARD_ITEM(); });
}
