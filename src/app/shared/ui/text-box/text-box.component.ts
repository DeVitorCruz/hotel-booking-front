import { Component, computed, input } from '@angular/core';
import { TextBox } from './text-box-item.interface';
import { FlexHeadingComponent } from '../flex-heading/flex-heading.component';
import { ButtonFlex } from '../button/button.component';
import { AnchorFlex } from '../anchor-flex/anchor-flex.component';
import { FlexFormComponent } from '../flex-form/flex-form.component';
import { CustomList } from '../custom-list/custom-list.component';

@Component({
  selector: 'app-text-box',
  imports: [
    FlexHeadingComponent,
    ButtonFlex,
    AnchorFlex,
    FlexFormComponent,
    CustomList
  ],
  templateUrl: './text-box.component.html'
})
export class TextBoxComponent {
  public readonly TEXT_BOX_LIST = input<TextBox[]>([]);
  public readonly LIST = computed(() => { return this.TEXT_BOX_LIST(); });
} 
