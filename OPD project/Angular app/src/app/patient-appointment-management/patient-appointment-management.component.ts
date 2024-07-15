import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { DoctorService } from '../doctor.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { SharingService } from '../sharing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-appointment-management',
  templateUrl: './patient-appointment-management.component.html',
  styleUrls: ['./patient-appointment-management.component.css']
})
export class PatientAppointmentManagementComponent {
  appointments: any;
  error: string = '';
  appointmentId!: string
  patient_id: string = '';
  today: Date | undefined;
  maxDate: Date | undefined;


  constructor(private appointmentService: AppointmentService,
    private toastr: ToastrService,
    private doctorService: DoctorService,
    private formBuilder: FormBuilder,
    private sharingService: SharingService,
    private router: Router) { }

  rescheduleForm = this.formBuilder.group({
    appointmentId: [''],
    newDate: [],
    newTime: [''],
  })

  ngOnInit(): void {
    this.today = new Date();
    this.maxDate = new Date(this.today.getFullYear(), this.today.getMonth() + 1, this.today.getDate());
    this.patient_id = this.sharingService.patient_id;
    this.appointments = this.get_appointments(this.patient_id);
  }

  async get_appointments(patient_id: string) {
    if(this.sharingService.isLoggedIn){
      try {
        const data = await this.appointmentService.get_appointments_by_id(patient_id);
        let appointmentsWithDoctorNames = await Promise.all(data.map(async (appointment: any) => {
          const doctor = await this.get_doctor_by_id(appointment.doctor_id);
          return { ...appointment, doctor_name: doctor.doctor_name };
        }));
        this.appointments = appointmentsWithDoctorNames;
        // console.log(this.appointments);

      } catch (err) {
        console.log(err);
        this.error = 'ERROR while fetching appointments';
        console.log(this.error);
      }
    }else{
      alert("Page refreshed, Please login to view your appointments")
      this.router.navigate(['/profile'])
    }
  }

  get_doctor_by_id(doctor_id: string) {
    return this.doctorService.get_doctor_by_id(doctor_id)
      .then((doctor) => {
        return doctor
      }).catch((error) => {
        console.error('Some error occurred:', error);
      });
  }

  cancelAppointment() {
    this.appointmentService.cancelAppointment(this.appointmentId).then((res) => {
      alert(res);
      this.get_appointments(this.patient_id);
    }).catch((error) => {
      console.log(error);
    });
  }

  rescheduleAppointment() {
    if (this.rescheduleForm.valid) {
      let appointment_id = this.rescheduleForm.value.appointmentId || "";
      let appointment_date = this.rescheduleForm.value.newDate;
      let slot = this.rescheduleForm.value.newTime || "";

      this.appointmentService.rescheduleAppointment(appointment_id, appointment_date!, slot)
        .then((res) => {
          alert(res);
          this.get_appointments(this.patient_id);
        }).catch((error) => {
          console.log(error);
        });
    } else {
      alert("All the fields are required fro rescheduling the appointment.")
    }
  }
}
