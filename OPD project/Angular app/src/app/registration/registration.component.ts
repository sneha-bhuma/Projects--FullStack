import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { Patient } from '../Models/patient';
import { ToastrService } from 'ngx-toastr';
import { SharingService } from '../sharing.service';
import { ProfileService } from '../profile.service';
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  constructor(private fb: FormBuilder,
    private registerService: RegistrationService,
    private toastr: ToastrService,
    private sharingService: SharingService,
    private profileService: ProfileService,
    private router: Router) { }

  registrationForm = this.fb.group({
    patient_name: [{ value: '', disabled: true }, Validators.required],
    dob: ['', Validators.required],
    sex: ['', Validators.required],
    height: ['', Validators.required],
    weight: ['', Validators.required],
    maritalStatus: ['', Validators.required],
    phone: ['', Validators.required],
    email: [{ value: '', disabled: true }, Validators.required],
    allergies: ['', Validators.required],
    medications: ['', Validators.required],
    address1: ['', Validators.required],
    address2: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zipcode: ['', Validators.required],
    emg_contact_name: ['', Validators.required],
    emg_contact_phone: ['', Validators.required]
  });

  user: any;
  maxDate: Date | undefined;

  ngOnInit(): void {
    if(this.sharingService.isLoggedIn){
      this.maxDate = new Date();
      this.sharingService.currentData.subscribe(data => {
        if (data) {
          let user_email = data;
          // console.log(user_email);

          this.profileService.getUser().then((users) => {
            this.user = users.filter((usr: any) => usr.email === user_email)[0];

            this.registrationForm.controls['patient_name'].enable();
            this.registrationForm.controls['email'].enable();

            this.registrationForm.patchValue({
              patient_name: this.user.name,
              email: this.user.email
            });
            this.registrationForm.controls['patient_name'].disable();
            this.registrationForm.controls['email'].disable();
          });
        }
      });
    }else{
      alert("Please Login")
      this.router.navigate(['/profile'])
    }
  }

  onSubmit(): void {
    let patient_name = this.user.name || "";
    let dob = this.registrationForm.value.dob || "";
    let sex = this.registrationForm.value.sex || "";
    let height = Number(this.registrationForm.value.height) || 0;
    let weight = Number(this.registrationForm.value.weight) || 0;
    let marital_status = this.registrationForm.value.maritalStatus || "";
    let phone = this.registrationForm.value.phone || "";
    let email = this.user.email || "";
    let allergies = this.registrationForm.value.allergies || "";
    let medications = this.registrationForm.value.medications || "";
    let address1 = this.registrationForm.value.address1 || "";
    let address2 = this.registrationForm.value.address2 || "";
    let city = this.registrationForm.value.city || "";
    let state = this.registrationForm.value.state || "";
    let zipcode = this.registrationForm.value.zipcode || "";
    let emg_contact_name = this.registrationForm.value.emg_contact_name || "";
    let emg_contact_phone = this.registrationForm.value.emg_contact_phone || "";


    if (this.registrationForm.valid) {
      this.register(new Patient(
        patient_name,
        dob,
        sex,
        height,
        weight,
        marital_status,
        phone,
        email,
        allergies,
        medications,
        address1,
        address2,
        city,
        state,
        zipcode,
        emg_contact_name,
        emg_contact_phone));
    } else {
      alert("All the fields are mandatory")
    }
  }

  register(patient: Patient) {
    this.registerService.register(patient).then(
      (res) => {
        console.log(res);
        alert(`Registration Successful. Patiend ID : ${res.slice(1, 7)}`)
        this.sharingService.patient_id = res.slice(1, 7);
        this.sharingService.patient_name = this.user.name;
        this.router.navigate(['/patientnav']);
      }).catch((err) => {
        console.log(err);
        alert(`Error while registration of Patient ${err}`);
      });
  }

  currentPage = 1;
  
  nextPage() {
    if (this.currentPage < 5) {
      this.currentPage++;
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  isCurrentPageValid(): boolean {
    switch (this.currentPage) {
      case 1:
        return this.registrationForm.controls.dob.valid &&
               this.registrationForm.controls.sex.valid &&
               this.registrationForm.controls.height.valid &&
               this.registrationForm.controls.weight.valid &&
               this.registrationForm.controls.maritalStatus.valid;
      case 2:
        return this.registrationForm.controls.phone.valid;
        
      case 3:
        return this.registrationForm.controls.allergies.valid &&
               this.registrationForm.controls.medications.valid;
      case 4:
        return this.registrationForm.controls.address1.valid &&
               this.registrationForm.controls.address2.valid &&
               this.registrationForm.controls.city.valid &&
               this.registrationForm.controls.state.valid &&
               this.registrationForm.controls.zipcode.valid;
      case 5:
        return this.registrationForm.controls.emg_contact_name.valid &&
               this.registrationForm.controls.emg_contact_phone.valid;
      default:
        return false;
    }
  }
  
}
