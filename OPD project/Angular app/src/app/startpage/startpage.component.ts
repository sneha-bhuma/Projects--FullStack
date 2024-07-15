import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.css']
})
export class StartpageComponent {
  constructor(public dialogRef: MatDialogRef<StartpageComponent>) {}

  onButtonClick() {
    this.dialogRef.close();
  }
}
