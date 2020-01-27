import { Component, OnInit, Inject } from '@angular/core';
import { TestService } from '../../test.service';
import { MessageService } from 'src/app/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quiz-create',
  templateUrl: './quiz-create.component.html',
  styleUrls: ['./quiz-create.component.css']
})
export class QuizCreateComponent{

    public addingWordPanel = false;
    public questionz: String[][] = [['','']];

    testKeywords: string;
    testDescription: string;
    testTitle: string;
    testType: string = "Quiz";
    testLanguage: Language;
    testLevel: Level;

    editTest: any;

    languages: Language[];
    levels: Level[];

    quiz: Quiz[] = [];
    quizAnswer: QuizAnswer[] = [];

    constructor(
        private testService: TestService,
        private messageService: MessageService,
        private router: Router,
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string) {
   
        this.http.get<Language[]>(baseUrl+"api"+"/language").subscribe(result => {
            this.languages = result;
        }, error => console.error(error));

        this.http.get<Level[]>(baseUrl+"api"+"/level").subscribe(result => {
            this.levels = result;
        }, error => console.error(error));

        let ans: QuizAnswer[] = [
            {
                Answer: "answer1",
                Correct: true
            },
            {
                Answer: "answer2",
                Correct: false
            }
        ]

        let q: Quiz = { 
            Question: "Question",
            Answers: ans
        }
        this.quiz.push(q);

        console.log(this.quiz);
    }

    showAddingWordPanel(){
        this.addingWordPanel = true;
    }

    hideAddingWordPanel()
    {
        this.addingWordPanel = false;
    }

    addNewWord()
    {
        
        let ans: QuizAnswer[] = [
            {
                Answer: "",
                Correct: true
            },
            {
                Answer: "",
                Correct: false
            }
        ]
        
        this.questionz.push(['','']);
        let q: Quiz = { 
            Question: "",
            Answers: ans
        }
        this.quiz.push(q);
    }

    deleteWord(index: number){
        if(this.questionz.length > 1){
            this.questionz.splice(index,1);
            this.quiz.splice(index,1);
        } else this.messageService.error("Minimum one question");
    }

    
    addNewAnswer(i:number)
    {
        this.questionz[i].push('');
        let q: QuizAnswer = { 
            Answer: "",
            Correct: false
        }
        this.quiz[i].Answers.push(q)
    }
    deleteAnswer(i:number, index: number){
        if(this.questionz[i].length > 2){
            this.questionz[i].splice(index,1);
            this.quiz[i].Answers.splice(index,1);
        } else this.messageService.error("Minimum two answers")
        //this.quiz.splice(index,1);
    }

    addTest(){
        console.log(this.quiz);
    }



    // addFlashcards(){
    //     let isPossible: boolean = true;
    //     this.flashcards.forEach(element => {
    //         if(element.Word1 == "") isPossible = false;
    //         if(element.Word2 == "") isPossible = false;
    //         if(element.Example1 == "") isPossible = false;
    //         if(element.Example2 == "") isPossible = false;
    //     });

    //     if(isPossible){
    //         console.log(this.editTest.Id)
    //         this.testService.addFlashcards(this.createFlashcards(this.editTest.id)).subscribe(result => {
    //             console.log(result.toString())
    //             this.messageService.success("Created new flashcards");
    //             this.router.navigateByUrl('/tests/add', { skipLocationChange: true }).then(() => {
    //                 this.router.navigate(['/tests/add']);
    //             }); 
    //         }, error => console.error(error));
    //     } else {
    //         this.messageService.error("Invalid form");
    //     }
    // }

    // addTest(){
    //     this.testService.addTest(this.createTest()).subscribe(result => {
    //         this.editTest = result;
    //         this.addFlashcards();
    //     }, error => console.error(error))
    //     this.addFlashcards();
    // }

    // private createTest(){
    //     let test: Test = {
    //         Tags: this.testKeywords,
    //         Description: this.testDescription,
    //         Language: this.testLanguage.Name,
    //         Type: this.testType,
    //         Level: this.testLevel.Name,
    //         User: null,
    //     }
    //     return test;
    // }

    // private createFlashcards(testId: number){
    //     let flashcards: Flashcard[] = [];
    //     let i: number = 0;

    //     for (let entry of this.flashcards) {
    //         let flashcard: Flashcard = {
    //             TestId: testId,
    //             Word1: entry.Word1,
    //             Word2: entry.Word2,
    //             Example1: entry.Example1,
    //             Example2: entry.Example2
    //         }
    //         i++;
    //         flashcards.push(flashcard);
    //     }
    //     return flashcards;
    // }
    
}
