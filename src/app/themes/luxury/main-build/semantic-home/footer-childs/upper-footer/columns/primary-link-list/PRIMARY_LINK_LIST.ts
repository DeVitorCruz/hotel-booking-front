import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { OptionListComponent } from "@shared/ui/option-list/option-list.component";
import { OptionListItem } from "@shared/ui/option-list/option-list-item.interface";
import { OPTIONS_LIST } from "./options-list/OPTIONS_LIST";

export const PRIMARY_LINK_LIST: SequenceSpaceItem = {
    id: 1,  
    customClassName: [],
    component: OptionListComponent,
    componentInput: {
        OPTION_LIST: {
            id: 0,
            customBlockClassName: 'primary-link-list',
            heading: {
                id: 0,
                headingType: 'h3',
                text: 'Quick Links',
            },
            optionsList: OPTIONS_LIST,
        } as OptionListItem,
    },
};
