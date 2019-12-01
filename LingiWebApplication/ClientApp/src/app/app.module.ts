import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { TestsModule } from './tests/tests.module';
import { AuthModule } from './auth/auth.module';
import { NotFoundComponent } from './core/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'test', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    TestsModule,
    AuthModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
