/// <reference path="../../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { BaseFormComponent } from './base-form.component';

let component: BaseFormComponent;
let fixture: ComponentFixture<BaseFormComponent>;

describe('base-form component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ BaseFormComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(BaseFormComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});