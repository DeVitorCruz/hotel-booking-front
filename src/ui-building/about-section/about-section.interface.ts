import { MediaImg } from "@core/models/media/media-img.interface";
import { ContainerBlock } from "@shared/ui/container/container-block.interface";
import { IconSwitch } from "@shared/ui/icon-flex/icon-switch.type";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";

export interface AboutSectionImages {
    main: MediaImg;
    secondary?: MediaImg;
    icon?: IconSwitch;
};

export interface AboutSectionContent {
    images?: AboutSectionImages;
    body: TextBox[];
};

export interface AboutSectionBlock {
    containerBlock: ContainerBlock;
};
