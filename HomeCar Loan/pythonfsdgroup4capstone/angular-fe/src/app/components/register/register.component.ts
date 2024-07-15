import { Component } from '@angular/core';
import { RegisterService } from '../../services/register.service';
// import { Reg } from '../Models/register';
import { Reg } from '../../Models/register';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  

  constructor(private regService:RegisterService,private fb: FormBuilder,private toastr: ToastrService){
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['',  [Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
      ]],
      mobile_number: ['', [Validators.required, Validators.pattern('^[7-9][0-9]{9}$')]],
      user_type: ['', Validators.required],
     
    }
     
    );
  }

  

  onSubmit() {
    
    if (this.registerForm.valid) {
    const formValues = this.registerForm.value;
    let name= formValues.name || "";
    let email= formValues.email || " ";
    let password= formValues.password || " ";
    let mobile_number=formValues.mobile_number || " ";
    let user_type= formValues.user_type || " ";

    let date_of_birth = "yyyy-mm-dd";
    let gender ="";
    let marital_status = "";
    let address = "";
    let occupation = "";
    let monthly_income = 0; 
    let bank_account_details = "";
    
   
    this.addRegsToService(formValues);

    // console.log(name,email,mobile_number,date_of_birth, gender, marital_status,address,occupation, monthly_income, bank_account_details,user_type,password)
    console.log(formValues);
    
      
    // this.addRegsToService(new Reg(name,email,password,mobile_number,user_type,date_of_birth, gender, marital_status,address,occupation, monthly_income, bank_account_details
      
    // ));

    }
   
  }  

  // addRegsToService(r:Reg){
  //   //calling addRegs() from register service
  //   this.regService.addRegs(r)
  //   alert("success")
 
  // }
  async addRegsToService(r: Reg) {
    try {
      const result = await this.regService.addRegs(r);
      this.toastr.success('Registration successful', 'Success');
      console.log("Registration successful", result);
    } catch (error) {
      this.toastr.error('Error during registration', 'Error');
      console.error("Error during registration", error);
    }
    
    
  }
  }

  

