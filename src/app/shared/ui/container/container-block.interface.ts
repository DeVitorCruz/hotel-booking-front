import { SequenceSpaceItem } from "../sequence-space/sequence-space-item";

export interface ContainerBlock {
    id: number;
    customBlockClassName: string;
    customElementClassName?: string;
    customClassName?: string[];
    items: SequenceSpaceItem[];
};