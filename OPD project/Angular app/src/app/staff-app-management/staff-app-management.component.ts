import { Component } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { DoctorService } from '../doctor.service';
import { RegistrationService } from '../registration.service';
import { Patient } from '../Models/patient';
import { Appointment } from '../Models/appointment';
import { Doctor } from '../Models/doctor';
import { App } from '../Models/app';
import { ActivatedRoute, Router } from '@angular/router';
import { SharingService } from '../sharing.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-staff-app-management',
  templateUrl: './staff-app-management.component.html',
  styleUrls: ['./staff-app-management.component.css']
})
export class StaffAppManagementComponent {
  patlist?: Patient;
  applist?: Appointment;
  doclist?: Doctor;
  patname: { [id: string]: string } = {};
  docname: { [id: string]: string } = {};
  doctors: any;
  patients: any;
  appointments: any;
  error: string = '';
  counter: number = 0;
  app?: App;
  constructor(private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private patientService: RegistrationService,
    private route: ActivatedRoute,
    private sharingService: SharingService,
    private router: Router,
    private toastr:ToastrService) { }

  ngOnInit() {
    if(this.sharingService.isLoggedIn){
      this.getAppointmentFromService();
      const routeParams = this.route.snapshot.paramMap;
      const idFromRoute = routeParams.get('Id') || "";
      console.log(idFromRoute);
    }else{
      alert("Please Login")
      this.router.navigate(['/staffprofile'])
    }

  }
  getAppointmentFromService() {
    this.appointmentService.get_appointments().then((data) => {
      this.appointments = data;
      console.log("apps=", this.appointments);
      for (let app of this.appointments) {
        console.log("value=", app['patient_id']);
        console.log("us['doctor_id']=", app['doctor_id']);
        this.getPatientById(app['patient_id'])
        this.getDoctorById(app['doctor_id'])
      }
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
      this.patname[id] = data.patient_name;
      console.log("patname=", this.patname);
    });
  }
  getDoctorById(id: string) {
    this.doctorService.get_doctor_by_id(id).then((data) => {
      console.log(data);
      this.doclist = data;
      console.log("doclist=", this.doclist);
      this.docname[id] = data.doctor_name;
      // this.docname=this.doclist?.['doctor_name']
      console.log("docname=", this.docname);
    });
  }
  deleteAppointment(id: string, index: number) {
    if (this.appointments) {
      this.appointmentService.cancelAppointment(id);
      this.appointments.splice(index, 1); // Update the local array to reflect the removal
      this.toastr.error("Deleted appointment successfully")
      this.counter -= 1;
    }
  }
  changeStatus(app: App) {
    if (app.status != "Approved") {
      app.status = "Approved";
      this.toastr.success("Appointment has been approved successfully")
      console.log(app.status);
      this.counter = this.counter + 1;
      console.log(this.counter);
      //  var element = document.getElementById('name'); // Assuming emp.id is the ID of the element you want to mark
      //  element.classList.add("marked");  
    }
  }
  getAppointmentstById(id: string, index: number) {
    this.appointmentService.get_appointments_by_id(id).then((data) => {
      console.log(data);
      this.applist = data;
      console.log("applist=", this.applist);
    });
    this.deleteAppointment(id, index);
  }

}
