import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { TestsModule } from './tests/tests.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { NotFoundComponent } from './core/not-found/not-found.component';

import { MatDialogModule } from '@angular/material';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { ToastrModule } from 'ngx-toastr';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    AlertDialogComponent,
  ],
  imports: [
    CoreModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    TestsModule,
    AuthModule,
    SharedModule,
    MatDialogModule,
    ToastrModule.forRoot()
  ],
  entryComponents:[AlertDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
