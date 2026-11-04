import { CheckoutGateway } from "@core/models/checkout/checkout-options.model";

export const CHECKOUT_PAGSEGURO_GATEWAY: CheckoutGateway = {
    id: 'pagseguro',
    methods: ['pix' , 'boleto' , 'card'],
} as CheckoutGateway;