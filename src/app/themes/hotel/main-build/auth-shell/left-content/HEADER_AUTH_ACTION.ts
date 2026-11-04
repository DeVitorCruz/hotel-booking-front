import { AnchorFlexItem } from "@shared/ui/anchor-flex/anchor-flex-item.interface";
import { AnchorFlex } from "@shared/ui/anchor-flex/anchor-flex.component";
import { IconSwitch } from "@shared/ui/icon-flex/icon-switch.type";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";

export const HEADER_AUTH_ACTION: SequenceSpaceItem = {
    id: 1,  
    customClassName: [] as string[],
    component: AnchorFlex,
    componentInput: {
        ANCHOR_FLEX_ITEM: {
            id: 0,
            title: 'Create Account',
            ariaLabel: 'register',
            rlink: '/auth/register',
            switchAbleIcon: { type: 'none' } as IconSwitch,        
        } as AnchorFlexItem,
    },
} as SequenceSpaceItem;