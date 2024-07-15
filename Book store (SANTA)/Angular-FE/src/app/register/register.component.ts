import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // Corrected property name
})
export class RegisterComponent implements OnInit {
  users: User[] = [];
  flag : boolean = false;
 
  registerForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
 
  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}
 
  ngOnInit() {
    this.getUserFromService();
  }
 
  // Fetch all users
  getUserFromService() {
    this.profileService.getUser().then((data) => {
      console.log(data);
      this.users = data;
    });
  }
 
  onSubmit() {
    if (this.registerForm.valid) {
      let id = Number(this.registerForm.value);
      let name = this.registerForm.value.name || '';
      let email = this.registerForm.value.email || '';
      let password = this.registerForm.value.password || '';
      let role = 'user';
      for ( let u of this.users){
        if (u.email.toLowerCase() === email.toLowerCase()) {
          this.flag === true;
        }
      }
      if (this.flag === true) {
        this.toastr.error('User already exists!');     
      } else {
        console.log(name, email, password, role);
        this.addUser(new User(id, name, email, password, role));
        this.toastr.success('Registration Successful as user!');
        this.router.navigate(['/login']);        
      }    
 
    } else {
      this.toastr.error('Please fill out all the details.');
    }
  }
 
  addUser(user: User) {
    this.profileService.addUser(user).then(() => {
      this.getUserFromService();
    });
  }
 
}