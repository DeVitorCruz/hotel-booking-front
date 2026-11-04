import { Extandable } from "@shared/ui/custom-list/expandable.type";
import { ID_0_HOME } from "../../nav-bar/nav-list-items/anchor-items/ID_0_HOME";
import { ID_1_ABOUT_US } from "../../nav-bar/nav-list-items/anchor-items/ID_1_ABOUT_US";
import { ID_3_TEAM } from "../../nav-bar/nav-list-items/anchor-items/ID_3_TEAM";
import { ID_4_BLOG } from "../../nav-bar/nav-list-items/anchor-items/ID_4_BLOG";
import { ID_5_CONTACT } from "../../nav-bar/nav-list-items/anchor-items/ID_5_CONTACT";
import { faAngleRight, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { DynamicEventConfig } from "@core/directives/dynamic-events/dynamic-event.config";
import { NAV_SUB_ID_2_PAGES_SIDE_BAR_ITEMS_LIST } from "./sub-list-items/NAV_SUB_ID_2_PAGES_SIDE_BAR_ITEMS_LIST";
import { AccordionStateItem } from "@core/services/accordion-state/accordion-state-item.interface";

export const NAV_LIST_SIDEBAR_ITEMS: Extandable[] = [
    {
        id: 0,
        type: 'rlink',
        anchorItem: ID_0_HOME
    },
    {
        id: 1,
        type: 'rlink',
        anchorItem: ID_1_ABOUT_US
    },
    {
        id: 2,
        type: 'subItem',
        subItems: NAV_SUB_ID_2_PAGES_SIDE_BAR_ITEMS_LIST,
        subItem_code: 'subList-second-layer-0',
        title: 'Pages',
        iconType: { 
            type: 'iconAwesome',
            currentIcon: faAngleRight as IconDefinition 
        },
        buttonEventListenerList: [
            {
                nameEvent: 'click',
                eventMethod: (e) => { console.log("That is the first layer list executing the accordion event"); },
                actionType: 'accordionToggle',
                accordionItem: {
                    subItem_code: 'subList-first-layer-2',
                } as AccordionStateItem,
            } as DynamicEventConfig
        ],
    },
    {
        id: 3,
        type: 'rlink',
        anchorItem: ID_3_TEAM
    },
    {
        id: 4,
        type: 'rlink',
        anchorItem: ID_4_BLOG
    },
    {
        id: 5,
        type: 'rlink',
        anchorItem: ID_5_CONTACT
    },
];