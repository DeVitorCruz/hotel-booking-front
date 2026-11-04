import { NgClass, NgComponentOutlet } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { SequenceSpaceItem } from './sequence-space-item';

@Component({
  selector: 'app-sequence-space',
  imports: [
    NgClass, 
    NgComponentOutlet
  ],
  templateUrl: './sequence-space.component.html'
})
export class SequenceSpaceComponent {
  public readonly SEQUENCE_SPACE_LIST = input<SequenceSpaceItem[]>([]);
  public readonly LIST = computed(() => { return this.SEQUENCE_SPACE_LIST(); });
  
  public readonly COSTUME_CLASS_ELEMENT = input<string>('');
  public readonly CLASS_ELEMENT = computed(() => { return this.COSTUME_CLASS_ELEMENT(); });

  public readonly COSTUME_CLASS_BLOCK_NAME = input<string>('default');
  public readonly CLASS_NAME = computed(() => { return this.COSTUME_CLASS_BLOCK_NAME(); });

  public readonly COSTUME_CLASS_NAME_LIST = input<string[]>([]);
  public readonly CLASS_LIST = computed(() => { return this.COSTUME_CLASS_NAME_LIST(); });
}
