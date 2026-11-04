import { Directive, HostListener, output, OutputEmitterRef } from '@angular/core';

@Directive({
  selector: '[appUiDropdown]'
})
export class UiDropdownDirective {
  public dropdownTrigger: OutputEmitterRef<void> = output<void>();

  @HostListener('click') public toggleState(): void {
    this.dropdownTrigger.emit();
  }
}
