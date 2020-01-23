import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  constructor(private dialog: MatDialog) { }
  unregister() {
    let dialogRef = this.dialog.open(AlertDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      // NOTE: The result can also be nothing if the user presses the `esc` key or clicks outside the dialog
      if (result == 'confirm') {
        console.log('Unregistered');
      }
    })
    }
    isLoggedIn(): boolean {
        return localStorage.getItem("auth") != null;
    }
}
