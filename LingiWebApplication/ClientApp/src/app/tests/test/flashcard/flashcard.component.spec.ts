/// <reference path="../../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { FlashcardComponent } from './flashcard.component';

let component: FlashcardComponent;
let fixture: ComponentFixture<FlashcardComponent>;

describe('flashcard component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FlashcardComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(FlashcardComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});