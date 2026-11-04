import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { MediaImg } from "@core/models/media/media-img.interface";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";

export interface CardItem {
    id: number;
    image: MediaImg;
    content: TextBox[];
    customClassName?: string[];
    link?: string;
};

export interface CardGridContent {
    header: TextBox[];
    cards: CardItem[];
    gridClassName?: string;
    sectionClassName?: string;
    decoration?: SequenceSpaceItem[];
};