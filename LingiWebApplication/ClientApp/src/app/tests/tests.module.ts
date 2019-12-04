import { NgModule } from '@angular/core';
import { FlashcardCreateComponent } from './testForms/flashcard/flashcard-create.component';
import { BaseFormComponent } from './testForms/base-form/base-form.component';
import { TestTableComponent } from './test-table/test-table.component';
import { TestComponent } from './test/test.component';
import { SharedModule } from '../shared/shared.module';
import { TestService } from './test.service';
import { RouterModule } from '@angular/router';

const routes = [
  { path: 'tests', component: TestTableComponent },
  { path: 'tests/add', component: BaseFormComponent },
  { path: 'tests/:id', component: TestComponent },

];

@NgModule({
    declarations: [
        FlashcardCreateComponent,
        BaseFormComponent,
        TestTableComponent,
        TestComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [ TestTableComponent ],
  providers: [ TestService ]
})
export class TestsModule { }
