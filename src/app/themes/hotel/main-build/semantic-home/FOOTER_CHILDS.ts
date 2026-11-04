import { ContainerBlock } from "@shared/ui/container/container-block.interface";
import { LOWER_FOOTER } from "./footer-childs/lower-footer/LOWER_FOOTER";
import { UPPER_FOOTER } from "./footer-childs/upper-footer/UPPER_FOOTER";

export const FOOTER_CHILDS: ContainerBlock = {
    id: 0,
    customBlockClassName: 'footer-childs',
    items: [ 
        UPPER_FOOTER,
        LOWER_FOOTER,
    ],
};