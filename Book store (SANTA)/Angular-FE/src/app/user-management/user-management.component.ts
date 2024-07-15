import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit{
  flag : boolean = false;
  users: User[] = [];
  registerForm = this.fb.group({
    id : [''],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    role: ['', Validators.required]
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
      let id = Number(this.registerForm.value.id);
      let name = this.registerForm.value.name || '';
      let email = this.registerForm.value.email || '';
      let password = this.registerForm.value.password || '';
      let role = this.registerForm.value.role || '';
      for ( let User of this.users){
        if (User.email.toLowerCase() === email.toLowerCase()) {
          this.flag = true;
        }
      }
      if (this.flag == true) {
        this.toastr.error('User already exists!');     
      } else {
      console.log(name, email, password, role);
      this.addUser(new User(id, name, email, password, role));
      this.toastr.success('Registration Successful!');
      this.registerForm.reset();
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
  deleteUser(user: User) {
      this.profileService.deleteUser(user.id)
      .then(()=> 
        {this.getUserFromService()});
      this.toastr.success('user deleted successfully!');
    }
 
    //this.profileService.deleteUser(user.id)
    //   .then(() => {
    //     const index = this.users.indexOf(user);
    //     if (index !== -1) {
    //       this.users.splice(index, 1);
    //       this.toastr.success('user deleted successfully!');
    //     }        
    //     else {        
    //       this.toastr.error('Error deleting user.');
    //     }
    //   })      
    }