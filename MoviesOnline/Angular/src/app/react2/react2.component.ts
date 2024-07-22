import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-react2',
  templateUrl: './react2.component.html',
  styleUrl: './react2.component.css'
})


export class React2Component {

  formvalues = '';
  
  profileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
  });


  onSubmit() {
    console.log(this.profileForm.value);

    this.formvalues =
      'you entered - ' +
      this.profileForm.value.firstName +
      ' ' +
      this.profileForm.value.lastName;
    // setvalue

    this.profileForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
    });
  }


}
