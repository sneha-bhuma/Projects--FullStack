import { Component } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { RegistrationService } from '../registration.service';
import { AppointmentService } from '../appointment.service';
import { Patient } from '../Models/patient';
import { Appointment } from '../Models/appointment';
import { Doctor } from '../Models/doctor';
import { ActivatedRoute, Router } from '@angular/router';
import { SharingService } from '../sharing.service';

@Component({
  selector: 'app-staff-startpage',
  templateUrl: './staff-startpage.component.html',
  styleUrls: ['./staff-startpage.component.css']
})
export class StaffStartpageComponent {
  patlist?: Patient;
  applist?: Appointment;
  doclist?: Doctor;
  // patname:any;
  patname: { [id: string]: string } = {};
  // docname:any;
  docname: { [id: string]: string } = {};
  doctors: any;
  patients: any;
  appointments: any;
  error: string = '';
  start: boolean = true;
  doctorCount: number = 0;
  patientCount: number = 0;
  appointmentsCount: number = 0;

  constructor(private doctorService: DoctorService,
    private patientService: RegistrationService,
    private appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private sharingService: SharingService,
    private router: Router) { }

  ngOnInit() {
    if(this.sharingService.isLoggedIn){
      this.getDoctorFromService();
      this.getPatientFromService();
      this.getAppointmentFromService();
      const routeParams = this.route.snapshot.paramMap;
      const idFromRoute = routeParams.get('Id') || "";
      console.log(idFromRoute);
      this.getAppointmentstById(idFromRoute);
    }else{
      alert("Please Login")
      this.router.navigate(['/staffprofile'])
    }
  }

  getDoctorFromService() {
    this.doctorService.get_doctors().then((data) => {
      console.log(data);
      this.doctors = data;
      console.log("doctors=", this.doctors);
      this.countOfDoctors()
      this.start = false;
    })
      .catch((err) => {
        console.log(err)
        this.error = "Unable to fetch data, check whether server is running or not";
      });
  }

  getPatientFromService() {
    this.patientService.get_patients().then((data) => {
      console.log(data);
      this.patients = data;
      console.log("patients=", this.patients);
      this.countOfPatients()
      this.start = false;
    })
      .catch((err) => {
        console.log(err)
        this.error = "Unable to fetch data, check whether server is running or not";
      });
  }

  getAppointmentFromService() {
    this.appointmentService.get_appointments().then((data) => {
      this.appointments = data;
      console.log("apps=", this.appointments);
      this.countOfAppointments()
      for (let app of this.appointments) {
        console.log("value=", app['patient_id']);
        console.log("us['doctor_id']=", app['doctor_id']);
        this.getPatientById(app['patient_id'])
        this.getDoctorById(app['doctor_id'])
      }
      this.start = false;
    })
      .catch((err) => {
        console.log(err)
        this.error = "Unable to fetch data, check whether server is running or not";
      });
  }

  countOfDoctors() {
    for (let each of this.doctors) {
      this.doctorCount += 1
    }
  }

  countOfPatients() {
    for (let each of this.patients) {
      this.patientCount += 1
    }
  }

  countOfAppointments() {
    for (let each of this.appointments) {
      this.appointmentsCount += 1
    }
  }

  getAppointmentstById(id: string) {
    this.appointmentService.get_appointments_by_id(id).then((data) => {
      console.log(data);
      this.applist = data;
      console.log("applist=", this.applist);
    });
  }

  getPatientById(id: string) {
    this.patientService.getPatientById(id).then((data) => {
      console.log(data);
      this.patlist = data;
      console.log("patlist=", this.patlist);
      this.patname[id] = data.patient_name;
      // this.patname=this.patlist?.['patient_name']
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
}
