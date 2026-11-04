import { CheckoutFormState } from "./checkout.interface";

export const FORM_STATE: CheckoutFormState = {
    // Step 1 - Shipping
    address_line1: '' as string,
    address_line2: '' as string,
    city: '' as string,
    state: '' as string,
    postal_code: '' as string,
    country: 'BR' as string,
    recipient_name: '' as string,
    recipient_phone: '' as string,

    // Step 2 - Payment
    gateway: 'mercadopago',
    method: 'pix',

    // Step 3 - Payer
    payer_name: '' as string,
    payer_email: '' as string,
    payer_cpf: '' as string,
    card_token: '' as string,
    installments: 1,
    notes: '' as string,
} as CheckoutFormState;