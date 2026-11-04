import { ContainerBlock } from "@shared/ui/container/container-block.interface";
import { CardGridContent } from "@ui-building/card-grid/card-grid.interface";
import { TestimonialContent } from "@ui-building/testimonial/testimonial.interface";

export interface AboutConfig {
    aboutSection: ContainerBlock;
    team: CardGridContent;
    testimonial: TestimonialContent;
}