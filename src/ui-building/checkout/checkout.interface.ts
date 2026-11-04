import { CheckoutGateway, CheckoutSavedAddress } from "@core/models/checkout/checkout-options.model";

export type CheckoutStep = 1 | 2 | 3;
export type CheckoutGatewayId = 'mercadopago' | 'pagseguro';
export type CheckoutMethod = 'pix' | 'boleto' | 'card';

export interface CheckoutFormState {
    // Step 1 - Shipping
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    recipient_name: string;
    recipient_phone: string;

    // Step 2 - Payment
    gateway: CheckoutGatewayId;
    method: CheckoutMethod;

    // Step 3 - Payer
    payer_name: string;
    payer_email: string;
    payer_cpf: string;
    card_token: string;
    installments: number;
    notes: string;
};

export interface CheckoutContent {
    gateways: CheckoutGateway[];
    saved_address: CheckoutSavedAddress | null;
    recipient_name: string;
    recipient_phone: string;
}
