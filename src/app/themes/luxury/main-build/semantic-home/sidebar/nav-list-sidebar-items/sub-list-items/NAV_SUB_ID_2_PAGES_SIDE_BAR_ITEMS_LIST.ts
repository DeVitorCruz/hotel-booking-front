import { Extandable } from "@shared/ui/custom-list/expandable.type";
import { NAV_SUB_SUB_ID_0_SHOP_ITEM_LIST } from "../../../nav-bar/nav-list-items/sub-list-items/sub-list-items/NAV_SUB_SUB_ID_0_SHOP_ITEM_LIST";
import { ID_1_WISHLIST } from "../../../nav-bar/nav-list-items/sub-list-items/anchor-items/ID_1_WISHLIST";
import { ID_2_ORDER } from "../../../nav-bar/nav-list-items/sub-list-items/anchor-items/ID_2_ORDER";
import { ID_3_404_ERROR } from "../../../nav-bar/nav-list-items/sub-list-items/anchor-items/ID_3_404_ERROR";
import { ID_4_FAQ } from "../../../nav-bar/nav-list-items/sub-list-items/anchor-items/ID_4_FAQ";
import { ID_5_LOGIN } from "../../../nav-bar/nav-list-items/sub-list-items/anchor-items/ID_5_LOGIN";
import { faAngleRight, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { DynamicEventConfig } from "@core/directives/dynamic-events/dynamic-event.config";
import { AccordionStateItem } from "@core/services/accordion-state/accordion-state-item.interface";


export const NAV_SUB_ID_2_PAGES_SIDE_BAR_ITEMS_LIST: Extandable[] = [
    {
        id: 0,
        type: 'subItem',
        subItems: NAV_SUB_SUB_ID_0_SHOP_ITEM_LIST,
        subItem_code: '',
        title: 'shop',
        iconType: { 
            type: 'iconAwesome',
            currentIcon: faAngleRight as IconDefinition
        },
        buttonEventListenerList: [
            {
                nameEvent: 'click',
                eventMethod: (e) => { console.log("this button only execute the accordion accordding to the id"); },
                actionType: 'accordionToggle',
                accordionItem: {
                    subItem_code: 'subList-second-layer-0',
                } as AccordionStateItem,
            } as DynamicEventConfig
        ],
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