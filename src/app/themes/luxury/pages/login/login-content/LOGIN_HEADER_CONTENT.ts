import { ContainerBlock } from "@shared/ui/container/container-block.interface";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { TextBoxComponent } from "@shared/ui/text-box/text-box.component";
import { LOGIN_HEADER_TEXT } from "./LOGIN_HEADER_TEXT";

export const LOGIN_HEADER_CONTENT: ContainerBlock = {
    id: 0,
    customBlockClassName: 'login-header-content-block',
    customElementClassName: 'login-header-content-element',
    customClassName: [] as string[],
    items: [
        {
            id: 0,  
            customClassName: [],
            component: TextBoxComponent,
            componentInput: {
                TEXT_BOX_LIST: LOGIN_HEADER_TEXT as TextBox[],
            },
        } as SequenceSpaceItem
    ] as SequenceSpaceItem[],
} as ContainerBlock;