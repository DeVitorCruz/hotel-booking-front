import { TextBox } from "../text-box/text-box-item.interface";
import { MediaImg } from "../../../core/models/media/media-img.interface";
import { ImgFlexAddiction } from "../img-flex/img-flex-addiction.interface";

export interface FlexCardItem {
    id: number;
    head: MediaImg;
    body: TextBox[]; 
    customClassName?: string[];
    customBlockClassName?: string;
    imgFlexAddiction?: ImgFlexAddiction[];
};