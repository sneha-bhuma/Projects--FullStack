import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SharingService } from '../sharing.service';
import { ProfileService } from '../profile.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Corrected property name to styleUrls
})
export class LoginComponent {
  user: any;
  start: boolean = true;
  loggin: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private sharingService: SharingService,
    private profileService: ProfileService
  ) {}
  ngOnInit(): void {
    this.getuserdetails();
  }
  
  getuserdetails() {
    this.profileService
        .getUser().then((data) => {this.user = data; this.start=false})
              .catch((err) => {this.toastr.error('No Reviews Available');
        });
      
    }

  loginForm = this.formBuilder.group({
    userid: ['', Validators.required],
    passwd: ['', Validators.required],
  });
 
  onSubmit() {
    let uid = this.loginForm.value.userid;
    let pwd = this.loginForm.value.passwd;
    
    

    for (let user of this.user){
      if (uid == user.email && pwd == user.password) {
        if (user.role == 'admin' ) {
          this.sharingService.isLoggedIn = true;
          this.sharingService.isAdmin = true;
          this.sharingService.doAdminLogin(user.name);
          this.toastr.success('Admin Login Successful');
          this.loggin=true
          this.router.navigate(['/browse']);
        } else if (user.role == 'user') {
          this.sharingService.isLoggedIn = true;
          this.sharingService.doLogin(user.name);
          this.toastr.success('Login Successful');
          this.loggin=true
          this.router.navigate(['/browse']);
        }

        } 
      }
      if (this.loggin === false) {
          this.toastr.error('Invalid Credentials!');
          this.loginForm.reset()
      }
    }
}