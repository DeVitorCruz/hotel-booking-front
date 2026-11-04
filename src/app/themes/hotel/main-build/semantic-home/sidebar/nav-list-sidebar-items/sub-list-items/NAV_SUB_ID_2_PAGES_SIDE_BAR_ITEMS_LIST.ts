import { Extandable } from "@shared/ui/custom-list/expandable.type";
import { ID_3_404_ERROR } from "../../../nav-bar/nav-list-items/sub-list-items/anchor-items/ID_3_404_ERROR";
import { ID_4_FAQ } from "../../../nav-bar/nav-list-items/sub-list-items/anchor-items/ID_4_FAQ";
import { ID_5_LOGIN } from "../../../nav-bar/nav-list-items/sub-list-items/anchor-items/ID_5_LOGIN";
import { ID_3_TEAM } from "../../../nav-bar/nav-list-items/anchor-items/ID_3_TEAM";

export const NAV_SUB_ID_2_PAGES_SIDE_BAR_ITEMS_LIST: Extandable[] = [
    { id: 0, type: 'rlink', anchorItem: ID_4_FAQ },
    { id: 1, type: 'rlink', anchorItem: ID_3_TEAM },
    { id: 2, type: 'rlink', anchorItem: ID_5_LOGIN },
    { id: 3, type: 'rlink', anchorItem: ID_3_404_ERROR },
];
