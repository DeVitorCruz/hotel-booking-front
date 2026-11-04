import { IconSwitch } from "../icon-flex/icon-switch.type";
import { DynamicEventConfig } from "../../../core/directives/dynamic-events/dynamic-event.config";

export interface ButtonItem {
    id: number;
    title?: string;
    type: 'button' | 'reset' | 'submit';
    isDisabled?: boolean;
    customClassName?: string[];
    iconType: IconSwitch;
    matButton?: 'elevated' | 'outlined';
    buttonEventListenerList?: DynamicEventConfig[];
};