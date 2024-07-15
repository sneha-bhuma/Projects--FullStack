import { Component } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { RegistrationService } from '../registration.service';
import { AppointmentService } from '../appointment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Pat } from '../Models/pat'
import { patchPatient } from '../Models/patchpat';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharingService } from '../sharing.service';

@Component({
  selector: 'app-patient-reg-management',
  templateUrl: './patient-reg-management.component.html',
  styleUrls: ['./patient-reg-management.component.css']
})
export class PatientRegManagementComponent {
  patientForm!: FormGroup;
  patients: any;
  patlist?: Pat;
  selectedPatient: any = {};
  error: string = '';

  constructor(private doctorService: DoctorService,
    private patientService: RegistrationService,
    private appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private sharingService: SharingService) { }

  ngOnInit() {
    if(this.sharingService.isLoggedIn){
      this.getPatientFromService();
      const routeParams = this.route.snapshot.paramMap;
      const idFromRoute = routeParams.get('Id') || "";
      console.log(idFromRoute);
      this.getPatientById(idFromRoute);
      this.patientForm = this.fb.group({
        patient_name: [''],
        dob: [''],
        phone: [''],
        email: [''],
        allergies: [''],
        medications: ['']
      })
    }else{
      alert("Please Login")
      this.router.navigate(['/staffprofile'])
    }

  }
  onSubmit() {
    const updPatient = new patchPatient(
      this.patientForm.value.patient_name || '',
      this.patientForm.value.dob || '',
      this.patientForm.value.phone || '',
      this.patientForm.value.email || '',
      this.patientForm.value.allergies || '',
      this.patientForm.value.medications || ''
    );
    console.log("updPatient=", updPatient);

    this.updatePatient(updPatient);

  }
  getPatientFromService() {
    this.patientService.get_patients().then((data) => {
      console.log(data);
      this.patients = data;
      console.log("patients=", this.patients);


    })
      .catch((err) => {
        console.log(err)
        this.error = "Unable to fetch data, check whether server is running or not";
      });
  }
  getPatientById(id: string) {
    this.patientService.getPatientById(id).then((data) => {
      console.log(data);
      this.patlist = data;
      console.log("patlist=", this.patlist);
      if (this.patlist) {
        this.patientForm.patchValue({
          patient_name: this.patlist.patient_name,
          dob: this.patlist.dob,
          phone: this.patlist.phone,
          email: this.patlist.email,
          allergies: this.patlist.allergies,
          medications: this.patlist.medications,
        });
      }

    });
  }


  updatePatient(updPatient: patchPatient): void {
    console.log("updPatient=", updPatient);

    fetch(`http://127.0.0.1:8000/api/patients/${this.patlist?.patient_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updPatient)
    })
      .then((res) => {
        if (res.status === 400) {
          throw `Bad Request: The server could not understand the request due to invalid data ${updPatient}.`;
        } else {
          return res.json();
        }
      })
      .then((data) => {
        
        // alert('Patient updated successfully!');
        this.toastr.success("Patient details updated successfully")
        this.getPatientFromService(); // Refresh the patient list
        
        this.router.navigate(['/patientregmanagement'])
      })
      .catch((error) => {
        alert(`Some error occurred while updating the patient. ${error}`);
      });

  }


}
