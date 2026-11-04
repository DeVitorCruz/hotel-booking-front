import { NavBarSecItem } from "@shared/ui/nav-bar/nav-bar-sec-item.interface";
import { CustomList } from "@shared/ui/custom-list/custom-list.component";
import { Extandable } from "@shared/ui/custom-list/expandable.type";
import { TAILWIND_LIST } from "./tailwindCollect/TAILWIND_LIST";
import { NAV_LIST_ITEMS } from "./nav-list-items/NAV_LIST_ITEMS";

export const NAV_LIST: NavBarSecItem = {
    id: 1,
    classSection: 'nav-list',
    componentSection: CustomList, 
    componentInput: {
        ITEMS_LIST: NAV_LIST_ITEMS as Extandable[],
        LIST_BLOCK: TAILWIND_LIST as string[]
    }
};