import { Component } from '@angular/core';

@Component({
    selector: 'app-flashcard-create',
    templateUrl: './flashcard-create.component.html',
    styleUrls: ['./flashcard-create.component.css']
})

export class FlashcardCreateComponent {

    public addingWordPanel = false;
    public words: Array<string> = ['word1'];
    public translatedWords: Array<string> = ['word1'];
    flashcardKeywords: string;
    flashcardDescription: string;

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
    }
    deleteWord(){
        this.translatedWords.pop();
        this.words.pop();
    }
}
