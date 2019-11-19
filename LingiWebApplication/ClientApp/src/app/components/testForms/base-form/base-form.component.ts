import { Component } from '@angular/core';

@Component({
    selector: 'app-base-form',
    templateUrl: './base-form.component.html',
    styleUrls: ['./base-form.component.css']
})

export class BaseFormComponent {
    categories: string[] = ["Flashcards", "Quiz", "Fill the sentence"];
    selectedCategory: string;

    constructor() {

    }
}
