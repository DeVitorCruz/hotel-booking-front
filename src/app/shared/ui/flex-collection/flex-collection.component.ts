import { Component, computed, input } from '@angular/core';
import { SequenceSpaceComponent } from '../sequence-space/sequence-space.component';
import { TextBoxComponent } from '../text-box/text-box.component';
import { FlexCollectionItem } from './flex-collection-item.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-flex-collection',
  imports: [
    SequenceSpaceComponent,
    TextBoxComponent,
    NgClass
  ],
  templateUrl: './flex-collection.component.html'
})
export class FlexCollectionComponent {
  public readonly FLEX_COLLECTION_ITEM = input.required<FlexCollectionItem>();
  public readonly COLLECTION = computed(() => { return this.FLEX_COLLECTION_ITEM(); });
}
