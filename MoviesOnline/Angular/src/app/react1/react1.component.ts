import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-react1',
  templateUrl: './react1.component.html',
  styleUrl: './react1.component.css'
})

export class React1Component {

  colorControl = new FormControl('red')

  updateName(){
    this.colorControl.setValue('yellow');

  }

}
