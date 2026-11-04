import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { FORM_INPUT_ITEM } from "./form-input-item/FORM_INPUT_ITEM";
import { FlexHeadingItem } from "@shared/ui/flex-heading/flex-heading-item";

export const SEARCH_TEXT_BOX: TextBox = {
    id: 3,
    heading: {
        id: 3,
        headingType: 'h3',
        text: 'Subscribe Now',
    } as FlexHeadingItem,
    customBlockClassName: 'search-text-box',
    text: ['Lorem Ipsum is simply dummy text standard dummy printing text.'],
    flexFormItem: FORM_INPUT_ITEM
};