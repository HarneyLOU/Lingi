/// <reference path="../../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { BrowseTestsComponent } from './browse-tests.component';

let component: BrowseTestsComponent;
let fixture: ComponentFixture<BrowseTestsComponent>;

describe('browse-tests component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ BrowseTestsComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(BrowseTestsComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});