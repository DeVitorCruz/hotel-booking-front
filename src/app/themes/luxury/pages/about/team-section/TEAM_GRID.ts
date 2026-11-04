import { CardGridContent, CardItem } from "@ui-building/card-grid/card-grid.interface";
import { TEAM_HEADER } from "./TEAM_HEADER";
import { TEAM_BODY_LIST } from "./TEAM_BODY_LIST";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { RIGHT_SHAPE } from "./RIGHT_SHAPE";

export const TEAM_GRID: CardGridContent = {
    header: TEAM_HEADER as TextBox[],
    cards: TEAM_BODY_LIST as CardItem[],
    gridClassName: 'cols-3',
    sectionClassName: 'team-grid',
    decoration: [RIGHT_SHAPE] as SequenceSpaceItem[],
};