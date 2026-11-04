import { computed, Directive, ElementRef, HostListener, input, output, Renderer2 } from '@angular/core';
import { FlexInputItem } from '../../models/share-info/flex-input-item.interface';

@Directive({
  selector: '[appDynamicAttributes]',
  host: {
    '(input)': 'onInput($event)',
  }
})
export class DynamicAttributesDirective {
  public readonly FLEX_INPUT_ITEM = input.required<FlexInputItem>();
  public readonly INPUT = computed(() => { return this.FLEX_INPUT_ITEM(); });
  public readonly valueChange = output<string>();

  constructor(
    private el: ElementRef<HTMLInputElement>, 
    private renderer: Renderer2
  ) {}

  public ngOnChanges(): void {
    const INPUT = this.el.nativeElement;
    const { value, placeholder, isDisabled, type, name, required } = this.INPUT();

    INPUT.disabled = isDisabled;
    INPUT.value = value;

    this.renderer.setAttribute(INPUT, 'placeholder', placeholder?? '');
    this.renderer.setAttribute(INPUT, 'type', type);

    if (name) this.renderer.setAttribute(INPUT, 'name', name);
    if (required) this.renderer.setAttribute(INPUT, 'required', '');
  }
 
  public onInput(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.valueChange.emit(VALUE);
  }
}
