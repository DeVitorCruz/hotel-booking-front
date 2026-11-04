import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ENVIRONMENT } from "@environments/environment";


@Injectable({
    providedIn: 'root'
}) export class ApiService {
    public readonly BASE_URL: string = ENVIRONMENT.apiUrl;

    constructor(protected http: HttpClient) {}

    protected get<T>(endPoint: string, params?: Record<string, string | number>): Observable<T> {
        let httpsParams: HttpParams = new HttpParams();
        
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                httpsParams = httpsParams.set(key, value);
            });
        }

        return this.http.get<T>(`${this.BASE_URL}/${endPoint}`, { params: httpsParams });
    }

    protected post<T>(endPoint: string, body: any): Observable<T> {
        return this.http.post<T>(`${this.BASE_URL}/${endPoint}`, body);
    }

    protected patch<T>(endPoint: string, body: any): Observable<T> {
        return this.http.patch<T>(`${this.BASE_URL}/${endPoint}`, body);
    }

    protected delete<T>(endPoint: string): Observable<T> {
        return this.http.delete<T>(`${this.BASE_URL}/${endPoint}`);
    }
}