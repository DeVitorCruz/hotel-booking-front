import { Type } from "@angular/core";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { TextBoxComponent } from "@shared/ui/text-box/text-box.component";
import { TabItem } from "@ui-building/tab-panel/tab-panel.interface";

export const DETAILS_SPECS: TabItem = {
    id: 1 as number,
    label: 'Details & Specs' as string,
    component: TextBoxComponent as Type<any>,
    componentInput: {
        TEXT_BOX_LIST: [{
            id: 0 as number,
            text: [
                'About This Products', 
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Nulla luctus libero quis mauris vestibulum dapibus.', 
                'Maecenas ullamcorper erat mi, vel consequat enim suscipit at.', 
                'Quisque consectetur nibh ac urna molestie scelerisque.', 'Mauris in nisl scelerisque massa consectetur pretium sed et mauris.',
            ] as string[],
        } as TextBox,] as TextBox[],
    } as Record<string, any>,
} as TabItem;