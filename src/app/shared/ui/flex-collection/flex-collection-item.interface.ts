import { TextBox } from "../text-box/text-box-item.interface";
import { SequenceSpaceItem } from "../sequence-space/sequence-space-item";

export interface FlexCollectionItem {
    header: TextBox[];
    customClassName?: string[];
    customBlockClassName?: string;
    bodyList: SequenceSpaceItem[];
    bodyBlockClassName?: string;
    bodyElementClassName?: string;
};