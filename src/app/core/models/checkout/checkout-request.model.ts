export interface CheckoutRequest {
    // Payment
    gateway: 'mercadopago' | 'pagseguro';
    method: 'pix' | 'boleto' | 'card';

    // Shipping address
    address_line1: string;
    address_line2?: string | null;
    city: string;
    state: string;
    postal_code: string;
    country: string;

    // Recipient
    recipient_name: string;
    recipient_phone?: string | null;

    // Payer
    payer_name?: string | null;
    payer_email?: string | null;
    payer_cpf?: string | null;

    // Card only
    card_token?: string | null;
    installments?: number;

    notes?: string | null;
}
