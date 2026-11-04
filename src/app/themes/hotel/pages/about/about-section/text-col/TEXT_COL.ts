import { AnchorFlexItem } from "@shared/ui/anchor-flex/anchor-flex-item.interface";
import { FlexHeadingItem } from "@shared/ui/flex-heading/flex-heading-item";
import { IconSwitch } from "@shared/ui/icon-flex/icon-switch.type";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { TextBoxComponent } from "@shared/ui/text-box/text-box.component";

export const TEXT_COL: SequenceSpaceItem = {
    id: 1,  
    customClassName: [] as string[],
    component: TextBoxComponent,
    componentInput: {
        TEXT_BOX_LIST: [
            {
                id: 0,
                heading: { id: 0, headingType: 'h2', text: 'About Us', } as FlexHeadingItem,
                customBlockClassName: 'about-subtitle',
            } as TextBox,
            {
                id: 1,
                text: [
                    'Neque convallis a cras semper auctor. Adipiscing elit ut aliquam purus sit amet luctus. Mauris vitae ultricies leo integer. Odio facilisis mauris sit amet massa.',
                    'Sed risus pretium quam vulputate dignissim suspendisse in est. Aliquet nibh praesent tristique magna. Tempus iaculis urna id volutpat. Ornare arcu odio ut sem nulla pharetra diam. Suspendisse in est ante in nibh. Purus non enim praesent elementum facilisis leo vel fringilla est. Auctor eu augue ut lectus arcu bibendum at.',
                    'Amet luctus venenatis lectus magna fringilla. Nec ultrices dui sapien eget mi proin sed.',
                ] as string[],
                customBlockClassName: 'about-body',
            } as TextBox,
            {
                id: 2,
                anchorLink: [
                    {
                        id: 0,
                        title: 'Shop Now',
                        description: '',
                        ariaLabel: 'Shop Now',
                        rlink: '/shop',
                        switchAbleIcon: { type: 'none' } as IconSwitch,
                    }
                ] as AnchorFlexItem[],
                customBlockClassName: 'about-cta',
            } as TextBox,
        ] as TextBox[],
    },
};