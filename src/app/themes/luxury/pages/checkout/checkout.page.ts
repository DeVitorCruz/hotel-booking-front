import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CheckoutComponent } from '@ui-building/checkout/checkout.component';
import { CHECKOUT_CONTENT } from './checkout-content-test/CHECKOUT_CONTENT';
import { CheckoutContent } from '@ui-building/checkout/checkout.interface';
import { CheckoutService } from '@core/services/checkout/checkout.service';
import { Router } from '@angular/router';
import { CheckoutGateway, CheckoutSavedAddress } from '@core/models/checkout/checkout-options.model';

@Component({
  selector: 'app-checkout',
  imports: [CheckoutComponent],
  templateUrl: './checkout.page.html',
  styleUrl: './checkout.page.scss'
})
export class CheckoutPage implements OnInit {
  private readonly CHECKOUT_SERVICE: CheckoutService = inject(CheckoutService);
  private readonly ROUTER: Router = inject(Router);

  public readonly LOADING: WritableSignal<boolean> = signal<boolean>(false);
  public readonly CONTENT: WritableSignal<CheckoutContent | null> = signal<CheckoutContent | null>(null);
  public readonly CHECKOUT_CONTENT: CheckoutContent = CHECKOUT_CONTENT;

  public ngOnInit(): void {
    // this.getOptionsCheckout();
  }

  public getOptionsCheckout(): void {
    this.LOADING.set(true);

    this.CHECKOUT_SERVICE.getOptions().subscribe({
      next: (options) => {
        this.CONTENT.set({
          gateways: options.gateways as CheckoutGateway[],
          saved_address: options.saved_address as CheckoutSavedAddress | null,
          recipient_name: options.recipient_name as string,
          recipient_phone: options.recipient_phone as string,
        } as CheckoutContent);
        this.LOADING.set(false);
      },
      error: () => this.ROUTER.navigate(['/error-404']),
    });
  }

  public onCheckoutComplete(orderId: number): void {
    this.ROUTER.navigate(['/order']);
  }
}
