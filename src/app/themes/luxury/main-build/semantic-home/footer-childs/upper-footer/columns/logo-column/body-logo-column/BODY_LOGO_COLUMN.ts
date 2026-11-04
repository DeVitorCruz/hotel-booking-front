import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { TextBoxComponent } from "@shared/ui/text-box/text-box.component";
import { FACEBOOK_BRAND_ICON } from "./brands-icons/FACEBOOK_BRAND_ICON";
import { TWITTER_BRAND_LOGO } from "./brands-icons/TWITTER_BRAND_LOGO";
import { LINKED_IN_BRAND_LOGO } from "./brands-icons/LINKED_IN_BRAND_LOGO";
import { INSTAGRAM_BRAND_LOGO } from "./brands-icons/INSTAGRAM_BRAND_LOGO";

export const BODY_LOGO_COLUMN: SequenceSpaceItem = {
    id: 1,  
    customClassName: [],
    component: TextBoxComponent,
    componentInput: {
        TEXT_BOX_LIST: [
            {
                id: 0,
                text: ['Neque convallis a cras semper auctor. Adipiscing elit ut aliquam purus sit amet luctus.'],
                anchorLink: [
                    FACEBOOK_BRAND_ICON,
                    TWITTER_BRAND_LOGO,
                    LINKED_IN_BRAND_LOGO,
                    INSTAGRAM_BRAND_LOGO,
                ],
                customBlockClassName: 'body-logo-column',
            },
        ]
    },
};