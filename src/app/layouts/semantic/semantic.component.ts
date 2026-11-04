import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { SemanticFeatures } from './semantic-features.interface';

@Component({
  selector: 'app-semantic',
  imports: [CommonModule],
  templateUrl: './semantic.component.html'
})
export class Semantic {
  public readonly SEMANTIC_FEATURES = input.required<SemanticFeatures>(); 
  public readonly SEMANTIC = computed(() => { return this.SEMANTIC_FEATURES(); }); 
}
