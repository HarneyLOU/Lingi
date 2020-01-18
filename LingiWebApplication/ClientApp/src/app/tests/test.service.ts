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

    getTest(id: number): Observable<Test> {
        return this.http.get<Test>(this.baseUrl + "api" + "/test/" + id);
    }

    getTypes(): Observable<Type[]> {
        return this.http.get<Type[]>(this.baseUrl + "api" + "/type");
    }

    getFlashcards(id: number): Observable<Flashcard[]> {
        return this.http.get<Flashcard[]>(this.baseUrl + "api" + "/flashcard/" + id);
    }
}
