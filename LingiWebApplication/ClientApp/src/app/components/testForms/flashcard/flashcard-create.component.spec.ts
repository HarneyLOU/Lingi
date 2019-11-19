/// <reference path="../../../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { FlashcardCreateComponent } from './flashcard-create.component';

let component: FlashcardCreateComponent;
let fixture: ComponentFixture<FlashcardCreateComponent>;

describe('flashcard-create component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FlashcardCreateComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(FlashcardCreateComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});