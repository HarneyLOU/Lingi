import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-base-form',
    templateUrl: './base-form.component.html',
    styleUrls: ['./base-form.component.css']
})

export class BaseFormComponent {
    //categories: Category[];
    //selectedCategory: Category;

    //constructor(private http: HttpClient,
    //    @Inject('BASE_URL') private baseUrl: string) {
   
    //    this.http.get<Category[]>(baseUrl+"api"+"/category").subscribe(result => {
    //        this.categories = result;
    //    }, error => console.error(error));
    //}
}
