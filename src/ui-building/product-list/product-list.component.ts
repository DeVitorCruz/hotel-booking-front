import { NgClass } from '@angular/common';
import { Component, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { ImgFlex } from '@shared/ui/img-flex/img-flex.component';
import { ProdructListContent } from './product-list.interface';
import { ProductListItem } from './product-list.interface';

@Component({
  selector: 'app-product-list',
  imports: [ NgClass, ImgFlex ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  public readonly CONTENT: InputSignal<ProdructListContent> = input.required<ProdructListContent>();
  public readonly QUANTITIES: WritableSignal<Record<number, number>> = signal<Record<number, number>>({}); 

  public getQuantity(item: ProductListItem): number {
    return this.QUANTITIES()[item.id] ?? item.quantity ?? 1;
  }

  public onQuantityChange(item: ProductListItem, value: string): void {
    const PARSED: number = parseInt(value, 10);
    if (!isNaN(PARSED) && PARSED >= 1) {
      this.QUANTITIES.update(q => ({ ...q, [item.id]: PARSED }));
    }
  }

  public decrement(item: ProductListItem): void {
    const CURRENT: number = this.getQuantity(item);
    if (CURRENT > 1) {
      this.QUANTITIES.update(q => ({ ...q, [item.id]: CURRENT - 1 }));
    }
  }

  public increment(item: ProductListItem): void {
    const CURRENT: number = this.getQuantity(item);
    this.QUANTITIES.update(q => ({ ...q, [item.id]: CURRENT + 1 }));
  }

  public formatPrice(price: number, currency: string = '$'): string {
    return `${currency}${price.toFixed(2)}`;
  }
}
