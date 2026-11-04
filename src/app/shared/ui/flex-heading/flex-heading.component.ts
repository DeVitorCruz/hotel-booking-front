import { CommonModule } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { FlexHeadingItem } from './flex-heading-item';
import { AnchorFlex } from '../anchor-flex/anchor-flex.component';
import { AnchorFlexItem } from '../anchor-flex/anchor-flex-item.interface';

@Component({
  selector: 'app-flex-heading',
  imports: [
    CommonModule,
    AnchorFlex
  ],
  templateUrl: './flex-heading.component.html'
})
export class FlexHeadingComponent {
  public readonly FLEX_HEADING = input.required<FlexHeadingItem>();
  public readonly HEADING = computed(() => { return this.FLEX_HEADING(); });

  public anchorFlexItem!: AnchorFlexItem;
}
