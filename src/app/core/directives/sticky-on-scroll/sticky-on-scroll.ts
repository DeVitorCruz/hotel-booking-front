import { Directive, ElementRef, HostListener, Inject, Renderer2 } from '@angular/core';
import { SCROLL_BAR_CLASS } from './SCROLL_BAR_CLASS';

@Directive({
  selector: '[appStickyOnScroll]'
})
export class StickyOnScroll {

  public readonly SCROLL_BAR_CLASS = SCROLL_BAR_CLASS;
  
  constructor(public el: ElementRef, public renderer: Renderer2) {}

  @HostListener('window:scroll') public onScroll(): void {
    if(window.scrollY > 0) {
      this.turnOnClass(this.SCROLL_BAR_CLASS);
    } else {
      this.turnOffClass(this.SCROLL_BAR_CLASS);
    }
  }

  public turnOnClass(classLabel: string): void {
    this.renderer.addClass(this.el.nativeElement, classLabel);
  }

  public turnOffClass(classLabel: string): void {
    this.renderer.removeClass(this.el.nativeElement, classLabel);
  }
}
