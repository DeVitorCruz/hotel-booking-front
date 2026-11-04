import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PaginatedResponse } from "@core/models/shared/paginated-response.interface";
import { TeamMember } from "@core/models/shared/team/team.model";

@Injectable({ providedIn: 'root' }) 
export class TeamService extends ApiService {
    constructor(http: HttpClient) {
        super(http);
    }

    public getAll(): Observable<PaginatedResponse<TeamMember>> {
        return this.get<PaginatedResponse<TeamMember>>('teams');
    }

    public getById(id: number): Observable<TeamMember> {
        return this.get<TeamMember>(`teams/${id}`);
    }
}