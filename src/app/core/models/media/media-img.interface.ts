import { MediaImgPriority } from "./media-img-priority.enum";

export interface MediaImg {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    placeholder?: string;
    priority?: MediaImgPriority;
};