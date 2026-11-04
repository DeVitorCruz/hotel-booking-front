import { Component, computed, input } from '@angular/core';
import { SequenceSpaceComponent } from '../sequence-space/sequence-space.component';
import { ContainerBlock } from './container-block.interface';

@Component({
  selector: 'app-container',
  imports: [SequenceSpaceComponent],
  templateUrl: './container.component.html'
})
export class ContainerComponent {
  public readonly BLOCK_SEQUENCE_SPACE = input.required<ContainerBlock>();
  public readonly SPACE_BLOCK = computed(() => { return this.BLOCK_SEQUENCE_SPACE(); });
}
