import { Component, inject, OnInit, signal, Type, WritableSignal } from '@angular/core';
import { TextBoxComponent } from '@shared/ui/text-box/text-box.component';
import { Product, ProductReview, ProductVariant } from '@core/models/product/product.model';
import { TabItem, TabPanelContent } from '@ui-building/tab-panel/tab-panel.interface';
import { TextBox } from '@shared/ui/text-box/text-box-item.interface';
import { ReviewCardComponent } from '@ui-building/review-card/review-card.component';
import { ReviewCardItem, ReviewPanelContent } from '@ui-building/review-card/review-card.interface';
import { ProductService } from '@core/services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductSingleContent, ProductSingleImage, ProductSinglePrice } from '@ui-building/product-single/product-single.interface';
import { ContainerBlock } from '@shared/ui/container/container-block.interface';
import { MediaImg } from '@core/models/media/media-img.interface';
import { buildRelatedProductsTrack } from './RELATED_PRODUCTS_TRACK.factory';
import { ProductSingleOutletComponent } from '@ui-building/product-single-outlet/product-single-outlet.component';
import { ContainerComponent } from '@shared/ui/container/container.component';
import { SINGLE_PRODUCT_EXAMPLE } from './single-product-example/SINGLE_PRODUCT_EXAMPLE';
import { CARD_TRACK } from '../home/card-track/CARD_TRACK';


@Component({
  selector: 'app-shop-single',
  imports: [ ProductSingleOutletComponent, ContainerComponent ],
  templateUrl: './shop-single.page.html',
  styleUrl: './shop-single.page.scss'
})
export class ShopSinglePage implements OnInit {
  private readonly PRODUCT_SERVICE: ProductService = inject(ProductService);
  private readonly ROUTE: ActivatedRoute = inject(ActivatedRoute);
  private readonly ROUTER: Router = inject(Router);

  public readonly LOADING: WritableSignal<boolean> = signal<boolean>(false);
  public readonly DETAIL_CONTENT: WritableSignal<ProductSingleContent | null> = signal<ProductSingleContent | null>(null);
  public readonly RELATED_TRACK: WritableSignal<ContainerBlock | null> = signal<ContainerBlock | null>(null);

  constructor() {
    this.DETAIL_CONTENT.set(SINGLE_PRODUCT_EXAMPLE);
    this.RELATED_TRACK.set(CARD_TRACK);
  }

  public ngOnInit(): void {
    // const ID: number = Number(this.ROUTE.snapshot.paramMap.get('id'));
    // if (!ID) { this.ROUTER.navigate(['/error-404']); return; }
    // this.loadProduct(ID);
  }

  private loadProduct(id: number): void {
    this.LOADING.set(true);

    this.PRODUCT_SERVICE.getById(id).subscribe({
      next: (product) => {
        this.DETAIL_CONTENT.set(this._buildContent(product));
        this.PRODUCT_SERVICE.getAll().subscribe({
          next: (related) => {
            const ITEMS: Product[] = related.data
              .filter(p => p.id !== product.id)
              .slice(0, 5);

            if (ITEMS.length) {
              this.RELATED_TRACK.set(buildRelatedProductsTrack(ITEMS));
            }
            this.LOADING.set(false);
          },
          error: () => this.ROUTER.navigate(['/error-404']),
        });
      },
      error: () => this.ROUTER.navigate(['/error-404']),
    });
  }

  private _buildContent(product: Product): ProductSingleContent {
    const VARIANT: ProductVariant | undefined = product.variants?.[0];
    const REVIEWS: ProductReview[] = (product.reviews ?? [] as ProductReview[]).map(r => ({
      id: r.id as number,
      author: r.author as string,
      avatar: r.avatar as string,
      date: r.date as string,
      rating: r.rating as number, 
      comment: r.comment as string,
    } as ProductReview));

    return {
      images: {
        main: {
          src: product.image ?? 'assets/collection-info/1-earring-gold-large.jpg' as string,
          alt: product.name as string,
        } as MediaImg,
        thumbs: (product.images ?? []).map(src => ({
          src,
          alt: product.name,
        } as MediaImg)) as MediaImg[],
      } as ProductSingleImage,
      title: product.name as string,
      rating: product.rating ?? 0 as number,
      reviewCount: REVIEWS.length as number,
      price: {
        regular: VARIANT?.price ?? 0 as number,
        discount: VARIANT?.discount_price as number,
        currency: '$' as string,
      } as ProductSinglePrice,
      description: product.description ?? '' as string,
      category: product.category as string,
      tags: product.tags as string[],
      tabPanel: this._buildTabPanel(product, REVIEWS) as TabPanelContent,
    } as ProductSingleContent;
  }

  private _buildTabPanel(product: Product, reviews: any[]): TabPanelContent {
    return {
      tabs: [
        {
          id: 0 as number,
          label: 'Product Details' as string,
          component: TextBoxComponent as Type<any>,
          componentInput: {
            TEXT_BOX_LIST: [{
              id: 0 as number,
              text: [product.description ?? 'No description available.'] as string[],
            } as TextBox,] as TextBox[],
          } as Record<string, any>,
        } as TabItem,
        {
          id: 1 as number,
          label: 'Details & Specs' as string,
          component: TextBoxComponent as Type<any>,
          componentInput: {
            TEXT_BOX_LIST: [{
              id: 0 as number,
              text: [product.description ?? 'No description available.'] as string[],
            } as TextBox,] as TextBox[],
          } as Record<string, any>,
        } as TabItem,
        {
          id: 2 as number,
          label: 'Shipping & Return' as string,
          component: TextBoxComponent as Type<any>,
          componentInput: {
            TEXT_BOX_LIST: [{
              id: 0 as number,
              text: [product.description ?? 'Standard shipping 5-7 business days. Free returns within 30 days.'] as string[],
            } as TextBox,] as TextBox[],
          } as Record<string, any>,
        } as TabItem,
        {
          id: 3 as number,
          label: 'Reviews' as string,
          component: ReviewCardComponent as Type<any>,
          componentInput: {
            CONTENT: {
              reviews: reviews as ReviewCardItem[],
              productId: product.id as number,
            } as ReviewPanelContent,
          } as Record<string, any>,
        } as TabItem,
      ] as TabItem[],
    } as TabPanelContent;
  }

  public onAddToCard(quantity: number): void {
    // TODO: wire to CartService
    console.log('Add to cart - qty:', quantity);
  }
}
