import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '@core/models/cart/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService extends ApiService {
  constructor(http: HttpClient) { super(http); }

  public getAll(): Observable<Cart> {
    return this.get<Cart>('cart');
  }

  public add(productid: number, quantity: number = 1): Observable<{ message: string; }> {
    return this.post<{ message: string; }>('cart/items', { product_variant_id: productid, quantity });
  }

  public remove(itemId: number): Observable<{ message: string; }> {
    return this.delete<{ message: string; }>(`cart/items/${itemId}`);
  }

  public clear(): Observable<{ message: string; }> {
    return this.delete<{ message: string; }>('cart');
  }
}
