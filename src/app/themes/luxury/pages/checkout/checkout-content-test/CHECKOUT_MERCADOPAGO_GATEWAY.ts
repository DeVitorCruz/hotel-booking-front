import { CheckoutGateway } from "@core/models/checkout/checkout-options.model";

export const CHECKOUT_MERCADOPAGO_GATEWAY: CheckoutGateway = {
    id: 'mercadopago',
    methods: ['pix' , 'boleto' , 'card'],
} as CheckoutGateway;