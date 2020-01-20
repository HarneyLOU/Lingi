import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [ NavMenuComponent, NotFoundComponent, NavBarComponent ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [ NavMenuComponent, NotFoundComponent, NavBarComponent ]
})
export class CoreModule { }
