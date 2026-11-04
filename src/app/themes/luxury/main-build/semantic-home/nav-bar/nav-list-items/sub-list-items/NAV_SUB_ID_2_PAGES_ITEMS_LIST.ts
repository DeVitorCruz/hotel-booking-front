import { Extandable } from "@shared/ui/custom-list/expandable.type";
import { NAV_SUB_SUB_ID_0_SHOP_ITEM_LIST } from "./sub-list-items/NAV_SUB_SUB_ID_0_SHOP_ITEM_LIST";
import { ID_1_WISHLIST } from "./anchor-items/ID_1_WISHLIST";
import { ID_2_ORDER } from "./anchor-items/ID_2_ORDER";
import { ID_3_404_ERROR } from "./anchor-items/ID_3_404_ERROR";
import { ID_4_FAQ } from "./anchor-items/ID_4_FAQ";
import { ID_5_LOGIN } from "./anchor-items/ID_5_LOGIN";
import { faAngleRight, IconDefinition } from "@fortawesome/free-solid-svg-icons";


export const NAV_SUB_ID_2_PAGES_ITEMS_LIST: Extandable[] = [
    {
        id: 0,
        type: 'subItem',
        subItems: NAV_SUB_SUB_ID_0_SHOP_ITEM_LIST,
        subItem_code: 'subList-second-layer-0',
        title: 'shop',
        iconType: { 
            type: 'iconAwesome',
            currentIcon: faAngleRight as IconDefinition
        }
    },
    {
        id: 1,
        type: 'rlink',
        anchorItem: ID_1_WISHLIST,
    },
    {
        id: 2,
        type: 'rlink',
        anchorItem: ID_2_ORDER,
    },
    {
        id: 3,
        type: 'rlink',
        anchorItem: ID_3_404_ERROR,
    },
    {
        id: 4,
        type: 'rlink',
        anchorItem: ID_4_FAQ,
    },
    {
        id: 5,
        type: 'rlink',
        anchorItem: ID_5_LOGIN,
    },
];