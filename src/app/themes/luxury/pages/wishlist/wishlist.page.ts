import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { WishlistService } from '@core/services/wishlist/wishlist.service';
import { ProductListComponent } from '@ui-building/product-list/product-list.component';
import { ProdructListContent, ProductListAction, ProductListItem } from '@ui-building/product-list/product-list.interface';
import { Product, ProductVariant } from '@core/models/product/product.model';
import { MediaImg } from '@core/models/media/media-img.interface';
import { WISHLIST_EXAMPLE_LIST } from './wishlist-example-list/WISHLIST_EXAMPLE_LIST';


@Component({
  selector: 'app-wishlist',
  imports: [ ProductListComponent ],
  templateUrl: './wishlist.page.html',
  styleUrl: './wishlist.page.scss'
})
export class WishlistPage implements OnInit {
  private readonly WISHLIST_SERVICE: WishlistService = inject(WishlistService);
  private readonly ROUTER: Router = inject(Router);

  public readonly LOADING: WritableSignal<boolean> = signal<boolean>(false);
  public readonly LIST_CONTENT: WritableSignal<ProdructListContent | null> = signal<ProdructListContent | null>(null);

  public readonly PRODUCT_LIST_CONTENT: ProdructListContent = {
    ...WISHLIST_EXAMPLE_LIST,
    items: WISHLIST_EXAMPLE_LIST.items.map(item => ({
      ...item,
      actions: [
        {
          id: 0 as number,
          label: 'Add to Cart' as string,
          customClassName: ['product-list__add-cart-btn'] as string[],
          handler: (id: number) => { console.log("The product was added to the cart."); },
        } as ProductListAction,
        {
          id: 1 as number,
          label: 'Remove' as string,
          customClassName: ['product-list__remove-btn'] as string[],
          handler: (id: number) => { console.log("The product was removed from the cart."); },
        } as ProductListAction,
      ] as ProductListAction[],
    } as ProductListItem)) as ProductListItem[],
    headerAction: {
      ...WISHLIST_EXAMPLE_LIST.headerAction!,
      handler: () => { console.log("All the wishlist was removed."); },
    } as ProductListAction,
  } as ProdructListContent;

  public ngOnInit(): void {
    // this.getAllWishlist();
  }

  public getAllWishlist(): void {
    this.LOADING.set(true);

    this.WISHLIST_SERVICE.getAll().subscribe({
      next: (wishlist) => {
        this.LIST_CONTENT.set(this._buildContent(wishlist.products));
        this.LOADING.set(false);
      },
      error: () => this.ROUTER.navigate(['/error-404']),
    });
  }

  private _buildContent(products: Product[]): ProdructListContent {
    return {
      title: 'My Wishlist' as string,
      items: products.map(p => this._matpItem(p)) as ProductListItem[],
      emptyMessage: 'Your wishlist is empty.' as string,
      headerAction: {
        id: 0 as number,
        label: 'Clear All' as string,
        customClassName: ['product-list__clear-btn'] as string[],
        handler: (itemId: number) => this.onClearAll(),
      } as ProductListAction,
    } as ProdructListContent;
  }

  private _matpItem(product: Product): ProductListItem {
    const VARIANT: ProductVariant = product.variants?.[0]!;
    
    return {
      id: product.id as number,
      image: {
        src: product.image ?? 'assets/collection-info/shop-product-1.jpg' as string,
        alt: product.name as string,
        placeholder: product.name as string,
      } as MediaImg,
      name: product.name as string,
      price: VARIANT?.discount_price ?? VARIANT?.price ?? 0 as number,
      originalPrice: VARIANT?.discount_price ? VARIANT.price as number : undefined,
      currency: '$' as string, 
      actions: [
        {
          id: 0 as number,
          label: 'Add to Cart' as string,
          customClassName: ['product-list__add-cart-btn'] as string[],
          handler: (id: number) => this.onAddToCart(id),
        } as ProductListAction,
        {
          id: 1 as number,
          label: 'Remove' as string,
          customClassName: ['product-list__remove-btn'] as string[],
          handler: (id: number) => this.onRemove(id),
        } as ProductListAction,
      ] as ProductListAction[],
    } as ProductListItem;
  }

  public onAddToCart(productId: number): void {
    // TODO: wire to CartService
    console.log('Add to cart from wishtlist: ', productId);
  }

  public onRemove(productId: number): void {
    this.WISHLIST_SERVICE.remove(productId).subscribe({
      next: () => this.ngOnInit(),
      error: () => this.ROUTER.navigate(['/error-404']),
    });
  }

  public onClearAll(): void {
    this.WISHLIST_SERVICE.clear().subscribe({
      next: () => this.ngOnInit(),
      error: () => this.ROUTER.navigate(['/error-404']),
    });
  }
}
