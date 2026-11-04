import { NavBarSecItem } from "@shared/ui/nav-bar/nav-bar-sec-item.interface";
import { ButtonFlex } from "@shared/ui/button/button.component";
import { ButtonItem } from "@shared/ui/button/button-item.interface";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { TAILWIND_SIDE_BAR_BUTTON } from "./tailwindCollect/TAILWIND_SIDE_BAR_BUTTON";
import { DynamicEventConfig } from "@core/directives/dynamic-events/dynamic-event.config";

export const SIDE_BAR_BUTTON: NavBarSecItem = {
    id: 2,
    classSection: 'nav-sidebar-button',
    componentSection: ButtonFlex,
    componentInput: {
        BUTTON_ITEM: {
           type: 'button',
           customClassName: TAILWIND_SIDE_BAR_BUTTON,
           iconType: {
            type: 'iconAwesome',
            currentIcon: faCalendarCheck
           },
           buttonEventListenerList: [{
            nameEvent: 'click',
            eventMethod: () => undefined,
            actionType: 'openButtonRight',
           } as DynamicEventConfig ], 
        } as ButtonItem
    }
};