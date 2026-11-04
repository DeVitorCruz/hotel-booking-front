import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '@core/services/order/order.service';
import { ProdructListContent, ProductListAction, ProductListItem } from '@ui-building/product-list/product-list.interface';
import { Order } from '@core/models/order/order.model';
import { OrderItem } from '@core/models/order/order.model';
import { MediaImg } from '@core/models/media/media-img.interface';
import { ProductListComponent } from '@ui-building/product-list/product-list.component';
import { ORDER_EXAMPLE } from './order-example/ORDER_EXAMPLE';

@Component({
  selector: 'app-order',
  imports: [ ProductListComponent ],
  templateUrl: './order.page.html',
  styleUrl: './order.page.scss'
})
export class OrderPage implements OnInit {
  private readonly ORDER_SERVICE: OrderService = inject(OrderService);
  private readonly ROUTER: Router = inject(Router);

  public readonly LOADING: WritableSignal<boolean> = signal<boolean>(false);
  public readonly LIST_CONTENT: WritableSignal<ProdructListContent | null> = signal<ProdructListContent | null>(null);

  public ngOnInit(): void {
    // this.setOrderService();
    this.LIST_CONTENT.set(ORDER_EXAMPLE);
  }

  public setOrderService(): void {
    this.LOADING.set(true);

    this.ORDER_SERVICE.getAll().subscribe({
      next: (response) => {
        this.LIST_CONTENT.set(this._buildContent(response.data));
        this.LOADING.set(false);
      },
      error: () => this.ROUTER.navigate(['/error-404']),
    });
  }

  private _buildContent(orders: Order[]): ProdructListContent {
    const ALL_ITEMS: ProductListItem[] = orders.flatMap(order => order.items.map(item => this._mapItem(item, order)));

    return {
      title: 'My Orders' as string,
      items: ALL_ITEMS as ProductListItem[],
      emptyMessage: 'You have no orders yet.' as string,
    } as ProdructListContent;
  }

  private _mapItem(item: OrderItem, order: Order): ProductListItem {
    return {
      id: item.id as number,
      image: {
        src: item.product?.image ?? 'assets/collection-info/shop-product-1.jpg' as string,
        alt: item.product?.name ?? 'shop-product-1' as string,
        placeholder: item.product?.name ?? 'shop-product-1' as string,
      } as MediaImg,
      name: item.product?.name ?? '' as string,
      price: item.price as number,
      currency: '$' as string,
      meta: `Order #${order.id} - ${order.status}` as string,
      actions: [] as ProductListAction[],
    } as ProductListItem;
  }
}
