import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Wishlist } from "@core/models/wishlist/wishlist.model";


@Injectable({ providedIn: 'root' })
export class WishlistService extends ApiService {
    constructor(http: HttpClient) {
        super(http);
    }

    public getAll(): Observable<Wishlist> {
        return this.get<Wishlist>('wishlist');
    }

    public add(productId: number): Observable<{ message: string }> {
        return this.post<{ message: string }>(`wishlist/${productId}`, {});
    } 

    public remove(productId: number): Observable<{ message: string }> {
        return this.delete<{ message: string }>(`wishlist/${productId}`);
    }

    public clear(): Observable<{ message: string }>{
        return this.delete<{ message: string }>(`wishlist/clear`);
    }
}