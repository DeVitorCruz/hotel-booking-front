import { Extandable } from "@shared/ui/custom-list/expandable.type";
import { ID_0_SHOP } from "./anchor-items/ID_0_SHOP";
import { ID_1_SHOP_SINGLE } from "./anchor-items/ID_1_SHOP_SINGLE";
import { ID_2_CART } from "./anchor-items/ID_2_CART";
import { ID_3_CHECKOUT } from "./anchor-items/ID_3_CHECKOUT";

export const NAV_SUB_SUB_ID_0_SHOP_ITEM_LIST: Extandable[] = [
    {
        id: 0,
        type: 'rlink',
        anchorItem: ID_0_SHOP
    },
    {
        id: 1,
        type: 'rlink',
        anchorItem: ID_1_SHOP_SINGLE
    },
    {
        id: 2,
        type: 'rlink',
        anchorItem: ID_2_CART
    },
    {
        id: 3,
        type: 'rlink',
        anchorItem: ID_3_CHECKOUT
    },
];