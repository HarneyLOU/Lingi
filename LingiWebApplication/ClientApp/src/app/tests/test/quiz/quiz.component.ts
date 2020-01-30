import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../test.service';
import { MatDialog } from '@angular/material/dialog';
import { RateComponent } from '../../rate/rate.component';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnInit {

    test: Test;
    author: any;

    quizzes: Quiz[];

    answers: QuizAnswer[] = [];
    corrects: boolean[] = [];

    description: string;

    ifStarted: boolean = false;
    ifWon: boolean = false;
    ifRated: boolean = false;

    correct: number = 0;
    wrong: number = 0;
    size: number;

    constructor(private activatedRoute: ActivatedRoute,
        private testService: TestService,
        private router: Router,
        public dialog: MatDialog) {
    }

    ngOnInit() {
        var id = +this.activatedRoute.snapshot.params["id"];
        this.testService.getQuizzes(id).subscribe(result => {
            this.quizzes = this.shuffle(result);
            for (let quiz of this.quizzes) {
                quiz.Answers = this.shuffle(quiz.Answers);
            }
            this.size = this.quizzes.length;
        }, error => console.error(error));

        this.testService.getTest(id).subscribe(result => {
            this.test = result;
        }, error => console.error(error));

        this.testService.getUser().subscribe(result => {
            this.author = result;
        }, error => console.error(error));
    }

    onCheck() {
        let i = 0;
        for (let answer of this.answers) {
            if (answer.Correct == true) {
                this.corrects[i] = true;
                this.correct++;
            }
            else {
                this.corrects[i] = false;
                this.wrong++;
            }
            i++;
        }
        this.ifWon = true;
    }

    getMark(quiz: Quiz) {
            if (this.corrects[this.quizzes.indexOf(quiz)]) return "assets/check-mark.png";
            else return "assets/cross-mark.png";
    }

    onSelect() {
        this.ifStarted = !this.ifStarted;
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

    shuffle(array: any[]) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
}
