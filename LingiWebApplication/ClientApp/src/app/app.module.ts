import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FlashcardCreateComponent } from './components/testForms/flashcard/flashcard-create.component';
import { BaseFormComponent } from './components/testForms/base-form/base-form.component';
import { TestTableComponent } from './components/test-table/test-table.component';

import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthService } from './services/auth.service';
import { TestService } from './services/test.service';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    FlashcardCreateComponent,
    BaseFormComponent,
    TestTableComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: TestTableComponent },
      { path: 'login', component: LoginComponent },
    ]),
      BrowserAnimationsModule,
      MaterialModule
  ],
    providers: [
        AuthService,
        TestService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
