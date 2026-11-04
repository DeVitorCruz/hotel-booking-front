import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { AnchorFlex } from "@shared/ui/anchor-flex/anchor-flex.component";
import { AnchorFlexItem } from "@shared/ui/anchor-flex/anchor-flex-item.interface";
import { IconSwitch } from "@shared/ui/icon-flex/icon-switch.type";


export const LEFT_FOOTER: SequenceSpaceItem = {
    id: 2,  
    customClassName: [] as string[],
    component: AnchorFlex,
    componentInput: {
        ANCHOR_FLEX_ITEM: {
            id: 0,
            title: 'Back To Home',
            ariaLabel: 'home',
            rlink: '/home',
            switchAbleIcon: { type: 'none' } as IconSwitch,        
        } as AnchorFlexItem,
    },
} as SequenceSpaceItem;