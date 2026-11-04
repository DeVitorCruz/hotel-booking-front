import { ElementRef, inject, PLATFORM_ID } from '@angular/core';
import { SmartImageDirective } from './smart-image.directive';

describe('SmartImage', () => {
  it('should create an instance', () => {
    const CURRENT_PLATFORM_ID = inject(PLATFORM_ID);
    const EL = inject(ElementRef<HTMLImageElement>);
    const directive = new SmartImageDirective(EL, CURRENT_PLATFORM_ID);
    expect(directive).toBeTruthy();
  });
});
