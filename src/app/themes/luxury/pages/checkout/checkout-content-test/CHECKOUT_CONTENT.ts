import { CheckoutGateway, CheckoutSavedAddress } from "@core/models/checkout/checkout-options.model";
import { CheckoutContent } from "@ui-building/checkout/checkout.interface";
import { CHECKOUT_MERCADOPAGO_GATEWAY } from "./CHECKOUT_MERCADOPAGO_GATEWAY";
import { CHECKOUT_PAGSEGURO_GATEWAY } from "./CHECKOUT_PAGSEGURO_GATEWAY";

export const CHECKOUT_CONTENT: CheckoutContent = {
    gateways: [
        CHECKOUT_MERCADOPAGO_GATEWAY,
        CHECKOUT_PAGSEGURO_GATEWAY,
    ] as CheckoutGateway[],
    saved_address: {
        address_line1: 'Rua Das Gaviotas' as string | null,
        address_line2: 'Rua Dos Sapos' as string | null,
        city: 'Caxias' as string | null,
        state: 'SC' as string | null,
        postal_code: '26.000-310' as string | null,
        country: 'BR' as string,
    } as CheckoutSavedAddress | null,
    recipient_name: 'User Name' as string,
    recipient_phone: '(21) 9 9999-9999' as string,
} as CheckoutContent;