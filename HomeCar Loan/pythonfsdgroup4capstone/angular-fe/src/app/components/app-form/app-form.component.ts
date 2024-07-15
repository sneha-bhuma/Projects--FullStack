import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanApplicationFormService } from '../../services/loan-application-form.service';
import { RegisterService } from '../../services/register.service';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-app-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.css']
})
export class AppFormComponent implements OnInit {

  personalDetailsForm: FormGroup;
  financialDetailsForm: FormGroup;
  loanDetailsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loanappService: LoanApplicationFormService,
    private regService: RegisterService,
    private toastr: ToastrService
  ) {
    //defining as separate group for mat stepper multi tabs
    this.personalDetailsForm = this.fb.group({
      name: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      gender: ['', Validators.required],
      marital_status: [''],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile_number: ['', Validators.required],
      occupation: ['', Validators.required]
    });

    this.financialDetailsForm = this.fb.group({
      monthly_income: ['', Validators.required],
      bank_account_details: ['', Validators.required]
    });

    this.loanDetailsForm = this.fb.group({
      loan_amount: ['', Validators.required],
      tenure: ['', Validators.required],
      loan_type: ['']
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  //Auto Populate logic for user existing data
  loadUserData() {
    const email = localStorage.getItem('email');
    console.log("local storage email", email);

    if (email) {
      this.loanappService.getUserByEmail(email).then(userResponse => {
        if (userResponse) {
          this.personalDetailsForm.patchValue({
            name: userResponse.name,
            email: userResponse.email,
            mobile_number: userResponse.mobile_number,
            user_type: userResponse.user_type,
            // Other fields if necessary
          });
        }
      }).catch(error => {
        console.error('Error fetching user data:', error);
        this.toastr.error('Error fetching user data');
      });
    } else {
      console.warn('No email found in local storage');
    }
  }

//on submit button click validate the data and updating,posting into the backend api's
  onSubmit() {
    if (this.personalDetailsForm.valid && this.financialDetailsForm.valid && this.loanDetailsForm.valid) {
      const personalDetails = this.personalDetailsForm.value;
      const financialDetails = this.financialDetailsForm.value;
      const loanDetails = this.loanDetailsForm.value;

      console.log(personalDetails, financialDetails, loanDetails);
      
      const userProfileData = {
        date_of_birth: this.formatDateToYyyyMmDd(personalDetails.date_of_birth),
        gender: personalDetails.gender,
        marital_status: personalDetails.marital_status,
        address: personalDetails.address,
        occupation: personalDetails.occupation,
        monthly_income: Number(financialDetails.monthly_income),
        bank_account_details: financialDetails.bank_account_details
      };

      console.log("userProfileData", userProfileData);


      this.loanappService.getUserByEmail(personalDetails.email)
        .then(userResponse => {
          const userId = userResponse.id;
          return this.loanappService.updateUserProfile(userId, userProfileData)
            .then(() => {
              const loanData = {
                customer_id: userId,
                loan_type: loanDetails.loan_type,
                loan_amount: Number(loanDetails.loan_amount),
                tenure: Number(loanDetails.tenure),
                status: 'pending'
              };

              console.log("loanData", loanData);

              return this.loanappService.submitLoanApplication(loanData);
            });
        })
        .then(loanResponse => {
          this.toastr.success('Application submitted successfully', 'Success');
        })
        .catch(error => {
          this.toastr.error('Error during application submission', 'Error');
        });
    }
    else {
      this.toastr.error('Please fill all required fields', 'Error');
    }
  }


  //Change  date format to backend compatible format(yyyy-MM-dd)
  private formatDateToYyyyMmDd(date: string | Date | null | undefined): string {
    if (!date) return '';
    if (typeof date === 'string') {
      const parsedDate = new Date(date);
      return formatDate(parsedDate, 'yyyy-MM-dd', 'en-US');
    }
    if (date instanceof Date) {
      return formatDate(date, 'yyyy-MM-dd', 'en-US');
    }
    return '';
  }
}
