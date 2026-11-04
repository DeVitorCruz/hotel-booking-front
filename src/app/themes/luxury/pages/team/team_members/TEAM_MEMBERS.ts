import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { CardGridContent, CardItem } from "@ui-building/card-grid/card-grid.interface";
import { HEADER } from "../header/HEADER";
import { MEMBER_1 } from "./MEMBER_1";
import { MEMBER_2 } from "./MEMBER_2";
import { MEMBER_3 } from "./MEMBER_3";
import { MEMBER_4 } from "./MEMBER_4";
import { MEMBER_5 } from "./MEMBER_5";
import { MEMBER_6 } from "./MEMBER_6";

export const TEAM_MEMBERS: CardGridContent = {
    header: HEADER as TextBox[],
    cards: [
        MEMBER_1 as CardItem,
        MEMBER_2 as CardItem,
        MEMBER_3 as CardItem,
        MEMBER_4 as CardItem,
        MEMBER_5 as CardItem,
        MEMBER_6 as CardItem,
    ] as CardItem[],
    gridClassName: 'grid-team-members',
    sectionClassName: 'team-grid',
} as CardGridContent;