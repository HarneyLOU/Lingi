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

    getUserTests(user: string): Observable<Test[]> {
        return this.http.get<Test[]>(this.baseUrl + "api" + "/test/user/" + user);
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

    addFlashcards(flashcards: Flashcard[]){
        return this.http.put<Flashcard[]>(this.baseUrl + "api" + "/flashcard",flashcards);
    }

    editFlashcards(flashcards: Flashcard[]){
        return this.http.post<Flashcard[]>(this.baseUrl + "api" + "/flashcard",flashcards);
    }

    deleteFlashcards(id: number){
        return this.http.delete<Flashcard[]>(this.baseUrl + "api" + "/flashcard/" + id);
    }

    addTest(test: Test){
        return this.http.put<Test>(this.baseUrl + "api" + "/test", test);
    }

    editTest(test: Test){
        return this.http.post<Test>(this.baseUrl + "api" + "/test", test);
    }
    
    getUser(): Observable<any> {
        return this.http.get<any>(this.baseUrl + "api" + "/user");
    }

    getQuizzes(id: number): Observable<Quiz[]> {
        return this.http.get<Quiz[]>(this.baseUrl + "api" + "/quiz/" + id);
    }

    addQuiz(quiz: Quiz[]){
        return this.http.put<Quiz[]>(this.baseUrl + "api" + "/quiz", quiz);
    }

    getLanguages() {
        return this.http.get<Language[]>(this.baseUrl + "api" + "/language");
    }

    getLevels() {
        return this.http.get<Level[]>(this.baseUrl + "api" + "/level");
    }
}
