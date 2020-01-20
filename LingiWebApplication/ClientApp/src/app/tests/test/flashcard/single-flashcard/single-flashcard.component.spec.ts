/// <reference path="../../../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { SingleFlashcardComponent } from './single-flashcard.component';

let component: SingleFlashcardComponent;
let fixture: ComponentFixture<SingleFlashcardComponent>;

describe('single-flashcard component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SingleFlashcardComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(SingleFlashcardComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});