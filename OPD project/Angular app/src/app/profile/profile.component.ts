import { Component } from '@angular/core';
import { ProfileService } from '../profile.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Superuser } from '../Models/sup'
import { SharingService } from '../sharing.service';
import { RegistrationService } from '../registration.service';
import { Patient } from '../Models/patient';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  list: any[] = [];
  token: any = '';
  start: boolean = false;
  feed: any[] = [];
  super: any;
  navigate: boolean = false;

  loginForm = this.formBuilder.group({
    userid: ['', Validators.required],
    passwd: ['', Validators.required],
  });

  constructor(private loginService: ProfileService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private sharingService: SharingService,
    private registrationService : RegistrationService ) { }

  // ngOnInit() {
  //   this.login('sne@gmail.com', 'sne');
  // }

  // pass form data to login function on submit event
  onSubmit() {
    this.login(String(this.loginForm.value.userid), String(this.loginForm.value.passwd))
  }

  fetchProfile() {
    this.token = localStorage.getItem('token');
    // console.log("token=",this.token);
    if (this.token === "undefined") {
      this.toastr.error("Invalid user or password entered. Please try again with the correct credentials");
    }
    else {
      this.loginService.fetchProfile(this.token).then(async (data) => {
        console.log(data);
        this.list = data;
        // console.log("list=",this.list);
        for (let us of this.list) {
          // console.log("value=",us['is_superuser']);
          // console.log("us['email']=",us['email']);
          // console.log("mail=",this.loginForm.value.userid);

          if (us['email'] === this.loginForm.value.userid) {
            // console.log("entering");
            if (us['is_superuser'] === false) {
              let isRegistered = await this.checkRegistration(this.loginForm.value.userid!);
              this.sharingService.doLogin();
              alert('Login Successful!');
              this.toastr.success("Login Successful!")
              if(isRegistered){
                this.navigate = true
                //  console.log("navigate=",this.navigate);
                await this.registrationService.getPatientByEmail(this.loginForm.value.userid!).then(
                  (patient) => {
                    this.sharingService.patient_id = patient.patient_id
                    this.sharingService.patient_name = patient.patient_name
                  }
                );
                this.router.navigate(['/patientnav']);
              } else{
                this.navigate = true
                //  console.log("navigate=",this.navigate);
                this.router.navigate(['/registrationform']);
                this.sendData();
              }
            }
          }
        }
      });
    }
  }
  // create a method to handle fetchToken method and store the token
  login(name: string, password: string) {
    this.loginService
      .fetchToken(name, password)
      .then((data) => {
        console.log("tok=", data);
        localStorage.setItem('token', data.token);
      })
      .then(() => this.fetchProfile());
  }
  getUserById(name: string) {
    this.loginService.getUserById(name).then((data) => {
      console.log(data);
      this.super = data;
      console.log("super=", this.super);
    });
  }

  navscreen() {
    this.router.navigate(['/patientsignup'])
  }

  sendData() {
    const data = this.loginForm.value.userid;
    this.sharingService.changeData(data);
  }

  async checkRegistration(email : string){
    let res = await this.registrationService.getPatientByEmail(email)
        if(res){
          return true
        } else return false
      }

  }  

