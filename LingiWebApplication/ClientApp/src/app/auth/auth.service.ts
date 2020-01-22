import { EventEmitter, Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { UserService } from '../core/user/user.service';

@Injectable()
export class AuthService {
    authKey: string = "auth";
    currentUser: string = "user";
    clientId: string = "Lingi";

    constructor(private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: any,
        private userService: UserService) {
    }

    // performs the login
    login(username: string, password: string): Observable<boolean> {
        var url = "api/token/auth";
        var data = {
            username: username,
            password: password,
            client_id: this.clientId,
            // required when signing up with username/password
            grant_type: "password",
            // space-separated list of scopes for which the token is issued
            scope: "offline_access profile email"
        };

        return this.getAuthFromServer(url, data);
    }

    // try to refresh token
    refreshToken(): Observable<boolean> {
        var url = "api/token/auth";
        var data = {
            client_id: this.clientId,
            // required when signing up with username/password
            grant_type: "refresh_token",
            refresh_token: this.getAuth()!.refresh_token,
            // space-separated list of scopes for which the token is issued
            scope: "offline_access profile email"
        };

        return this.getAuthFromServer(url, data);
    }

    // retrieve the access & refresh tokens from the server
    getAuthFromServer(url: string, data: any): Observable<boolean> {
        return this.http.post<TokenResponse>(url, data).pipe(
            map((res) => {
                let token = res && res.token;
                // if the token is there, login has been successful
                if (token) {
                    // store username and jwt token
                    this.setAuth(res);
                    // successful login
                    return true;
                }

                // failed login
                return Observable.throw('Unauthorized');
            }),
            catchError(error => {
                return new Observable<any>(error);
            }));
    }

    // performs the logout
    logout(): boolean {
        this.setAuth(null);
        return true;
    }

    // Persist auth into localStorage or removes it if a NULL argument is given
    setAuth(auth: TokenResponse | null): boolean {
        if (isPlatformBrowser(this.platformId)) {
            if (auth) {
                localStorage.setItem(
                    this.authKey,
                    JSON.stringify(auth));
                this.setUser();

            }
            else {
                localStorage.removeItem(this.authKey);
                localStorage.removeItem(this.currentUser);
            }
        }
        return true;
    }

    setUser() {
        let user: User;
        this.userService.getUser().subscribe(result => {
            user = result;
            localStorage.setItem(
                this.currentUser,
                JSON.stringify(user.UserName));
        })
    }

    // Retrieves the auth JSON object (or NULL if none)
    getAuth(): TokenResponse | null {
        if (isPlatformBrowser(this.platformId)) {
            var i = localStorage.getItem(this.authKey);
            if (i) {
                return JSON.parse(i);
            }
        }
        return null;
    }

    // Returns TRUE if the user is logged in, FALSE otherwise.
    isLoggedIn(): boolean {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.getItem(this.authKey) != null;
        }
        return false;
    }

} 
