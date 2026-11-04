import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CheckoutOptions } from '@core/models/checkout/checkout-options.model';
import { CheckoutRequest } from '@core/models/checkout/checkout-request.model';
import { CheckoutResponse, CheckoutStatusResponse } from '@core/models/checkout/checkout-response.model';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService extends ApiService {
  constructor(http: HttpClient) { super(http); }

  public getOptions(): Observable<CheckoutOptions> {
    return this.get<CheckoutOptions>('checkout/options');
  }

  public submit(data: CheckoutRequest): Observable<CheckoutResponse> {
    return this.post<CheckoutResponse>('checkout', data);
  }

  public pollStatus(orderId: number): Observable<CheckoutStatusResponse> {
    return this.get<CheckoutStatusResponse>(`checkout/${orderId}`);
  }
}
