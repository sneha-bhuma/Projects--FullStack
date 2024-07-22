import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormBuilder,Validators } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login1',
  templateUrl: './login1.component.html',
  styleUrl: './login1.component.css'
})


export class Login1Component {
  
  notify:string = '';

  profileForm = this.formBuilder.group({
   firstName: ['', Validators.required],
   lastName: ['',Validators.required]    

 });

 constructor(
  private formBuilder: FormBuilder,
  private router:Router
) {}

onSubmit() {
   // console.warn(this.profileForm.value);
   // console.log(this.profileForm.value.firstName);
    if (this.profileForm.value.firstName == 'admin' && this.profileForm.value.lastName == 'admin') {
       this.notify = "Login Success"   
       this.router.navigate(['/react2'])   
    }else {
     this.notify = "Login Failed!"
    }
  }

}
