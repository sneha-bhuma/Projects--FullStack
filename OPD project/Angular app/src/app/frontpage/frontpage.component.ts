import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StartpageComponent } from '../startpage/startpage.component';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent {

  constructor(public dialog: MatDialog) { }

  onNextClick() {
    const dialogRef = this.dialog.open(StartpageComponent);
  }

}
