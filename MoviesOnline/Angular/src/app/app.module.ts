import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {  MAT_FORM_FIELD_DEFAULT_OPTIONS,matFormFieldAnimations,MatFormFieldModule,} from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { TsclassComponent } from './tsclass/tsclass.component';
import { Todo2Component } from './todo2/todo2.component';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { React1Component } from './react1/react1.component';
import { React2Component } from './react2/react2.component';
import { React3Component } from './react3/react3.component';
import { LoginComponent } from './login/login.component';
import { Login1Component } from './login1/login1.component';
import {MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';
import { EmpsComponent } from './emps/emps.component';
import { EmpsDetailsComponent } from './emps-details/emps-details.component';
import { Login2Component } from './login2/login2.component';
import { MovieComponent } from './movie/movie.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { TopbarComponent } from './topbar/topbar.component';
import { LogoutComponent } from './logout/logout.component';
import { MovieSingleComponent } from './movie-single/movie-single.component';
import { FavComponent } from './fav/fav.component';
import { LapComponent } from './lap/lap.component';
import { SearchComponent } from './search/search.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MovieHeaderComponent } from './movie-header/movie-header.component';
import { MovieAdminComponent } from './movie-admin/movie-admin.component';
import { MovieUserComponent } from './movie-user/movie-user.component';
import { TicketComponent } from './ticket/ticket.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
 
 
 
 
@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    WelcomeComponent,
    ParentComponent,
    ChildComponent,
    TsclassComponent,
    Todo2Component,
    React1Component,
    React2Component,
    React3Component,
    LoginComponent,
    Login1Component,
    EmpsComponent,
    EmpsDetailsComponent,
    Login2Component,
    MovieComponent,
    MovieDetailsComponent,
    TopbarComponent,
    LogoutComponent,
    MovieSingleComponent,
    FavComponent,
    LapComponent,
    SearchComponent,
    MovieHeaderComponent,
    MovieAdminComponent,
    MovieUserComponent,
    TicketComponent,
    UpcomingComponent,
    ContactUsComponent,
     
 
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatSlideToggleModule,
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbar,
    MatTableModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
    }),

  ],
  
  exports: [],
  providers: [
    provideAnimationsAsync(),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
  bootstrap: [AppComponent],
})

export class AppModule {}

