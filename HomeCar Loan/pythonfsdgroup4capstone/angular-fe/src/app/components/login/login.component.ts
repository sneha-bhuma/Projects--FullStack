import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SharingService } from '../../services/sharing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  token: any = '';
  profileDet: any = [];
  userType: string | null = null;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private sharingService: SharingService
  ) { }

  loginForm = this.formBuilder.group({
    name: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit(): void {
    this.fetchAllProfiles(); // Fetch all profiles on component initialization
  }

  fetchAllProfiles() {
    this.loginService.fetchProfile(this.token).then((data) => {
      this.profileDet = data;
    }).catch(error => {
      console.error('Error fetching profiles:', error);
      // this.toastr.error('Error fetching profiles');
    });
  }

  Submit() {

    const enteredName = this.loginForm.value.name as string;
    const enteredPassword = this.loginForm.value.password as string;

    console.log(enteredName);
    console.log(enteredPassword);

    this.login(enteredName, enteredPassword);

  }

  login(name: string, password: string) {
    this.loginService.fetchToken(name, password).then((data) => {
      console.log(data);
      if (data.token === undefined) {
        console.log("Invalid credentials for getting token");
        this.toastr.error("Invalid credentials");
      } else {
        this.token = data.token;
        localStorage.setItem('token', data.token);// store token in local stoarge
        this.toastr.success('Logged in successfuly to PMSL Bank as token generated');
        console.log(name);

        this.checkUserType(name);
      }
    });
  }

  checkUserType(name: string) {
    console.log("profileDet", this.profileDet);
    console.log("name", name);


    const matchedUser = this.profileDet.find((profile: any) => profile.email === name);
    console.log("matchedUser", matchedUser);

    if (matchedUser) {
      this.userType = matchedUser.user_type;

      // Store user profile in sharing service
      //this.sharingService.setUserProfile(matchedUser);

      if (this.userType === 'approver') {
        console.log("approver logged:", matchedUser.name);
        this.sharingService.doAdminLogin();

        this.router.navigate(['/approver']);
        this.toastr.success('Approver logged in');

      } else if (this.userType === 'customer') {

        localStorage.setItem('email', name); // Store email in local storage for status componnet
        console.log("logged in userEmail", name);
        this.sharingService.doLogin();
        this.router.navigate(['/welcome']);
        console.log("customer logged:", matchedUser.name);
        this.toastr.success('Customer logged in');
      }
      // else {
      //   this.toastr.info('logged in successfuly to PMSL bank');
      // }
    } else {
      console.error('No matching user found');
      this.toastr.error('No matching user found');
    }
  }
}
