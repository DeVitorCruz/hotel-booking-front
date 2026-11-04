import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { HttpClient } from "@angular/common/http";
import { PaginatedResponse } from "@core/models/shared/paginated-response.interface";
import { Observable } from "rxjs";
import { FaqItem } from "@core/models/faq/faq.model";


@Injectable({ providedIn: 'root' }) 
export class FaqService extends ApiService {
    constructor(http: HttpClient) {
        super(http);
    }

    public getAll(): Observable<PaginatedResponse<FaqItem>> {
        return this.get<PaginatedResponse<FaqItem>>('faqs');
    }
}