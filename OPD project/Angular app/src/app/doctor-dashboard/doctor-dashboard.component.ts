import { Component } from '@angular/core';
import { Patient } from '../Models/patient';
import { Appointment } from '../Models/appointment';
import { Doctor } from '../Models/doctor';
import { DoctorService } from '../doctor.service';
import { RegistrationService } from '../registration.service';
import { AppointmentService } from '../appointment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharingService } from '../sharing.service';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent {
  patlist?: Patient;
  applist?: Appointment;
  doclist?: Doctor;
  patname: { [id: string]: string } = {};
  docname: { [id: string]: string } = {};
  doctors: any;
  patients: any;
  appointments: any[] = [];
  filteredAppointments: any[] = [];
  searchTerm: string = '';
  error: string = '';
  start: boolean = true;
  selected: any;
  pageSize: number = 8; // Maximum appointments per page
  currentPage: number = 1; // Current page index
  pagedAppointments: any[] = [];

  constructor(private doctorService: DoctorService,
    private patientService: RegistrationService,
    private appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private sharingService: SharingService,
    private router: Router) { }

  ngOnInit() {
    if (this.sharingService.isLoggedIn) {
      this.getDoctorFromService();
      this.getPatientFromService();
      this.getAppointmentFromService();
      const routeParams = this.route.snapshot.paramMap;
      const idFromRoute = routeParams.get('Id') || '';
      console.log(idFromRoute);
      this.getAppointmentstById(idFromRoute);
    } else {
      alert("Please Login")
      this.router.navigate(['/staffprofile'])
    }
  }

  getDoctorFromService() {
    this.doctorService.get_doctors().then((data) => {
      console.log(data);
      this.doctors = data;
      this.start = false;
    }).catch((err) => {
      console.log(err);
      this.error = "Unable to fetch data, check whether server is running or not";
    });
  }

  getPatientFromService() {
    this.patientService.get_patients().then((data) => {
      console.log(data);
      this.patients = data;
      this.start = false;
    }).catch((err) => {
      console.log(err);
      this.error = "Unable to fetch data, check whether server is running or not";
    });
  }

  getAppointmentFromService() {
    this.appointmentService.get_appointments().then((data) => {
      this.appointments = data;
      console.log("apps=", this.appointments);
      this.filteredAppointments = data; // Initialize filteredAppointments with all data
      this.mapAppointmentData(); // Map patient and doctor names
      this.start = false;
    }).catch((err) => {
      console.log(err);
      this.error = "Unable to fetch data, check whether server is running or not";
    });
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
      console.log("patname=", this.patname);
    });
  }

  getDoctorById(id: string) {
    this.doctorService.get_doctor_by_id(id).then((data) => {
      console.log(data);
      this.doclist = data;
      console.log("doclist=", this.doclist);
      this.docname[id] = data.doctor_name;
      console.log("docname=", this.docname);
    });
  }

  mapAppointmentData() {
    for (let app of this.appointments) {
      this.getPatientById(app['patient_id']);
      this.getDoctorById(app['doctor_id']);
    }
  }

  applyFilters() {
    if (this.selected) {
      this.filteredAppointments = this.appointments.filter(appointment =>
        appointment.appointment_id.substring(0, 6) === this.selected
      );
    } else {
      this.filteredAppointments = [...this.appointments]; // Reset to all appointments if no doctor selected
    }
    //this.updatePagedAppointments(); // Update pagedAppointments after filtering
  }

  search(): void {
    if (!this.searchTerm.trim()) {
      // If search term is empty, reset the filtered appointments
      this.filteredAppointments = [...this.appointments];
    } else {
      // Filter appointments based on search term
      this.filteredAppointments = this.appointments.filter(appointment =>
        this.patname[appointment.patient_id]?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    //this.updatePagedAppointments(); // Update pagedAppointments after searching
  }



  // updatePagedAppointments() {
  //   const startIndex = (this.currentPage - 1) * this.pageSize;
  //   this.pagedAppointments = this.filteredAppointments.slice(startIndex, startIndex + this.pageSize);
  // }
}
