import { Extandable } from "@shared/ui/custom-list/expandable.type";
import { ID_3_404_ERROR } from "./anchor-items/ID_3_404_ERROR";
import { ID_4_FAQ } from "./anchor-items/ID_4_FAQ";
import { ID_5_LOGIN } from "./anchor-items/ID_5_LOGIN";
import { ID_3_TEAM } from "../anchor-items/ID_3_TEAM";

export const NAV_SUB_ID_2_PAGES_ITEMS_LIST: Extandable[] = [
    { id: 0, type: 'rlink', anchorItem: ID_4_FAQ },
    { id: 1, type: 'rlink', anchorItem: ID_3_TEAM },
    { id: 2, type: 'rlink', anchorItem: ID_5_LOGIN },
    { id: 3, type: 'rlink', anchorItem: ID_3_404_ERROR },
];
