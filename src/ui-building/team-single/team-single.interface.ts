import { MediaImg } from "@core/models/media/media-img.interface";
import { AnchorFlexItem } from "@shared/ui/anchor-flex/anchor-flex-item.interface";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";

export interface TeamSingleContent {
    image: MediaImg;
    name: string;
    role: string;
    bio?: string;
    email?: string;
    phone?: string;
    socialLinks?: AnchorFlexItem[];
    extraContent?: TextBox[];
};