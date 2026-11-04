import { Component, computed, input } from '@angular/core';
import { OptionListItem } from './option-list-item.interface';
import { FlexHeadingComponent } from '../flex-heading/flex-heading.component';
import { CustomList } from '../custom-list/custom-list.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-option-list',
  imports: [
    FlexHeadingComponent,
    CustomList,
    NgClass
  ],
  templateUrl: './option-list.component.html'
})
export class OptionListComponent {
  public readonly OPTION_LIST = input.required<OptionListItem>();
  public readonly LIST = computed(() => { return this.OPTION_LIST(); });
}
