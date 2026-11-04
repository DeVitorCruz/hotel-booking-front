import { SemanticSideBar } from "../semantic-side-bar.interface";
import { SidebarBookingPanel } from "../../../components/sidebar-booking-panel/sidebar-booking-panel.component";

/** Right drawer (calendar button in the header): quick availability search. */
export const SIDE_BAR_RIGHT: SemanticSideBar = {
    id: 0,
    sideBarComponent: SidebarBookingPanel,
    sideBarInputs: {},
};
