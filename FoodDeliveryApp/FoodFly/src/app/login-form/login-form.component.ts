import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginpopComponent } from '../loginpop/loginpop.component';

@Component({
  selector: 'app-login-form',
  template: ''
})
export class LoginFormComponent {

  constructor(private dialog: MatDialog) {}

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginpopComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // You can handle the result here, for example, perform actions based on login success or failure
    });
  }
}
