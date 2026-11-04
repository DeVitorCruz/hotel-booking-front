import { IconFlexComponent } from "@shared/ui/icon-flex/icon-flex.component";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { IconSwitch } from "@shared/ui/icon-flex/icon-switch.type";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

export const ICON_VALUE: SequenceSpaceItem = {
    id: 0,  
    customClassName: [],
    component: IconFlexComponent,
    componentInput: {
        ICON_SWITCH: {
            type: 'iconAwesome',
            currentIcon: faQuoteLeft as IconDefinition,
        } as IconSwitch,
    },
};