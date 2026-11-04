import { ProdructListContent, ProductListAction, ProductListItem, ProductListSummary } from "@ui-building/product-list/product-list.interface";
import { PRODUCT_1 } from "./PRODUCT_1";
import { PRODUCT_2 } from "./PRODUCT_2";
import { PRODUCT_3 } from "./PRODUCT_3";
import { PRODUCT_4 } from "./PRODUCT_4";
import { PRODUCT_5 } from "./PRODUCT_5";
import { PRODUCT_6 } from "./PRODUCT_6";

export const CART_EXAMPLE: ProdructListContent = {
    title: 'Shopping Cart' as string,
    items: [
        PRODUCT_1 as ProductListItem,
        PRODUCT_2 as ProductListItem,
        PRODUCT_3 as ProductListItem,
        PRODUCT_4 as ProductListItem,
        PRODUCT_5 as ProductListItem,
        PRODUCT_6 as ProductListItem,
    ] as ProductListItem[],
    summary: [
    {
        label: 'Subtotal' as string,
        value: '$2070.00' as string,
    } as ProductListSummary,
    {
        label: 'Shipping' as string,
        value: 'Calculated at checkout' as string,
    } as ProductListSummary,
    {
        label: 'Total' as string,
        value: '$2070.00' as string,
    } as ProductListSummary,
    ] as ProductListSummary[],
    emptyMessage: 'Your cart is empty.' as string,
    headerAction: {
        id: 0 as number,
        label: 'Clear Cart' as string,
        customClassName: ['product-list__clear-btn'] as string[],
        handler: () => { console.log('Cart Cleared'); },
    } as ProductListAction,
} as ProdructListContent;