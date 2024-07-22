import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-react3',
  templateUrl: './react3.component.html',
  styleUrl: './react3.component.css'
})

export class React3Component {

  profileForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: [''],

    address: this.formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      zip: [''],
    }),

  });

  constructor(private formBuilder: FormBuilder) {}

  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street',
      },
      
    });

  }

  onSubmit() {
    console.warn(this.profileForm.value);
  }


}
