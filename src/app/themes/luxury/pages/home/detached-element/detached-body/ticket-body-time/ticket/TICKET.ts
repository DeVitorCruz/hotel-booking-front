import { AnchorFlexItem } from "@shared/ui/anchor-flex/anchor-flex-item.interface";
import { FlexHeadingItem } from "@shared/ui/flex-heading/flex-heading-item";
import { IconSwitch } from "@shared/ui/icon-flex/icon-switch.type";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { TextBoxComponent } from "@shared/ui/text-box/text-box.component";

export const TICKET: SequenceSpaceItem = {
    id: 0,  
    customClassName: [],
    component: TextBoxComponent,
    componentInput: {
        TEXT_BOX_LIST: [
            {
                id: 0,
                heading: {
                    id: 0,
                    headingType: 'h3',
                    text: 'GOLD EAR RING',
                } as FlexHeadingItem,
                text: ['$968.00'],
                customBlockClassName: '',
                anchorLink: [
                    {
                        id: 0,
                        ariaLabel: '',
                        rlink: '',
                        switchAbleIcon: { type: 'none' } as IconSwitch,
                        title: 'Add to Cart',
                    }
                ] as AnchorFlexItem[],
            }
        ],
    },
};