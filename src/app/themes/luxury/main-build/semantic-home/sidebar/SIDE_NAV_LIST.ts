import { NavBarSecItem } from "@shared/ui/nav-bar/nav-bar-sec-item.interface";
import { CustomList } from "@shared/ui/custom-list/custom-list.component";
import { Extandable } from "@shared/ui/custom-list/expandable.type";
import { NAV_LIST_SIDEBAR_ITEMS } from "./nav-list-sidebar-items/NAV_LIST_SIDEBAR_ITEMS";
import { TAILWIND_SIDE_NAV_LIST_BLOCK } from "./tailwindCollect/TAILWIND_SIDE_NAV_LIST_BLOCK";

export const SIDE_NAV_LIST: NavBarSecItem = {
    id: 1,
    classSection: 'nav-sidebar-list',
    componentSection: CustomList, 
    componentInput: {
        ITEMS_LIST: NAV_LIST_SIDEBAR_ITEMS as Extandable[],
        LIST_BLOCK: TAILWIND_SIDE_NAV_LIST_BLOCK as string[],
        SUB_ITEM_CODE: 'subList-first-layer-2',
    }
};