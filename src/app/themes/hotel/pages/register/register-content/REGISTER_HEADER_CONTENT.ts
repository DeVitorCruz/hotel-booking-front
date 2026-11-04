import { ContainerBlock } from "@shared/ui/container/container-block.interface";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { TextBoxComponent } from "@shared/ui/text-box/text-box.component";
import { REGISTER_HEADER_TEXT } from "./REGISTER_HEADER_TEXT";

export const REGISTER_HEADER_CONTENT: ContainerBlock = {
    id: 0,
    customBlockClassName: 'register-header-content-block',
    customElementClassName: 'register-header-content-element',
    customClassName: [] as string[],
    items: [
        {
            id: 0,  
            customClassName: [],
            component: TextBoxComponent,
            componentInput: {
                TEXT_BOX_LIST: REGISTER_HEADER_TEXT as TextBox[],
            },
        } as SequenceSpaceItem
    ] as SequenceSpaceItem[],
};