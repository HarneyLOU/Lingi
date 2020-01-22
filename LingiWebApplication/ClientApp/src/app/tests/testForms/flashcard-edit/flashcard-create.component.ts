import { Component, Inject } from '@angular/core';
import { TestService } from '../../test.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/message.service';
import { HttpClient } from '@angular/common/http';
//import { ConsoleReporter } from 'jasmine';

@Component({
    selector: 'app-flashcard-create',
    templateUrl: './flashcard-create.component.html',
    styleUrls: ['./flashcard-create.component.css']
})

export class FlashcardCreateComponent {

    addingWordPanel = false;

    testKeywords: string;
    testDescription: string;
    testTitle: string;
    testType: string = "Flashcards";
    testLanguage: Language;
    testLevel: Level;


    languages: Language[];
    levels: Level[];
    flashcards: Flashcard[];

    constructor(
        private testService: TestService,
        private messageService: MessageService,
        private router: Router,
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string) {
   
        this.http.get<Flashcard[]>(baseUrl+"api"+"/flashcard/3").subscribe(result => {
            this.flashcards = result;
        }, error => console.error(error));

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
        let flashcard: Flashcard = {
            TestId: 1,
            Word1: "",
            Word2: "",
            Example1: "",
            Example2: ""
        }
        this.flashcards.push(flashcard);   
    }
    deleteWord(index: number){
        this.flashcards.slice(index, 1);
    }

    addFlashcards(){
        this.addTest();
        let isPossible: boolean = true;
        let i: number = 0;
        this.flashcards.forEach(element => {
            if(element.Word1 == "") isPossible = false;
            if(element.Word2 == "") isPossible = false;
            if(element.Example1 == "") isPossible = false;
            if(element.Example2 == "") isPossible = false;
            i++;
        });
        if(isPossible){
            this.testService.addFlashcards(this.createFlashcards()).subscribe(result => {
                console.log(result.toString())
                this.messageService.success("Updated flashcards");
                this.router.navigateByUrl('/tests/add', { skipLocationChange: true }).then(() => {
                    this.router.navigate(['/tests/add']);
                }); 
            }, error => console.error(error));
        } else {
            this.messageService.error("Invalid form");
        }
    }

    addTest(){
        this.testService.addTest(this.createTest()).subscribe(result => {
            console.log(result.toString())
        }, error => console.error(error));
    }

    private createTest(){
        let test: Test = {
            Id: 3,
            Tags: this.testKeywords,
            Description: this.testDescription,
            Language: this.testLanguage.Name,
            Type: this.testType,
            Level: this.testLevel.Name,
        }
        return test;
    }

    private createFlashcards(){
        let flashcards: Flashcard[] = [];
        let i: number = 0;

        for (let entry of this.wordsW) {
            let flashcard: Flashcard = {
                TestId: 3,
                Word1: entry,
                Word2: this.translatedWords[i],
                Example1: this.sentence[i],
                Example2: this.translatedSentence[i]
            }
            i++;
            flashcards.push(flashcard);
        }
        return flashcards;
    }
    
}
