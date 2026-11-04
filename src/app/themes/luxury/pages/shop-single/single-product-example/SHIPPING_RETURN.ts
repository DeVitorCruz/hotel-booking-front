import { Type } from "@angular/core";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { TextBoxComponent } from "@shared/ui/text-box/text-box.component";
import { TabItem } from "@ui-building/tab-panel/tab-panel.interface";

export const SHIPPING_RETURN: TabItem = {
    id: 2 as number,
    label: 'Shipping & Return' as string,
    component: TextBoxComponent as Type<any>,
    componentInput: {
        TEXT_BOX_LIST: [{
            id: 0 as number,
            text: [
                'Shipping Faster', 
                'Use on walls, furniture, doors and many more surfaces. The possibilities are endless.',
                'Cotton Material',
                'Use on walls, furniture, doors and many more surfaces. The possibilities are endless.',
                'High Quality',
                'Use on walls, furniture, doors and many more surfaces. The possibilities are endless.',
                'highly compatible',
                'Use on walls, furniture, doors and many more surfaces. The possibilities are endless.',
            ] as string[],
        } as TextBox,] as TextBox[],
    } as Record<string, any>,
} as TabItem;