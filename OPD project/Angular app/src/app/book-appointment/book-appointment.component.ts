import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Appointment } from '../Models/appointment';
import { AppointmentService } from '../appointment.service';
import { DoctorService } from '../doctor.service';
import { SharingService } from '../sharing.service';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {
  today: Date | undefined;
  maxDate: Date | undefined;
  selectedSpeciality = '';
  app: any;
  error: string = "";
  doctors: any;

  patient_id!: string;
  patient_name!: string;

  specialties = [
    "Critical Care Medicine",
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Gastroenterology",
    "Hematology",
    "Immunology",
    "Nephrology",
    "Neurology",
    "Oncology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Pulmonology",
    "Rheumatology",
    "Urology",
    "None"
  ]

  appointmentForm = this.formBuilder.group({
    patient_id: [{ value: this.sharingService.patient_id, disabled: true }],
    patient_name: [{ value: this.sharingService.patient_name, disabled: true }],
    speciality: ['', Validators.required],
    doctor_id: ['', Validators.required],
    appointment_date: [Validators.required],
    slot: ['', Validators.required],
    problem_description: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private sharingService: SharingService,
    private registerService: RegistrationService,
    private router: Router) {

  }

  ngOnInit(): void {
    if(this.sharingService.isLoggedIn){
      this.today = new Date();
      this.maxDate = new Date(this.today.getFullYear(), this.today.getMonth() + 1, this.today.getDate());
      this.get_doctors();
    }else{
      alert("Please Login")
      this.router.navigate(['/profile'])
    }
  }

  get_doctors() {
    this.doctorService.get_doctors().then(
      (data) => {
        this.doctors = data
      }).catch((err) => {
        console.log(err);
        this.error = 'ERROR while fetching Doctors';
        console.log(this.error);
      });
  }

  updateDoctors(event: any) {
    this.selectedSpeciality = event.target.value;
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      let patient_id = this.sharingService.patient_id;
      let patient_name = this.sharingService.patient_name;
      let speciality = this.appointmentForm.value.speciality || "";
      let doctor_id = this.appointmentForm.value.doctor_id || "";
      let appointment_date = this.appointmentForm.value.appointment_date;
      let slot = this.appointmentForm.value.slot || '';
      let problem_description = this.appointmentForm.value.problem_description || "";

      // console.log("Patient ID : ", patient_id, "Patient Name : ", patient_name, "Speciality : ", speciality, "Doctor Id : ", doctor_id, "Appointment Date : ", appointment_date, "Slot : ", slot, "Problem Description : ", problem_description);
      this.addAppointment(new Appointment(patient_id, patient_name, speciality, doctor_id, appointment_date!, slot, problem_description));
      this.appointmentForm.reset();
    } else {
      alert("All the fields are mandatory")
    }
  }

  addAppointment(appointment: Appointment) {
    this.appointmentService.book_appointment(appointment).then(
      (res) => {
        alert(res);
        this.toastr.success("Booked appointment successfully")
      }).catch((err) => {
        console.log(err);
        alert(err);
      });
  }

}
