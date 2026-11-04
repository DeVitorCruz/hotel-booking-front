import { computed, Injectable, signal } from "@angular/core";
import { ApiService } from "../api/api.service";
import { User } from "@core/models/auth/user.model";
import { HttpClient } from "@angular/common/http";
import { StorageService } from "@core/web-api-collect/storage/storage.service";
import { Observable, tap } from "rxjs";
import { AuthResponse, LoginRequest, RegisterRequest } from "@core/models/auth/auth-response.model";

@Injectable({
    providedIn: "root"
}) export class AuthService extends ApiService {
    private readonly TOKEN_KEY: string = "auth_token";
    private readonly USER_KEY: string = "auth_user";

    private readonly USER = signal<User | null>(null);
    private readonly TOKEN = signal<string | null>(null);

    public readonly _USER_EFFECT = computed(() => this.USER());
    public readonly _TOKEN_EFFECT = computed(() => this.TOKEN());
    public readonly _IS_AUTENTICATED_EFFECT = computed(() => !!this.TOKEN());

    constructor(
        http: HttpClient,
        private storage: StorageService
    ) {
        super(http);
        this._loadFromStorage();
    }

    public login(credentials: LoginRequest): Observable<AuthResponse> {
        return this.post<AuthResponse>("login", credentials).pipe(
            tap(response => this._setSession(response))
        );
    }

    public register(data: RegisterRequest): Observable<AuthResponse> {
        return this.post<AuthResponse>("register", data).pipe(
            tap(response => this._setSession(response))
        );
    }

    public logout(): Observable<any> {
        return this.post<any>('logout', {}).pipe(
            tap(() => this._clearSession())
        );
    }

    public getToken(): string | null {
        return this.TOKEN();
    }

    private _setSession(response: AuthResponse): void {
        this.TOKEN.set(response.access_token);
        this.USER.set(response.user);
        this.storage.setItem(this.TOKEN_KEY, response.access_token);
        this.storage.setItem(this.USER_KEY, JSON.stringify(response.user));
    }

    private _clearSession(): void {
        this.TOKEN.set(null);
        this.USER.set(null);
        this.storage.removeItem(this.TOKEN_KEY);
        this.storage.removeItem(this.USER_KEY);
    }

    private _loadFromStorage(): void {
        const SCOPE_TOKEN = this.storage.getItem(this.TOKEN_KEY);
        const SCOPE_USER = this.storage.getItem(this.USER_KEY);

        if (SCOPE_TOKEN) this.TOKEN.set(SCOPE_TOKEN);
        if (SCOPE_USER) this.USER.set(JSON.parse(SCOPE_USER));
    }
}