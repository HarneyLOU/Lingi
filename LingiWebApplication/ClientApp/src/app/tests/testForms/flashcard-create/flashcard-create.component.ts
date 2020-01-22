import { Component, Inject } from '@angular/core';
import { TestService } from '../../test.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/message.service';
//import { ConsoleReporter } from 'jasmine';

@Component({
    selector: 'app-flashcard-create',
    templateUrl: './flashcard-create.component.html',
    styleUrls: ['./flashcard-create.component.css']
})

export class FlashcardCreateComponent {

    public addingWordPanel = false;
    public words: Array<string> = [''];
    public wordsW: Array<string> = [''];
    public translatedWords: Array<string> = [''];
    public sentence: Array<string> = [''];
    public translatedSentence: Array<string> = [''];
    flashcardKeywords: string;
    flashcardDescription: string;
    flashcardTitle: string;


    constructor(
        private testService: TestService,
        private messageService: MessageService,
        private router: Router,
        @Inject('BASE_URL') private baseUrl: string) {
    }

    showAddingWordPanel(){
        this.addingWordPanel = true;
        console.log(this.flashcardKeywords);
    }

    hideAddingWordPanel()
    {
        this.addingWordPanel = false;
    }

    addNewWord()
    {
        this.translatedWords.push('');
        this.words.push('');
        this.wordsW.push('');
        this.sentence.push('');
        this.translatedSentence.push('');
        
    }
    deleteWord(index: number){
        this.translatedWords.splice(index,1);
        this.words.splice(index,1);
        this.wordsW.splice(index,1);
        this.sentence.splice(index,1);
        this.translatedSentence.splice(index,1);
    }

    saveFlashcards(){
        let isPossible: boolean = true;
        let i: number = 0;
        this.wordsW.forEach(element => {
            if(element == "") isPossible = false;
            if(this.translatedWords[i] == "") isPossible = false;
            if(this.sentence[i] == "") isPossible = false;
            if(this.translatedSentence[i] == "") isPossible = false;
            i++;
        });
        if(isPossible){
            this.testService.addFlashcards(this.createFlashcards()).subscribe(result => {
                console.log(result.toString())
                this.messageService.success("Created new flashcard");
                this.router.navigateByUrl('/tests/addt', { skipLocationChange: true }).then(() => {
                    this.router.navigate(['/tests/add']);
                }); 
            }, error => console.error(error));
        } else {
            this.messageService.error("Invalid form");
        }
    }

    private createFlashcards(){
        let flashcards: Flashcard[] = [];
        let i: number = 0;

        for (let entry of this.wordsW) {
            let flashcard: Flashcard = {
                Id: 3,
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
