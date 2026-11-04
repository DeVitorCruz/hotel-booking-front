import { Component, inject, input, InputSignal, OnInit, output, OutputEmitterRef, signal, WritableSignal, DestroyRef, Signal, computed } from '@angular/core';
import { FORM_STATE } from './FORM_STATE';
import { CheckoutFormState, CheckoutContent, CheckoutStep, CheckoutGatewayId, CheckoutMethod } from './checkout.interface';
import { DatePipe, NgClass, UpperCasePipe } from '@angular/common';
import { CheckoutService } from '@core/services/checkout/checkout.service';
import { CheckoutBoletoDetails, CheckoutCardDetails, CheckoutResponse } from '@core/models/checkout/checkout-response.model';
import { CheckoutGateway, CheckoutSavedAddress } from '@core/models/checkout/checkout-options.model';
import { CheckoutPixDetails } from '@core/models/checkout/checkout-response.model';
import { CheckoutRequest } from '@core/models/checkout/checkout-request.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval, switchMap, takeWhile } from 'rxjs';


@Component({
  selector: 'app-gateway-checkout',
  imports: [NgClass, UpperCasePipe, DatePipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  public readonly CONTENT: InputSignal<CheckoutContent> = input.required<CheckoutContent>();
  public readonly checkoutComplete: OutputEmitterRef<number> = output<number>();

  private readonly CHECKOUT_SERVICE: CheckoutService = inject(CheckoutService);
  private readonly DESTROY_REF: DestroyRef = inject(DestroyRef);

  // Step state
  public readonly STEP: WritableSignal<CheckoutStep> = signal<CheckoutStep>(1);
  public readonly LOADING: WritableSignal<boolean> = signal<boolean>(false);
  public readonly ERROR: WritableSignal<string | null> = signal<string | null>(null);

  // Payment result state
  public readonly CHECKOUT_RESULT: WritableSignal<CheckoutResponse | null> = signal<CheckoutResponse | null>(null);
  public readonly PAYMENT_STATUS: WritableSignal<string> = signal<string>('pending');
  public readonly COUNTDOWN: WritableSignal<number> = signal<number>(0);

  public readonly FORM: WritableSignal<CheckoutFormState> = signal<CheckoutFormState>(FORM_STATE);

  // Computed helpers
  public readonly AVAILABLE_METHODS: Signal<CheckoutMethod[]> = computed<CheckoutMethod[]>(() => {
    const GATEWAY: CheckoutGateway = this.CONTENT().gateways
      .find(g => g.id === this.FORM().gateway)!;
    return GATEWAY?.methods ?? [];
  });

  public readonly IS_PIX: Signal<boolean> = computed(() =>
    this.FORM().method === 'pix'
  );
 
  public readonly IS_BOLETO: Signal<boolean> = computed(() => 
    this.FORM().method === 'boleto'
  );

  public readonly IS_CARD: Signal<boolean> = computed(() =>
    this.FORM().method === 'card'
  );

  public readonly PIX_DETAILS: Signal<CheckoutPixDetails | null> = computed<CheckoutPixDetails | null>(() => {
    const RESULT: CheckoutResponse = this.CHECKOUT_RESULT()!;
    if (!RESULT || this.FORM().method !== 'pix') return null;
    return RESULT.payment_details as CheckoutPixDetails;
  });

  public readonly BOLETO_DETAILS: Signal<CheckoutBoletoDetails | null> = computed(() => {
    const RESULT: CheckoutResponse = this.CHECKOUT_RESULT()!;
    if (!RESULT || this.FORM().method !== 'boleto') return null;
    return RESULT.payment_details as CheckoutBoletoDetails;
  });

  public readonly CARD_DETAILS: Signal<CheckoutCardDetails | null> = computed<CheckoutCardDetails | null>(() => {
    const RESULT: CheckoutResponse = this.CHECKOUT_RESULT()!;
    if (!RESULT || this.FORM().method !== 'card') return null;
    return RESULT.payment_details as CheckoutCardDetails; 
  });

  public readonly FORMATTED_COUNTDOWN: Signal<string> = computed<string>(() => {
    const SECS: number = this.COUNTDOWN();
    const M: string = Math.floor(SECS/60).toString().padStart(2, '0');
    const S: string = (SECS % 60).toString().padStart(2, '0');
    return `${M}:${S}`;
  });

  public ngOnInit(): void {
    const SA: CheckoutSavedAddress = this.CONTENT().saved_address!;
    if (SA?.address_line1) {
      this.FORM().address_line1 = SA.address_line1 ?? '';
      this.FORM().address_line2 = SA.address_line2 ?? '';
      this.FORM().city = SA.city ?? '';
      this.FORM().state = SA.state ?? '';
      this.FORM().postal_code = SA.postal_code ?? '';
      this.FORM().country = SA.country ?? 'BR';
    }
    this.FORM().recipient_name = this.CONTENT().recipient_name ?? '';
    this.FORM().recipient_phone = this.CONTENT().recipient_phone ?? '';
  }

  // Step navigation
  public goToStep(step: CheckoutStep): void {
    this.STEP.set(step);
    this.ERROR.set(null);
  }

  // Form handlers
  public onFieldChange(field: keyof CheckoutFormState, value: string): void {
    (this.FORM() as any)[field] = value;
  }

  public setGateway(gateway: CheckoutGatewayId): void {
    this.FORM().gateway = gateway;
    const METHODS: ('pix' | 'boleto' | 'card')[] = this.CONTENT().gateways
      .find(g => g.id === gateway)?.methods ?? [];
    this.FORM().method = METHODS[0] as CheckoutMethod ?? 'pix';
  }

  public setMethod(method: CheckoutMethod): void {
    this.FORM().method = method;
  }

  // Submit
  public onSubmit(): void {
    this.LOADING.set(true);
    this.ERROR.set(null);

    this.CHECKOUT_SERVICE.submit({
      gateway: this.FORM().gateway,
      method: this.FORM().method,
      address_line1: this.FORM().address_line1 as string,
      address_line2: this.FORM().address_line2 as string || null,
      city: this.FORM().city as string,
      state: this.FORM().state as string,
      postal_code: this.FORM().postal_code as string,
      country: this.FORM().country as string,
      recipient_name: this.FORM().recipient_name as string,
      recipient_phone: this.FORM().recipient_phone as string || null,
      payer_name: this.FORM().payer_name as string || null,
      payer_email: this.FORM().payer_email as string || null,
      payer_cpf: this.FORM().payer_cpf as string || null,
      card_token: this.FORM().card_token as string || null,
      installments: this.FORM().installments,
      notes: this.FORM().notes as string || null,
    } as CheckoutRequest).subscribe({
      next: (response) => {
        this.CHECKOUT_RESULT.set(response);
        this.LOADING.set(false);
        this.STEP.set(3);
        this._handlePaymentResult(response);
      },
      error: (err) => {
        this.LOADING.set(false);
        this.ERROR.set(err.error?.message ?? 'Checkout failed. Please try again.');
      }
    });
  }

  // Payment result handlers
  private _handlePaymentResult(response: CheckoutResponse): void {
    if (this.FORM().method === 'pix') {
      this._startPixCountdown(response);
      this._startPolling(response.order.id, 5000);
    } else if (this.FORM().method === 'boleto') {
      this._startPolling(response.order.id, 30000);
    } else if (this.FORM().method === 'card') {
      const DETAILS: CheckoutCardDetails = response.payment_details as CheckoutCardDetails;
      window.location.href = DETAILS.redirect_url;
    }
  }

  private _startPixCountdown(response: CheckoutResponse): void {
    const DETAILS: CheckoutPixDetails = response.payment_details as CheckoutPixDetails;
    const EXPIRES: number = new Date(DETAILS.expires_at).getTime();
    const REMAINING: number = Math.floor((EXPIRES - Date.now())/1000);
    this.COUNTDOWN.set(REMAINING > 0 ? REMAINING : 1800);

    interval(1000)
      .pipe(takeUntilDestroyed(this.DESTROY_REF))
      .subscribe(() => {
        const CURRENT: number = this.COUNTDOWN();
        if (CURRENT > 0) this.COUNTDOWN.update(c => c - 1);
      });
  }

  private _startPolling(orderId: number, intervalMs: number): void {
    interval(intervalMs).pipe(
      switchMap(() => this.CHECKOUT_SERVICE.pollStatus(orderId)),
      takeWhile(res => res.payment.status === 'pending', true),
      takeUntilDestroyed(this.DESTROY_REF),
    ).subscribe(res => {
      this.PAYMENT_STATUS.set(res.payment.status);
      if (res.payment.status === 'paid') {
        this.checkoutComplete.emit(orderId);
      }
    });
  }

  // Copy to clipboard
  public copyPixCode(): void {
    const CODE: string = this.PIX_DETAILS()?.pix_code!;
    if (CODE) navigator.clipboard.writeText(CODE);
  }

  public openBoleto(): void {
    const URL: string = this.BOLETO_DETAILS()?.boleto_url!;
    if (URL) window.open(URL, '_blank');
  }
}
