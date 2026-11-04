import { Type } from "@angular/core";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { TextBoxComponent } from "@shared/ui/text-box/text-box.component";
import { TabItem } from "@ui-building/tab-panel/tab-panel.interface";

export const PRODUCT_DETAILS: TabItem = {
    id: 0 as number,
    label: 'Product Details' as string,
    component: TextBoxComponent as Type<any>,
    componentInput: {
        TEXT_BOX_LIST: [{
            id: 0 as number,
            text: ['Keep your home organized, yet elegant with storage cabinets by Onita Patio Furniture. These cabinets not only make a great storage units, but also bring a great decorative accent to your decor. Traditionally designed, they are perfect to be used in the hallway, living room, bedroom, office or any place where you need to store or display things. Made of high quality materials, they are sturdy and durable for years. Bring one-of-a-kind look to your interior'] as string[],
        } as TextBox,] as TextBox[],
    } as Record<string, any>,
} as TabItem;