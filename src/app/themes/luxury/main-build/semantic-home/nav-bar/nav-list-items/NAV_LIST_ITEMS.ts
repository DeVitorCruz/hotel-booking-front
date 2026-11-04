import { Extandable } from "@shared/ui/custom-list/expandable.type";
import { NAV_SUB_ID_2_PAGES_ITEMS_LIST } from "./sub-list-items/NAV_SUB_ID_2_PAGES_ITEMS_LIST";
import { ID_0_HOME } from "./anchor-items/ID_0_HOME";
import { ID_1_ABOUT_US } from "./anchor-items/ID_1_ABOUT_US";
import { ID_3_TEAM } from "./anchor-items/ID_3_TEAM";
import { ID_4_BLOG } from "./anchor-items/ID_4_BLOG";
import { ID_5_CONTACT } from "./anchor-items/ID_5_CONTACT";
import { faAngleRight, IconDefinition } from "@fortawesome/free-solid-svg-icons";

export const NAV_LIST_ITEMS: Extandable[] = [
    {
        id: 0,
        type: 'rlink',
        anchorItem: ID_0_HOME
    },
    {
        id: 1,
        type: 'rlink',
        anchorItem: ID_1_ABOUT_US
    },
    {
        id: 2,
        type: 'subItem',
        subItems: NAV_SUB_ID_2_PAGES_ITEMS_LIST,
        subItem_code: 'subList-first-layer-2',
        title: 'Pages',
        iconType: { 
            type: 'iconAwesome',
            currentIcon: faAngleRight as IconDefinition 
        }
    },
    {
        id: 3,
        type: 'rlink',
        anchorItem: ID_3_TEAM
    },
    {
        id: 4,
        type: 'rlink',
        anchorItem: ID_4_BLOG
    },
    {
        id: 5,
        type: 'rlink',
        anchorItem: ID_5_CONTACT
    },
];