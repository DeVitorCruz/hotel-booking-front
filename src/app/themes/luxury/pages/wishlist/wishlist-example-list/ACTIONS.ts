import { ProductListAction } from "@ui-building/product-list/product-list.interface";

export const ACTIONS: ProductListAction[] = [
    {
        id: 0 as number,
        label: 'Add to Cart' as string,
        customClassName: ['product-list__add-cart-btn'] as string[],
        handler: (id: number) => {},
    } as ProductListAction,
    {
        id: 1 as number,
        label: 'Remove' as string,
        customClassName: ['product-list__remove-btn'] as string[],
        handler: (id: number) => {},
    } as ProductListAction,
] as ProductListAction[];