import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../test.service';

@Component({
    selector: 'app-flashcard',
    templateUrl: './flashcard.component.html',
    styleUrls: ['./flashcard.component.css']
})

export class FlashcardComponent implements OnInit{

    test: Test;
    flashcards: Array<Flashcard>;
    flashcardsLearnt: Array<Flashcard> = [];
    flashcardsToLearn: Array<Flashcard> = [];
    flashcard: Flashcard;

    description: string;
    started: boolean = false;
    iterator: number = 0;
    size: number;

    ifChecked: boolean = false;

    constructor(private activatedRoute: ActivatedRoute, private testService: TestService, private router: Router) {
 
    }

    ngOnInit() {
        var id = +this.activatedRoute.snapshot.params["id"];
        this.testService.getFlashcards(id).subscribe(result => {
            this.flashcards = result;
            this.flashcard = this.flashcards[0];
            this.size = this.flashcards.length;
        }, error => console.error(error));

        this.testService.getTest(id).subscribe(result => {
            this.test = result;
        }, error => console.error(error));
    }

    onSelect() {
        this.started = !this.started;
    }

    onChecked(ifChecked: boolean) {
        this.ifChecked = ifChecked;
    }

    onForgotten() {
        this.iterator++;
        this.flashcardsToLearn.push(this.flashcard);
        if (this.iterator >= this.size) {
            this.iterator = 0;
            this.flashcards = this.flashcardsToLearn;
            this.flashcardsToLearn = [];
            this.size = this.flashcards.length;
        }
        this.flashcard = this.flashcards[this.iterator];
        this.ifChecked = false;
    }

    onRemembered() {
        this.iterator++;
        this.flashcardsLearnt.push(this.flashcard);
        if (this.iterator >= this.size) {
            this.iterator = 0;
            this.flashcards = this.flashcardsToLearn;
            this.flashcardsToLearn = [];
            this.size = this.flashcards.length;
        }
        this.flashcard = this.flashcards[this.iterator];
        this.ifChecked = false;
    }
}
