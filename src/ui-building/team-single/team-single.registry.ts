import { Type } from "@angular/core";
import { TeamSingleComponent } from "./team-single.component";

export const TEAM_SINGLE_REGISTRY: Record<string, Type<any>> = {
    'default': TeamSingleComponent,
    // 'miniaml': TeamSingleMinimalComponent, <- future
};

export type TeamSingleTemplate = keyof typeof TEAM_SINGLE_REGISTRY;