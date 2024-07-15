import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from '../Models/user';

@Component({
  selector: 'app-patientsignup',
  templateUrl: './patientsignup.component.html',
  styleUrls: ['./patientsignup.component.css']
})
export class PatientsignupComponent {
  list:any[]=[];
  token: any = '';
  start:boolean=false;
  feed:any[]=[];
  user:any;
  error:string='';
  
  signupForm = this.formBuilder.group({
    userid: ['', Validators.required],
    username:['', Validators.required],
    passwd: ['', Validators.required],
  });

  constructor(private toastr: ToastrService,
              private router: Router,
              private formBuilder:FormBuilder,
              private loginService: ProfileService,) {}

  // ngOnInit() {
  //   this.login('sne@gmail.com', 'sne');
  // }
   onSubmit(){
    let email=this.signupForm.value.userid ||'';
    let name=this.signupForm.value.username ||'';
    let password=this.signupForm.value.passwd ||'';
    // console.log(email,name,password);
    this.addUser( new User(email,name,password));
    this.router.navigate(['/profile'])  
    this.signupForm.reset();  
  }
  addUser(user:User){
    this.loginService.addUser(user)
    .then(() =>{
      // this.getUserFromService();
      alert("User account created successfully. Please Login.")
    });
  }
  getUserFromService() {
    this.loginService.getUser().then((data) => {
      console.log(data);
      this.user = data; 
      this.start =false;     
    })
    .catch((err) =>{
        console.log(err)
        this.error="Unable to fetch data, check whether server is running or not";
    });
   }
}
