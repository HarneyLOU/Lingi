import { EventEmitter, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';


@Injectable()
export class AuthService {
    authKey: string = "auth";
    clientId: string = "Lingi";

    constructor(private http: HttpClient,
      @Inject(PLATFORM_ID) private platformId: any) {
    }

    login(username: string, password: string): Observable<boolean> {
        var url = "api/token/auth";
        var data = {
            username: username,
            password: password,
            client_id: this.clientId,
            grant_type: "password",
            scope: "offline_access profile email"
        };

        return this.http.post<TokenResponse>(url, data).pipe(map((res) => {
            let token = res && res.token;
            if (token) {
                this.setAuth(res);
                return true;
            }
            return Observable.throw(`Unauthorized`);
        })).pipe(catchError(error => {
            return new Observable<any>(error);
        })
        );
    }

    logout(): boolean {
        this.setAuth(null);
        return true;
    }

    setAuth(auth: TokenResponse | null): boolean {
        if (isPlatformBrowser(this.platformId)) {
            if (auth) {
                localStorage.setItem(
                    this.authKey,
                    JSON.stringify(auth));
            }
            else {
                localStorage.removeItem(this.authKey);
            }
        }
        return true;
    }

    getAuth(): TokenResponse | null {
        if (isPlatformBrowser(this.platformId)) {
            var i = localStorage.getItem(this.authKey);
            if (i) {
                return JSON.parse(i);
            }
        }
        return null;
    }

    isLoggedIn(): boolean {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.getItem(this.authKey) != null;
        }
        return false;
    }
}
