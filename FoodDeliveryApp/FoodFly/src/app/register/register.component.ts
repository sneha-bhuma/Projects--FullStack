import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginpopComponent } from '../loginpop/loginpop.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{




  registerForm!: FormGroup;
  registrationError: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      this.userService.registerUser(this.registerForm.value)
        .subscribe(
          () => {
            console.log('User registered successfully');
            // Optionally, redirect or show success message
            this.openLoginDialog();
            
          },
          error => {
            console.error('Error registering user:', error);
            this.toastr.error("not registered succesfully")
            this.registrationError = error.message || 'Unknown error occurred';
          }
        );
    }
  }

  openLoginDialog(): void {
    this.dialog.open(LoginpopComponent, {
      width: '400px',
      // You can add more configuration options here
    });
  }
}
