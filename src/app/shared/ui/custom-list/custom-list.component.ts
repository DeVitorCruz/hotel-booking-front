import { CommonModule, NgClass } from '@angular/common';
import { Component, computed, effect, inject, input, OnInit, signal } from '@angular/core';
import { Extandable } from './expandable.type';
import { AnchorFlex } from '../anchor-flex/anchor-flex.component';
import { ButtonFlex } from '../button/button.component';
import { TAILWIND_DEFAULT_LIST } from './TAILWIND_DEFAULT_LIST';
import { TAILWIND_DEFAULT_BUTTON } from './TAILWIND_DEFAULT_BUTTON';
import { UiService } from '../../../core/services/ui/ui-service';
import { AccordionStateService } from '../../../core/services/accordion-state/accordion-state.service';


@Component({
  selector: 'app-custom-list',
  imports: [
    CommonModule, 
    CustomList,
    AnchorFlex,
    ButtonFlex,
    NgClass
  ],
  templateUrl: './custom-list.component.html'
})
export class CustomList implements OnInit {
  public readonly UI_SERVICE = inject(UiService);
  
  public readonly ITEMS_LIST = input.required<Extandable[]>();
  public readonly EXTRACTED_ITEMS_LIST = computed(() => { return this.ITEMS_LIST(); });

  public readonly SUB_ITEM_CODE = input<string>('');
  public readonly ITEM_CODE = computed(() => { return this.SUB_ITEM_CODE(); });

  public readonly LIST_BLOCK = input<string[]>([]);
  public readonly EXTRACTED_LIST_BLOCK = computed(() => { return this.LIST_BLOCK(); });
 
  public readonly TAILWIND_DEFAULT_LIST: string[] = TAILWIND_DEFAULT_LIST;
  public readonly TAILWIND_DEFAULT_BUTTON: string [] = TAILWIND_DEFAULT_BUTTON;

  public readonly CUSTOM_CLASS_LIST = signal<string[]>([]);
  public readonly EXTRACTED_CLASS_LIST = computed(() => { return this.CUSTOM_CLASS_LIST(); });
  
  public readonly ACCORDION_STATE_SERVICE = inject(AccordionStateService);

  public readonly IS_EXPANDED = signal<boolean>(false);
  public readonly EXPANDED_STATE = computed(() => {  return this.IS_EXPANDED(); });

  constructor() {
    effect(() => {
      this.ACCORDION_STATE_SERVICE.searchAndReveal(this.EXTRACTED_ITEMS_LIST());
      this.IS_EXPANDED.update(this.ACCORDION_STATE_SERVICE.getSignal(this.ITEM_CODE()));
    });
  }

  public ngOnInit(): void {
    this.setCustomClassList();
  }

  public mergedList(defaultList: any, inputList: any): any[] {
    return this.UI_SERVICE.mergedList(defaultList, inputList);
  }

  public setCustomClassList(): void {
    this.CUSTOM_CLASS_LIST.set(this.mergedList(this.TAILWIND_DEFAULT_LIST, this.EXTRACTED_LIST_BLOCK()));
  }
}
