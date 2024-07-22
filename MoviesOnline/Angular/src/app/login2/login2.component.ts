import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SharingService } from '../sharing.service';
import { LoginservService } from '../loginserv.service';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrl: './login2.component.css'
})

export class Login2Component {

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private sharingService:SharingService,
    private loginserv:LoginservService
  ) {}
  
loginForm = this.formBuilder.group({
    userid: ['', Validators.required],
    passwd: ['', Validators.required],
  });

  onSubmit() {
    let uid = this.loginForm.value.userid;
    let pwd = this.loginForm.value.passwd;

    if (uid == 'admin' && pwd == 'admin') {       
      
      this.sharingService.doAdminLogin();
      this.router.navigate(['/movie']);
      this.toastr.success('Login Successful! admin');

    } else if (uid == 'user' && pwd == 'user'){      
       
      this.sharingService.doLogin();
      this.router.navigate(['/movie']);
      this.toastr.success('Login Successful user!');
    }else {

      this.sharingService.isLoggedIn = false;
      this.toastr.error('Invalid Credentials!');
    }

    this.loginForm.reset();

    // console.log(this.loginForm.status);
  }


  list: any[] = [];
  token: any = '';
  start: boolean = false;
  feed: any[] = [];
  super: any;
  navigate: boolean = false;
  loggin: boolean = false;
   

  
  // ngOnInit() {
  //   this.login('sne@gmail.com', 'sne');
  // }
onSubmit1() {
    this.login(
      String(this.loginForm.value.userid),
      String(this.loginForm.value.passwd)
    );
}


    // create a method to handle fetchToken method and store the token
login(name: string, password: string) {
      this.loginserv
        .fetchToken(name, password)
        .then((data: { token: string }) => {
          console.log('tok=', data);
          localStorage.setItem('token', data.token);
        })
        .then(() => this.fetchProfile());
}


  // pass form data to login function on submit event
fetchProfile() {

    this.token = localStorage.getItem('token');
    console.log('token=', this.token);

    if (this.token === 'undefined') {
        console.log('provided invalid user or password');
    } else {

              this.loginserv.fetchProfile(this.token).then((data) => {
              console.log(data);
              this.list = data;
              console.log('list=', this.list);

              for (let us of this.list) {
                  if (us['email'] === this.loginForm.value.userid) {
                    console.log('entering',us);
                    this.sharingService.doAdminLogin();
                    this.toastr.success('Login Successful');
                    // this.router.navigate(['/movie-user']);
                    this.loggin=true
                    this.router.navigate(['/movie']);
                  }
                  if (this.loggin = false) {
                    this.toastr.error('Invalid Credentials!');
                }
              }
              });
            }
          }
    


getUserById(name: string) {
    this.loginserv.getUserById(name).then((data) => {
      console.log(data);
      this.super = data;
      console.log('super=', this.super);
    });
}



}
