import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-rate',
    templateUrl: './rate.component.html',
    styleUrls: ['./rate.component.css']
})

export class RateComponent {

    test: Test;
    opinion: string;

    constructor(public dialogRef: MatDialogRef<RateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Test) {

        this.test = data;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
