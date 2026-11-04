import { NgComponentOutlet } from '@angular/common';
import { Component, computed, input, InputSignal, output, OutputEmitterRef, Signal, Type } from '@angular/core';
import { ProductSingleContent } from '@ui-building/product-single/product-single.interface';
import { PRODUCT_SINGLE_REGISTRY, ProductSingleTemplate } from '@ui-building/product-single/product-single.registry';

@Component({
  selector: 'app-product-single-outlet',
  imports: [NgComponentOutlet],
  templateUrl: './product-single-outlet.component.html',
})
export class ProductSingleOutletComponent {
  public readonly CONTENT: InputSignal<ProductSingleContent> = input.required<ProductSingleContent>();
  public readonly TEMPLATE: InputSignal<ProductSingleTemplate> = input<ProductSingleTemplate>('default');
  public readonly addToCart: OutputEmitterRef<number> = output<number>();

  public readonly RESOLVED_COMPONENT: Signal<Type<any>> = computed(() => PRODUCT_SINGLE_REGISTRY[this.TEMPLATE()] ?? PRODUCT_SINGLE_REGISTRY['default']);
}
