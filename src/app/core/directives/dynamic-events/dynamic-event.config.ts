import { AccordionStateItem } from "../../services/accordion-state/accordion-state-item.interface";

export interface DynamicEventConfig {
    nameEvent: string;
    eventMethod: (e: Event) => void;
    actionType: '' | 'toggleLeftSidebar' | 'toggleRightSideBar' | 'closeButtonLeft' | 'closeButtonRight' | 'openButtonLeft' | 'openButtonRight' | 'accordionToggle';
    accordionItem?: AccordionStateItem;
};