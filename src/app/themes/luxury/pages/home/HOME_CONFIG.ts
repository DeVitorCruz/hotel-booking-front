import { ContainerBlock } from "@shared/ui/container/container-block.interface";
import { FlexCollectionItem } from "@shared/ui/flex-collection/flex-collection-item.interface";
import { CARD_TRACK } from "./card-track/CARD_TRACK";
import { COLLECTION_CARD } from "./collection-card/COLLECTION_CARD";
import { COLLECTION_INFO } from "./collection-info/COLLECTION_INFO";
import { DETACHED_ELEMENT } from "./detached-element/DETACHED_ELEMENT";
import { HomeConfig } from "./home-config.interface";
import { STATIC_HERO } from "./static-hero/STATIC_HERO";
import { TESTIMONIAL_CONTENT } from "./testimonial-content/TESTIMONIAL_CONTENT";


export const HOME_CONFIG: HomeConfig = {
    staticHero: STATIC_HERO as ContainerBlock,
    cardTrack: CARD_TRACK as ContainerBlock,
    collection: COLLECTION_CARD as FlexCollectionItem,
    detachedElement: DETACHED_ELEMENT as ContainerBlock,
    testimonial: TESTIMONIAL_CONTENT,
    collectionInfo: COLLECTION_INFO as ContainerBlock,
};
