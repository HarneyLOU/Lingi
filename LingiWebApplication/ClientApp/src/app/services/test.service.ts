import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TestService {
    tests: Test[];
    constructor(private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string) {

        this.http.get<Test[]>(baseUrl + "api" + "/test").subscribe(result => {
            this.tests = result;
        }, error => console.error(error));
    }

    getTests(): Test[] {
        return this.tests;
    }
}
