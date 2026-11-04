import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { FORM_INPUT_ITEM } from "./form-input-item/FORM_INPUT_ITEM";
import { FlexHeadingItem } from "@shared/ui/flex-heading/flex-heading-item";

export const SEARCH_TEXT_BOX: TextBox = {
    id: 3,
    heading: {
        id: 3,
        headingType: 'h3',
        text: 'Stay in Touch',
    } as FlexHeadingItem,
    customBlockClassName: 'search-text-box',
    text: ['Seasonal offers and news from the hotel, a few times a year.'],
    flexFormItem: FORM_INPUT_ITEM
};