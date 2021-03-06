import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-tests',
    templateUrl: './tests.component.html',
    styleUrls: ['./tests.component.css']
})

export class BaseFormComponent {
    categories: Type[];
    selectedCategory: Type;

    constructor(private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string) {
   
        this.http.get<Type[]>(baseUrl+"api"+"/type").subscribe(result => {
            this.categories = result;
        }, error => console.error(error));
    }
}
