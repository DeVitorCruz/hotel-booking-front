import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { ProductListComponent } from '@ui-building/product-list/product-list.component';
import { CartService } from '@core/services/cart/cart.service';
import { ProdructListContent, ProductListAction, ProductListItem, ProductListSummary } from '@ui-building/product-list/product-list.interface';
import { CartItem } from '@core/models/cart/cart.model';
import { ProductVariant } from '@core/models/product/product.model';
import { MediaImg } from '@core/models/media/media-img.interface';
import { CART_EXAMPLE } from './cart-example/CART_EXAMPLE';

@Component({
  selector: 'app-cart',
  imports: [ ProductListComponent, RouterLink ],
  templateUrl: './cart.page.html',
  styleUrl: './cart.page.scss'
})
export class CartPage implements OnInit {
  private readonly CART_SERVICE: CartService = inject(CartService);
  private readonly ROUTER: Router = inject(Router);

  public readonly LOADING: WritableSignal<boolean> = signal<boolean>(false);
  public readonly LIST_CONTENT: WritableSignal<ProdructListContent | null> = signal<ProdructListContent | null>(null);
  public readonly TOTAL: WritableSignal<number> = signal<number>(0);

  public ngOnInit(): void {
    // this.setCartService();
    this.LIST_CONTENT.set(CART_EXAMPLE);
    this.TOTAL.set(2070.00);
  }

  public setCartService(): void {
    this.LOADING.set(true);

    this.CART_SERVICE.getAll().subscribe({
      next: (cart) => {
        const TOTAL: number = cart.items.reduce((sum, item) => {
          const PRICE: number = item.product?.variants?.[0].discount_price ?? item.product?.variants?.[0]?.price ?? 0;
          
          return sum + (PRICE*item.quantity);
        }, 0);

        this.TOTAL.set(TOTAL);
        this.LIST_CONTENT.set(this._buildContent(cart.items, TOTAL));
        this.LOADING.set(false);
      },
      error: () => this.ROUTER.navigate(['/error-404']),
    });
  }

  private _buildContent(items: CartItem[], total: number): ProdructListContent {
    return {
      title: 'Shopping Cart' as string,
      items: items.map(i => this._mapItem(i)) as ProductListItem[],
      summary: [
        {
          label: 'Subtotal' as string,
          value: `$${total.toFixed(2)}` as string,
        } as ProductListSummary,
        {
          label: 'Shipping' as string,
          value: 'Calculated at checkout' as string,
        } as ProductListSummary,
        {
          label: 'Total' as string,
          value: `$${total.toFixed(2)}` as string,
        } as ProductListSummary,
      ] as ProductListSummary[],
      emptyMessage: 'Your cart is empty.' as string,
      headerAction: {
        id: 0 as number,
        label: 'Clear Cart' as string,
        customClassName: ['product-list__clear-btn'] as string[],
        handler: () => this.onClearCart(),
      } as ProductListAction,
    } as ProdructListContent;
  }

  private _mapItem(item: CartItem): ProductListItem {
    const VARIANT: ProductVariant = item.product?.variants?.[0]!;
    
    return {
      id: item.id as number,
      image: {
        src: item.product?.image ?? 'assets/collection-info/shop-product-1.jpg' as string,
        alt: item.product?.name ?? '' as string,
        placeholder: item.product?.name ?? '' as string,
      } as MediaImg,
      name: item.product?.name ?? '' as string,
      price: VARIANT.discount_price ?? VARIANT?.price ?? 0 as number,
      originalPrice: VARIANT?.discount_price ? VARIANT.price as number : undefined,
      currency: '$' as string,
      quantity: item.quantity as number,
      actions: [
        {
          id: 0,
          label: 'Remove' as string,
          customClassName: ['product-list__remove-btn'] as string[],
          handler: (itemId: number) => this.onRemove(itemId),
        } as ProductListAction,
      ] as ProductListAction[],
    } as ProductListItem;
  }

  public onRemove(itemId: number): void {
    this.CART_SERVICE.remove(itemId).subscribe({
      next: () => this.ngOnInit(),
      error: () => this.ROUTER.navigate(['/error-404'])
    });
  }

  public onClearCart(): void {
    this.CART_SERVICE.clear().subscribe({
      next: () => this.ngOnInit(),
      error: () => this.ROUTER.navigate(['/error-404']),
    });
  }
}
