import { FlexHeadingItem } from "../flex-heading/flex-heading-item";
import { Extandable } from "../custom-list/expandable.type";

export interface OptionListItem {
    id: number;
    customClassName?: string[];
    customBlockClassName?: string;
    heading: FlexHeadingItem;
    optionsList: Extandable[];
};