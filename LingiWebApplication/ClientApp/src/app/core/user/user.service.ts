import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
    constructor(private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string) {

    }

    getUser(): Observable<User> {
        return this.http.get<User>(this.baseUrl + "api" + "/user");
    }
}
