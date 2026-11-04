import { NavBarSecItem } from "@shared/ui/nav-bar/nav-bar-sec-item.interface";
import { ButtonFlex } from "@shared/ui/button/button.component";
import { ButtonItem } from "@shared/ui/button/button-item.interface";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { TAILWIND_HIDDEN_BAR_BUTTON } from "./tailwindCollect/TAILWIND_HIDDEN_BAR_BUTTON";
import { DynamicEventConfig } from "@core/directives/dynamic-events/dynamic-event.config";


export const HIDDEN_BAR_BUTTON: NavBarSecItem = {
    id: 3,
    classSection: 'nav-hidden-button',
    componentSection: ButtonFlex,
    componentInput: {
        BUTTON_ITEM: {
           type: 'button',
           customClassName: TAILWIND_HIDDEN_BAR_BUTTON,
           iconType: {
            type: 'iconAwesome',
            currentIcon: faBars
           },  
           buttonEventListenerList: [{
            nameEvent: 'click',
            eventMethod: (e) => { console.log("The left sidebar event ", e); },
            actionType: 'openButtonLeft'
           } as DynamicEventConfig],
        } as ButtonItem,
    }
};  