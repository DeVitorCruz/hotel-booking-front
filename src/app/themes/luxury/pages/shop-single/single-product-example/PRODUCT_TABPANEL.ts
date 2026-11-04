import { TabItem, TabPanelContent } from "@ui-building/tab-panel/tab-panel.interface";
import { PRODUCT_DETAILS } from "./PRODUCT_DETAILS";
import { DETAILS_SPECS } from "./DETAILS_&_SPECS";
import { REVIEWS } from "./REVIEWS";

export const PRODUCT_TABPANEL: TabPanelContent = {
    tabs: [
        PRODUCT_DETAILS as TabItem,
        DETAILS_SPECS as TabItem,
        REVIEWS as TabItem,
    ] as TabItem[],
    customClassName: ['product-tab-panel'] as string[],
} as TabPanelContent;