import { LOWER_FOOTER } from "./lower-footer/LOWER_FOOTER";
import { UPPER_FOOTER } from "./upper-footer/UPPER_FOOTER";
import { ContainerBlock } from "@shared/ui/container/container-block.interface";

export const FOOTER_CHILDS: ContainerBlock = {
    id: 0,
    customBlockClassName: 'footer-childs',
    items: [ 
        UPPER_FOOTER,
        LOWER_FOOTER,
    ],
}; 



