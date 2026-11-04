import { ContainerBlock } from "@shared/ui/container/container-block.interface";
import { LEFT_IMAGE } from "./LEFT_IMAGE";
import { RIGHT_IMAGE } from "./RIGHT_IMAGE";
import { BANNER } from "./BANNER";

export const STATIC_HERO: ContainerBlock = {
    id: 0,
    customBlockClassName: 'static-hero',
    items: [
        LEFT_IMAGE,
        BANNER,
        RIGHT_IMAGE
    ]
};

