import { FlexHeadingItem } from "@shared/ui/flex-heading/flex-heading-item";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";

export const HEADER: TextBox[] = [
    {
        id: 0,
        heading: {
            id: 0,
            headingType: 'h2',
            text: 'team members'.toUpperCase(),
        } as FlexHeadingItem,
        text: ['Neque convallis a cras semper auctor. Adipiscing elit ut aliquam purus sit amet luctus. Mauris vitae ultricies leo integer.'] as string[],
    }
] as TextBox[];