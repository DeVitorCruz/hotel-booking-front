export interface CheckoutGateway {
    id: 'mercadopago' | 'pagseguro';
    methods: ('pix' | 'boleto' | 'card')[];
};

export interface CheckoutSavedAddress {
    address_line1: string | null;
    address_line2: string | null;
    city: string | null;
    state: string | null;
    postal_code: string | null;
    country: string;
};

export interface CheckoutOptions {
    gateways: CheckoutGateway[];
    saved_address: CheckoutSavedAddress;
    recipient_name: string;
    recipient_phone: string | null;
}
