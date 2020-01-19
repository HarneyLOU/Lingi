import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-single-flashcard',
    templateUrl: './single-flashcard.component.html',
    styleUrls: ['./single-flashcard.component.css']
})

export class SingleFlashcardComponent {

    @Input() flashcard: Flashcard;
    @Input() changed: boolean = false;
    @Output() checked = new EventEmitter<boolean>();
    check: boolean = false;


    constructor() {

    }

    clicked() {
        this.check = false;
    }

    onCheck() {
        this.check = !this.check;
        this.checked.emit(true);
    }
}
