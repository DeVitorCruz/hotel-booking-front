import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { CardGridContent, CardItem } from "@ui-building/card-grid/card-grid.interface";
import { SHOP_CARD_1 } from "./SHOP_CARD_1";
import { SHOP_CARD_2 } from "./SHOP_CARD_2";
import { SHOP_CARD_3 } from "./SHOP_CARD_3";
import { SHOP_CARD_4 } from "./SHOP_CARD_4";
import { SHOP_CARD_5 } from "./SHOP_CARD_5";
import { SHOP_CARD_6 } from "./SHOP_CARD_6";

export const SHOP_CONTENT: CardGridContent = {
    header: [] as TextBox[],
    cards: [
        SHOP_CARD_1,
        SHOP_CARD_2,
        SHOP_CARD_3,
        SHOP_CARD_4,
        SHOP_CARD_5,
        SHOP_CARD_6,
    ] as CardItem[],
    gridClassName: 'shop' as string,
    sectionClassName: 'shop-grid' as string,
} as CardGridContent;