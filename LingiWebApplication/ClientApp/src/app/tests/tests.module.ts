import { NgModule } from '@angular/core';
import { FlashcardCreateComponent } from './testForms/flashcard-create/flashcard-create.component';
import { BaseFormComponent } from './testForms/base-form/base-form.component';
import { TestTableComponent } from './test-table/test-table.component';
import { TestComponent } from './test/test.component';
import { RateComponent } from './rate/rate.component';
import { FlashcardComponent } from './test/flashcard/flashcard.component';
import { SingleFlashcardComponent } from './test/flashcard/single-flashcard/single-flashcard.component';
import { SharedModule } from '../shared/shared.module';
import { TestService } from './test.service';
import { RouterModule } from '@angular/router';
import { MessageService } from '../message.service';
import { QuizCreateComponent } from './testForms/quiz-create/quiz-create.component';

const routes = [
  { path: 'tests', component: TestTableComponent },
  { path: 'tests/add', component: BaseFormComponent },
 // { path: 'tests/:id', component: TestComponent },
  { path: 'flashcard/:id', component: FlashcardComponent },
  { path: 'tests/add/Flashcards', component: FlashcardCreateComponent },
  { path: 'tests/add/Quiz', component: QuizCreateComponent },
];

@NgModule({
    declarations: [
        FlashcardCreateComponent,
        BaseFormComponent,
        TestTableComponent,
        TestComponent,
        FlashcardComponent,
        SingleFlashcardComponent,
        RateComponent,
        QuizCreateComponent
    ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
    ],
    entryComponents: [RateComponent],
    exports: [
        TestTableComponent,
        ],
    providers: [TestService, MessageService]
})
export class TestsModule { }
