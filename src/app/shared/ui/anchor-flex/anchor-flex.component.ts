import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnchorFlexItem } from './anchor-flex-item.interface';
import { IconFlexComponent } from '../icon-flex/icon-flex.component';
import { ImgFlex } from '../img-flex/img-flex.component';


@Component({
  selector: 'app-anchor-flex',
  imports: [
    RouterLink,
    IconFlexComponent,
    ImgFlex
  ],
  templateUrl: './anchor-flex.component.html'
})
export class AnchorFlex {
  public readonly ANCHOR_FLEX_ITEM = input.required<AnchorFlexItem>();
}
