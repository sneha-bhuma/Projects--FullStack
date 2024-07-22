import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

    notify:string = '';

   profileForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['',Validators.required]    

  });

  constructor(private formBuilder: FormBuilder) {}

 onSubmit() {
    // console.warn(this.profileForm.value);
    // console.log(this.profileForm.value.firstName);
     if (this.profileForm.value.firstName == 'admin' && this.profileForm.value.lastName == 'admin') {
        this.notify = "Login Success"         
     }else {
      this.notify = "Login Failed!"
     }
   }


}