import { ContainerBlock } from '@shared/ui/container/container-block.interface';
import { FlexCollectionItem } from '@shared/ui/flex-collection/flex-collection-item.interface';
import { TestimonialContent } from '@ui-building/testimonial/testimonial.interface';

export interface HomeConfig {
    staticHero: ContainerBlock;
    cardTrack: ContainerBlock;
    collection: FlexCollectionItem;
    detachedElement: ContainerBlock;
    testimonial: TestimonialContent;
    collectionInfo: ContainerBlock;
};
