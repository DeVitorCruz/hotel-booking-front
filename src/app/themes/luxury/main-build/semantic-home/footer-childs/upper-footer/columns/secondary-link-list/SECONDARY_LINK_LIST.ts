import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { OptionListComponent } from "@shared/ui/option-list/option-list.component";
import { OptionListItem } from "@shared/ui/option-list/option-list-item.interface";
import { OPTIONS_LIST } from "./options-list/OPTIONS_LIST";

export const SECONDARY_LINK_LIST: SequenceSpaceItem = {
    id: 2,  
    customClassName: [],
    component: OptionListComponent,
    componentInput: {
        OPTION_LIST: {
            id: 1,
            customBlockClassName: 'secondary-link-list',
            heading: {
                id: 1,
                headingType: 'h3',
                text: 'Support',
            },
            optionsList: OPTIONS_LIST,
        } as OptionListItem,
    },
};
