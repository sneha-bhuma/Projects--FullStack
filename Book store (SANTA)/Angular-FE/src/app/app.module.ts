import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgApexchartsModule } from 'ng-apexcharts';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { MatButtonModule } from '@angular/material/button';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';

import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  matFormFieldAnimations,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BrowseComponent } from './browse/browse.component';
import { ReviewComponent } from './review/review.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MatSelectModule } from '@angular/material/select';
import { StarRatingModule } from 'angular-star-rating';
import { ToastrModule } from 'ngx-toastr';
import 'ngx-toastr/toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BooksDetailsComponent } from './books-details/books-details.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import {MatListModule} from '@angular/material/list';
import { FrontPageComponent } from './front-page/front-page.component';
import { BookManagementComponent } from './book-management/book-management.component';
import { ReviewManagementComponent } from './review-management/review-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    BrowseComponent,
    ReviewComponent,
    AdminComponent,
    LoginComponent,
    LogoutComponent,
    CartComponent,
    CheckoutComponent,
    BookDetailsComponent,
    BooksDetailsComponent,
    FrontPageComponent,
    BookManagementComponent,
    ReviewManagementComponent,
    UserManagementComponent,
    RegisterComponent


  ],
  imports: [BrowserModule, AppRoutingModule, NgApexchartsModule, MatIconModule,
    FormsModule, ReactiveFormsModule,
    MatBadgeModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbar,
    
    MatToolbarModule,
    MatTableModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatListModule,
    CanvasJSAngularChartsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
    }),
    StarRatingModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
