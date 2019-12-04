import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class TestService {
    tests: Test[];
    constructor(private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string) {
    }

    getTests(): Observable<Test[]> {
        return this.http.get<Test[]>(this.baseUrl + "api" + "/test");
    }

    getTypes(): Observable<Type[]> {
        return this.http.get<Type[]>(this.baseUrl + "api" + "/type");
    }
}
