import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ToastrModule } from 'ngx-toastr';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ProfileComponent } from './profile/profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { PatientnavComponent } from './patientnav/patientnav.component';
import { StartpageComponent } from './startpage/startpage.component';
import { PatientloginComponent } from './patientlogin/patientlogin.component';
import { PatientsignupComponent } from './patientsignup/patientsignup.component';
import { StaffprofileComponent } from './staffprofile/staffprofile.component';
import { StaffStartpageComponent } from './staff-startpage/staff-startpage.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { PatientAppointmentManagementComponent } from './patient-appointment-management/patient-appointment-management.component';
import { RegistrationComponent } from './registration/registration.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { StaffAppManagementComponent } from './staff-app-management/staff-app-management.component';
import { PatientRegManagementComponent } from './patient-reg-management/patient-reg-management.component';
import { DocnavComponent } from './docnav/docnav.component';
import { LogoutComponent } from './logout/logout.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FeedbackComponent } from './feedback/feedback.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    ProfileListComponent,
    PatientnavComponent,
    StartpageComponent,
    PatientloginComponent,
    RegistrationComponent,
    PatientAppointmentManagementComponent,
    BookAppointmentComponent,
    PatientsignupComponent,
    StaffprofileComponent,
    StaffStartpageComponent,
    DoctorDashboardComponent,
    FrontpageComponent,
    StaffAppManagementComponent,
    PatientRegManagementComponent,
    DocnavComponent,
    LogoutComponent,
    FeedbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    MatOptionModule,
    MatPaginatorModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
    }),
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
