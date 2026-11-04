import { MediaImg } from "@core/models/media/media-img.interface";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { ButtonItem } from "@shared/ui/button/button-item.interface";
import { SlidItem } from "@shared/ui/side-slide/slide-item.interface";
import { TabPanelContent } from "@ui-building/tab-panel/tab-panel.interface";

export interface ShopSingleContent {
    mainImage: MediaImg;
    gallery?: SlidItem;
    body: TextBox[];
    addToCartButton: ButtonItem;
    quantityMin?: number;
    tabPanel: TabPanelContent;
};