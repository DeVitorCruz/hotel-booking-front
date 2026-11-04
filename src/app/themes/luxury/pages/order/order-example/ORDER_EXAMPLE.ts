import { ProdructListContent, ProductListItem } from "@ui-building/product-list/product-list.interface";
import { ORDER_1 } from "./ORDER_1";
import { ORDER_2 } from "./ORDER_2";
import { ORDER_3 } from "./ORDER_3";
import { ORDER_4 } from "./ORDER_4";
import { ORDER_5 } from "./ORDER_5";
import { ORDER_6 } from "./ORDER_6";

export const ORDER_EXAMPLE: ProdructListContent = {
    title: 'My Orders' as string,
    items: [
        ORDER_1 as ProductListItem,
        ORDER_2 as ProductListItem,
        ORDER_3 as ProductListItem,
        ORDER_4 as ProductListItem,
        ORDER_5 as ProductListItem,
        ORDER_6 as ProductListItem,
    ] as ProductListItem[],
    emptyMessage: 'You have no orders yet.' as string,
} as ProdructListContent;