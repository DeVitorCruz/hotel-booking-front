import { BreadCrumbComponent } from "@shared/ui/bread-crumb/bread-crumb.component";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";


export const BANNER_BREADCRUMB: SequenceSpaceItem = {
    id: 1,  
    customClassName: [] as string[],
    component: BreadCrumbComponent,
    componentInput: {
        COSTUME_CLASS_NAME_LIST: [] as string[],
    },
};