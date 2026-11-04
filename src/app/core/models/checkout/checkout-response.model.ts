export interface CheckoutOrder {
    id: number;
    status: 'pending' | 'paid' | 'cancelled' | 'refunded';
    total_amount: number;
    shipping_address: Record<string, string>;
    recipient_name: string;
    recipient_phone: string;
};

export interface CheckoutPayment {
    id: number;
    gateway: string;
    method: string;
    status: 'pending' | 'paid' | 'failed' | 'refunded';
    amount: number;
    expires_at: string | null;
    paid_at: string | null;
};

export interface CheckoutPixDetails {
    pix_code: string;
    pix_qr_base64: string;
    expires_at: string;
};

export interface CheckoutBoletoDetails {
    boleto_url: string;
    barcode: string;
    expires_at: string;
};

export interface CheckoutCardDetails {
    redirect_url: string;
};

export type CheckoutPaymentDetails = 
    | CheckoutPixDetails 
    | CheckoutBoletoDetails 
    | CheckoutCardDetails;

export interface CheckoutResponse {
    message: string;
    order: CheckoutOrder;
    payment: CheckoutPayment;
    payment_details: CheckoutPaymentDetails;
};

export interface CheckoutStatusResponse {
    order: { id: number; status: string; };
    payment: { id: number; status: string; paid_at: string | null; };
};