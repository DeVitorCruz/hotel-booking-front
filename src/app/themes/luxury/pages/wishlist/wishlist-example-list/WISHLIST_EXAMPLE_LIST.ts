import { ProdructListContent, ProductListAction, ProductListItem } from "@ui-building/product-list/product-list.interface";
import { ITEM_1 } from "./ITEM_1";
import { ITEM_2 } from "./ITEM_2";
import { ITEM_3 } from "./ITEM_3";
import { ITEM_4 } from "./ITEM_4";
import { ITEM_5 } from "./ITEM_5";
import { ITEM_6 } from "./ITEM_6";

export const WISHLIST_EXAMPLE_LIST: ProdructListContent = {
    title: 'My Wishlist' as string,
    items: [
        ITEM_1,
        ITEM_2,
        ITEM_3,
        ITEM_4,
        ITEM_5,
        ITEM_6,
    ] as ProductListItem[],
    emptyMessage: 'Your wishlist is empty.' as string,
    headerAction: {
        id: 0 as number,
        label: 'Clear All' as string,
        customClassName: ['product-list__clear-btn'] as string[],
        handler: (itemId: number) => {},
    } as ProductListAction, 
} as ProdructListContent;