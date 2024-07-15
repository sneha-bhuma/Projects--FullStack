import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../profile.service';
import { SharingService } from '../sharing.service';

@Component({
  selector: 'app-staffprofile',
  templateUrl: './staffprofile.component.html',
  styleUrls: ['./staffprofile.component.css']
})
export class StaffprofileComponent {
  list:any[]=[];
  token: any = '';
  start:boolean=false;
  feed:any[]=[];
  super:any;
  navigate:boolean=false;
  
  loginForm = this.formBuilder.group({
    userid: ['', Validators.required],
    passwd: ['', Validators.required],
  });

  constructor(private loginService: ProfileService,
              private sharingService: SharingService,
              private formBuilder:FormBuilder,
              private toastr: ToastrService,
              private router: Router,) {}

  // ngOnInit() {
  //   this.login('sne@gmail.com', 'sne');
  // }
   onSubmit(){
    this.login(String(this.loginForm.value.userid), String(this.loginForm.value.passwd))   
    
   }
  // pass form data to login function on submit event

  fetchProfile() {
    this.token = localStorage.getItem('token');
    console.log("token=",this.token);
    if(this.token==="undefined"){
      alert("Invalid user or password");
    }
    else{   
    this.loginService.fetchProfile(this.token).then((data) => {
      console.log(data);
      this.list=data;
      console.log("list=",this.list);
      for(let us of this.list){
              console.log("value=",us['is_superuser']);
              console.log("us['email']=",us['email']);
              console.log("mail=",this.loginForm.value.userid);
              
              
              if(us['email']===this.loginForm.value.userid){
                console.log("entering");
                
                 if(us['is_superuser']===true){                     
                  this.sharingService.doAdminLogin()
                  alert("Login successful")
                     this.router.navigate(['/staff-startpage'])
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
        console.log("tok=",data);
        localStorage.setItem('token', data.token);
      })
      .then(() => this.fetchProfile());
  }
  getUserById(name: string) {
    this.loginService.getUserById(name).then((data) => {
      console.log(data);
      this.super = data;
      console.log("super=",this.super);
    });
  }
  


}
