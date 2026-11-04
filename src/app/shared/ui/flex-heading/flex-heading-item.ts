import { AnchorFlexItem } from "../anchor-flex/anchor-flex-item.interface";

export interface FlexHeadingItem {
    id: number;
    headingType: 'none' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    text: string;
    achorFlexList?: AnchorFlexItem[];
};