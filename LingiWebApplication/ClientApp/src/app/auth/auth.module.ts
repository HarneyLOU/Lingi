import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';

const routes = [
  { path: 'login', component: LoginComponent},
];

@NgModule({
  declarations: [ LoginComponent ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [LoginComponent],
  providers : [ AuthService]
})
export class AuthModule { }
