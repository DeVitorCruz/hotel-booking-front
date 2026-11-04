import { ListItem } from "./list-item.interface";
import { Extandable } from "./expandable.type";
import { IconSwitch } from "../icon-flex/icon-switch.type";
import { DynamicEventConfig } from "../../../core/directives/dynamic-events/dynamic-event.config";


export interface SubItem extends ListItem {
    type: 'subItem',
    subItems: Extandable[];
    subItem_code: string;
    iconType: IconSwitch;
    buttonEventListenerList?: DynamicEventConfig[];
};