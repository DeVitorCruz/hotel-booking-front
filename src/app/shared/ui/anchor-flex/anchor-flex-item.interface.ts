import { ListItem } from "../custom-list/list-item.interface";
import { IconSwitch } from "../icon-flex/icon-switch.type";
import { MediaImg } from "../../../core/models/media/media-img.interface";

export interface AnchorFlexItem extends ListItem {
    ariaLabel?: string;
    rlink?: string;
    switchAbleIcon: IconSwitch;
    imageFlex?: MediaImg;
};
