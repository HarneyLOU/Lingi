import { Component } from '@angular/core';
//import { ConsoleReporter } from 'jasmine';

@Component({
    selector: 'app-flashcard-create',
    templateUrl: './flashcard-create.component.html',
    styleUrls: ['./flashcard-create.component.css']
})

export class FlashcardCreateComponent {

    public addingWordPanel = false;
    public words: Array<string> = ['word1'];
    public wordsW: Array<string> = ['word1'];
    public translatedWords: Array<string> = ['word1'];
    public sentence: Array<string> = ['word1'];
    public translatedSentence: Array<string> = ['word1'];
    flashcardKeywords: string;
    flashcardDescription: string;
    flashcardTitle: string;

    constructor() {

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
}
