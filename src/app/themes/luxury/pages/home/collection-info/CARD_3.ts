import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { SequenceSpaceComponent } from "@shared/ui/sequence-space/sequence-space.component";
import { TextBoxComponent } from "@shared/ui/text-box/text-box.component";
import { FlexCardComponent } from "@shared/ui/flex-card/flex-card.component";
import { FlexCardItem } from "@shared/ui/flex-card/flex-card-item";
import { MediaImg } from "@core/models/media/media-img.interface";
import { FlexHeadingItem } from "@shared/ui/flex-heading/flex-heading-item";

export const CARD_3: SequenceSpaceItem = {
    id: 2,  
    customClassName: [],
    component: SequenceSpaceComponent,
    componentInput: {
        SEQUENCE_SPACE_LIST: [
            {
                id: 0,  
                customClassName: [],
                component: TextBoxComponent,
                componentInput: {
                    TEXT_BOX_LIST: [
                        {
                            id: 0,
                            text: ['20 Feb 2023'],
                        }
                    ]
                },
            },
            {
                id: 1,  
                customClassName: [],
                component: FlexCardComponent,
                componentInput: {
                    FLEX_CARD_ITEM: {
                        id: 0,
                        head: {
                            src: 'assets/collection-info/img-3.jpg',
                            alt: '',
                        } as MediaImg,
                        body: [
                            {
                                id: 0,
                                heading: {
                                    id: 0,
                                    headingType: 'h2',
                                    text: 'LOREM IPSUM DOLOR SIT CONSECTETUR',
                                } as FlexHeadingItem,
                                text: ['Neque convallis a cras semper auctor. Adipiscing elit ut aliquam purus'],
                                customBlockClassName: '',
                                anchorLink: [
                                    {
                                        id: 0,
                                        ariaLabel: '',
                                        rlink: '',
                                        title: 'Read More',
                                        switchAbleIcon: {
                                            type: 'none'
                                        },
                                    }
                                ],
                            }
                        ], 
                        customClassName: [],
                    } as FlexCardItem
                },
            }
        ],
        COSTUME_CLASS_BLOCK_NAME: 'card-block-3',
        COSTUME_CLASS_ELEMENT: 'card-element-3',
        COSTUME_CLASS_NAME_LIST: []
    },
};