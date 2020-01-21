import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

const routes = [
  { path: 'login', component: LoginComponent},
];

@NgModule({
  declarations: [ LoginComponent ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [LoginComponent]
   
})
export class AuthModule { }
