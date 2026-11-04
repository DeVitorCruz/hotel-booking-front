import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ContactRequest } from "@core/models/contact/contact.model";

@Injectable({ providedIn: 'root' }) 
export class ContactService extends ApiService {
    constructor(http: HttpClient) {
        super(http);
    }

    public submit(data: ContactRequest): Observable<{ message: string }> {
        return this.post<{ message: string }>('contacts', data);
    }
}