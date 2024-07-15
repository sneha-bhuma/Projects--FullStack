import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { StartpageComponent } from './startpage/startpage.component';
import { PatientnavComponent } from './patientnav/patientnav.component';
import { PatientloginComponent } from './patientlogin/patientlogin.component';
import { PatientsignupComponent } from './patientsignup/patientsignup.component';
import { StaffprofileComponent } from './staffprofile/staffprofile.component';
import { StaffStartpageComponent } from './staff-startpage/staff-startpage.component';
import { RegistrationComponent } from './registration/registration.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { PatientAppointmentManagementComponent } from './patient-appointment-management/patient-appointment-management.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { PatientRegManagementComponent } from './patient-reg-management/patient-reg-management.component';
import { StaffAppManagementComponent } from './staff-app-management/staff-app-management.component';
import { DocnavComponent } from './docnav/docnav.component';
import { LogoutComponent } from './logout/logout.component';
import { FeedbackComponent } from './feedback/feedback.component';

const routes: Routes = [
  {path:"profile",component:ProfileComponent},
  {path:"profilelist",component:ProfileListComponent},
  {path:"",component:FrontpageComponent},
  {path:"startpage",component:StartpageComponent},
  {path:"patientnav",component:PatientnavComponent},
  {path:"patientlogin",component:PatientloginComponent},
  {path:"patientsignup",component:PatientsignupComponent},
  {path:"staffprofile",component:StaffprofileComponent},
  {path:"staff-startpage",component:StaffStartpageComponent},
  {path:"registrationform",component:RegistrationComponent},
  {path:"book-appointment",component:BookAppointmentComponent},
  {path:"patient-appointment-management",component:PatientAppointmentManagementComponent},
  {path:"doctor-dashboard",component:DoctorDashboardComponent},
  {path:"patientregmanagement",component:PatientRegManagementComponent},
  {path:"staffappmanagement",component:StaffAppManagementComponent},
  {path:"docnav",component:DocnavComponent},
  {path:"logout",component:LogoutComponent},
  {path:"feedback",component:FeedbackComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
