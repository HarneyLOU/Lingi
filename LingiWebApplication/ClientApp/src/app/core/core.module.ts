import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UserService } from './user/user.service';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
]

@NgModule({
    declarations: [
        NavMenuComponent,
        NotFoundComponent,
        NavBarComponent,
        HomeComponent
    ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ],
    exports: [
        NavMenuComponent,
        NavBarComponent,
        NotFoundComponent,
        HomeComponent
    ],
    providers: [
        UserService
    ]
})
export class CoreModule { }
