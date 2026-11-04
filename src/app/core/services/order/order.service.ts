import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient } from '@angular/common/http';
import { PaginatedResponse } from '@core/models/shared/paginated-response.interface';
import { Order } from '@core/models/order/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends ApiService {
  constructor(http: HttpClient) { super(http); }

  public getAll(): Observable<PaginatedResponse<Order>> {
    return this.get<PaginatedResponse<Order>>('orders');
  }

  public getById(id: number): Observable<Order> {
    return this.get<Order>(`orders/${id}`);
  }

  public create(): Observable<Order> {
    return this.post<Order>('orders', {});
  }
}
