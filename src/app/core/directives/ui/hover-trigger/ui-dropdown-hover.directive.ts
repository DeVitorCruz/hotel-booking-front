import { Directive, HostListener, output, OutputEmitterRef } from '@angular/core';

@Directive({
  selector: '[appUiDropdownHover]'
})
export class UiDropdownHoverDirective {

  public enterOutput: OutputEmitterRef<void> = output<void>();
  public leaveOutput: OutputEmitterRef<void> = output<void>();

  @HostListener('mouseenter', ['$event']) public enterTrigger(event: Event): void {
    this.enterOutput.emit();
    console.log("The mouse has entered");

    event.stopPropagation();
  }

  @HostListener('mouseleave', ['$event']) public leaveTrigger(event: Event): void {
    this.leaveOutput.emit();
    console.log("The mouse has left");

    event.stopPropagation();
  }
}
