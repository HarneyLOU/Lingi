import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
]

@NgModule({
    declarations: [
        NavMenuComponent,
        NotFoundComponent,
        HomeComponent
    ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ],
    exports: [
        NavMenuComponent,
        NotFoundComponent,
        HomeComponent
    ]
})
export class CoreModule { }
