import { Component, computed, effect, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { ProductService } from '@core/services/product/product.service';
import { Router } from '@angular/router';
import { CardGridContent } from '@ui-building/card-grid/card-grid.interface';
import { SHOP_CONTENT } from './shop-content/SHOP_CONTENT';
import { CardGridComponent } from '@ui-building/card-grid/card-grid.component';
import { CardItem } from '@ui-building/card-grid/card-grid.interface';
import { Product, ProductVariant } from '@core/models/product/product.model';
import { TextBox } from '@shared/ui/text-box/text-box-item.interface';
import { MediaImg } from '@core/models/media/media-img.interface';
import { FlexHeadingItem } from '@shared/ui/flex-heading/flex-heading-item';
import { IconSwitch } from '@shared/ui/icon-flex/icon-switch.type';
import { ButtonItem } from '@shared/ui/button/button-item.interface';
import { AnchorFlexItem } from '@shared/ui/anchor-flex/anchor-flex-item.interface';
import { DynamicEventConfig } from '@core/directives/dynamic-events/dynamic-event.config';
import { PaginationComponent } from '@ui-building/pagination/pagination.component';
import { PaginationContent } from '@ui-building/pagination/pagination.interface';

@Component({
  selector: 'app-shop',
  imports: [
    CardGridComponent,
    PaginationComponent,
  ],
  templateUrl: './shop.page.html',
  styleUrl: './shop.page.scss'
})
export class ShopPage implements OnInit {
  private readonly PRODUCT_SERVICE: ProductService = inject(ProductService);
  private readonly ROUTER: Router = inject(Router);

  public readonly INIT_LOADING: WritableSignal<boolean> = signal<boolean>(false);
  public readonly LOADING: Signal<boolean> = computed<boolean>(() => this.INIT_LOADING());
  public readonly SHOP_CONTENT: WritableSignal<CardGridContent | null> = signal<CardGridContent | null>(null);
  public readonly SHOP: Signal<CardGridContent | null> = computed<CardGridContent | null>(() => this.SHOP_CONTENT());
  public readonly SHOP_PAGINATION: WritableSignal<PaginationContent | null> = signal<PaginationContent | null>(null);
  public readonly PAGINATION: Signal<PaginationContent | null> = computed<PaginationContent | null>(() => this.SHOP_PAGINATION());

  constructor() {
    effect(() => {
      this.SHOP();
      this.LOADING();
    });
  }

  public ngOnInit(): void {
    this.SHOP_CONTENT.set(SHOP_CONTENT);
    
    this.SHOP_PAGINATION.set({
      currentPage: 1 as number,
      lastPage: 3 as number,
    } as PaginationContent);

    // this.loadProducts(1);
  }

  public onAddToCard(productId: number): void {
    console.log('Add to cart:', productId);
  }

  public loadProducts(page: number): void {
    this.INIT_LOADING.set(true);

    this.PRODUCT_SERVICE.getAll(page).subscribe({
      next: (response) => {
        this.SHOP_CONTENT.set({
          header: [] as TextBox[],
          cards: response.data.map(p => this._mapToCard(p)) as CardItem[],
          gridClassName: 'shop' as string,
          sectionClassName: 'shop-grid' as string,       
        });

        this.SHOP_PAGINATION.set({
          currentPage: response.current_page as number,
          lastPage: response.last_page as number,
        } as PaginationContent);
  
        this.INIT_LOADING.set(false);
      },
      error: () => this.ROUTER.navigate(['/error-404']),
    });
  }

  public onPageChange(page: number): void {
    
    this.SHOP_PAGINATION.set({
      currentPage: page as number,
      lastPage: 3 as number,
    } as PaginationContent);

    console.log('The event value is: ', page);
  }

  private _mapToCard(product: Product): CardItem {
    const VARIANT: ProductVariant | undefined = product.variants?.[0];
    const HAS_DISCOUNT: boolean = !!VARIANT?.discount_price;
  
    return {
      id: product.id as number,
      image: {
        src: product.image?? 'assets/collection-info/shop-product-1.jpg' as string,
        alt: product.name as string,
        placeholder: `product-${product.id}` as string,
      } as MediaImg,
      content: [
        {
          id: 0,
          heading: {
              id: 0,
              headingType: 'h3',
              achorFlexList: [
                  {
                    id: 0,
                    title: product.name as string,
                    description: `shop-product-${product.id}` as string,
                    ariaLabel: product.name as string,
                    rlink: `/shop/${product.id}` as string,
                    switchAbleIcon: { type: 'none' } as IconSwitch,
                  } as AnchorFlexItem,
              ] as AnchorFlexItem[],
          } as FlexHeadingItem,
          text: HAS_DISCOUNT ? [`old-price:$${VARIANT!.price.toFixed(2)}`, `$${VARIANT!.discount_price!.toFixed(2)}`] : VARIANT ? [`$${VARIANT.price.toFixed(2)}`] : [] as string[],
          buttonSection: [
              {
                id: 0,
                title: 'Add to cart' as string,
                type: 'button',
                customClassName: ['shop-add-to-cart'] as string[],
                iconType: { type: 'none'} as IconSwitch,
                buttonEventListenerList: [
                  {
                    nameEvent: 'click' as string,
                    eventMethod: () => this.onAddToCard(product.id),
                    actionType: '',
                  } as DynamicEventConfig,
                ] as DynamicEventConfig[],
              },
          ] as ButtonItem[],
          customBlockClassName: `shop-card-block-${product.id}` as string,
        } as TextBox,
      ] as TextBox[],
      customClassName: [`shop-card-${product.id}`] as string[],
      link: `/shop/${product.id}` as string,
    } as CardItem;
  }
}
