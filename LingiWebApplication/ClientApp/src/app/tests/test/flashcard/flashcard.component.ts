import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../test.service';
import { MatDialog } from '@angular/material/dialog';
import { RateComponent } from '../../rate/rate.component';

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
    iterator: number = 0;
    size: number;
    totalSize: number;

    ifStarted: boolean = false;
    ifChecked: boolean = false;
    ifWon: boolean = false;
    ifRated: boolean = false;

    mode = 'determinate';
    value = 0;

    constructor(
        private activatedRoute: ActivatedRoute,
        private testService: TestService,
        private router: Router,
        public dialog: MatDialog) {
 
    }

    ngOnInit() {
        var id = +this.activatedRoute.snapshot.params["id"];
        this.testService.getFlashcards(id).subscribe(result => {
            this.flashcards = result;
            this.flashcard = this.flashcards[0];
            this.size = this.flashcards.length;
            this.totalSize = this.size;
        }, error => console.error(error));

        this.testService.getTest(id).subscribe(result => {
            this.test = result;
        }, error => console.error(error));
    }

    onSelect() {
        this.ifStarted = !this.ifStarted;
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
        this.value = (this.flashcardsLearnt.length / this.totalSize) * 100;
    }

    onRemembered() {
        this.iterator++;
        this.flashcardsLearnt.push(this.flashcard);
        if (this.iterator >= this.size) {
            this.iterator = 0;
            this.flashcards = this.flashcardsToLearn;
            this.flashcardsToLearn = [];
            this.size = this.flashcards.length;
            if (this.size == 0) {
                this.finished();
            }
        }
        this.flashcard = this.flashcards[this.iterator];
        this.ifChecked = false;
        this.value = (this.flashcardsLearnt.length / this.totalSize) * 100;
    }

    finished() {
        this.ifWon = true;
    }

    onFinish() {
        this.router.navigate(["tests"]);
    }

    openRate(): void {
        const dialogRef = this.dialog.open(RateComponent, {
            width: '350px',
            data: { test: this.test }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.ifRated = true;
            console.log('The dialog was closed');
        });
    }
}
