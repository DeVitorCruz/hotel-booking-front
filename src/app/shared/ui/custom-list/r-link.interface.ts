import { ListItem } from "./list-item.interface";
import { AnchorFlexItem } from "../anchor-flex/anchor-flex-item.interface";

export interface RLink extends ListItem {
    type: 'rlink',
    anchorItem: AnchorFlexItem;
};