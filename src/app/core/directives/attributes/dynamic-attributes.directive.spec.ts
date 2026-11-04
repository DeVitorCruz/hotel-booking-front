import { DynamicAttributesDirective } from './dynamic-attributes.directive';
import { ElementRef, inject, Renderer2 } from '@angular/core';

describe('DynamicAttributes', () => {
  it('should create an instance', () => {
    const RENDERER_2 = inject(Renderer2);
    const ELEMENT_REF = inject(ElementRef);
    const directive = new DynamicAttributesDirective(ELEMENT_REF, RENDERER_2);
    expect(directive).toBeTruthy();
  });
});
