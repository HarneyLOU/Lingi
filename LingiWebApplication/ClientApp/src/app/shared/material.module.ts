import { NgModule } from '@angular/core';
import {
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatListModule,
    MatSidenavModule,
    MatChipsModule
} from '@angular/material';

@NgModule({
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatDialogModule,
        MatTableModule,
        MatMenuModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressBarModule,
        MatListModule,
        MatSidenavModule,
        MatChipsModule
    ],
    exports: [
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatDialogModule,
        MatTableModule,
        MatMenuModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressBarModule,
        MatListModule,
        MatSidenavModule,
        MatChipsModule
    ]
})
export class MaterialModule { }
