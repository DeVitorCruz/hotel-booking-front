import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { ButtonItem } from "@shared/ui/button/button-item.interface";
import { IconSwitch } from "@shared/ui/icon-flex/icon-switch.type";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { TAILWIND_CLOSE_BUTTON } from "./TAILWIND_CLOSE_BUTTON";
import { DynamicEventConfig } from "@core/directives/dynamic-events/dynamic-event.config";

export const CLOSE_RIGHT_BUTTON: ButtonItem = {
    id: 0,
    title: '',
    type: 'button',
    customClassName: TAILWIND_CLOSE_BUTTON,
    iconType: {
        type: 'iconAwesome',
        currentIcon: faClose as IconDefinition,
    } as IconSwitch,
    buttonEventListenerList: [{
        nameEvent: 'click',
        eventMethod: (e) => { console.log('This is the right close button ', e); },
        actionType: 'closeButtonRight',
    } as DynamicEventConfig],
};