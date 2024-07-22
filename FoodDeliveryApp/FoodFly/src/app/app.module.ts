import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
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

import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginFormComponent } from './login-form/login-form.component';

import { LogoutComponent } from './logout/logout.component';
import { CartComponent } from './cart/cart.component';
import { TopbarComponent } from './topbar/topbar.component';

import { MainComponent } from './main/main.component';
import { LoginpopComponent } from './loginpop/loginpop.component';
import { ShowfavComponent } from './showfav/showfav.component';



import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';

import { FoodsComponent } from './foods/foods.component';
import { FoodDetailsComponent } from './food-details/food-details.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';
import { AdminComponent } from './admin/admin.component';







@NgModule({
  declarations: [
    AppComponent,
  
   
    LoginFormComponent,
        
        LogoutComponent,
        CartComponent,
        TopbarComponent,
       
        MainComponent,
        LoginpopComponent,
        ShowfavComponent,
        
        
                 
                  RegisterComponent,
                                    
                                    FoodsComponent,
                                    FoodDetailsComponent,
                                    FoodDetailComponent,
                                    AdminComponent,
        
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatBadgeModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbar,
    MatSelectModule,
    MatOptionModule,

    MatToolbarModule,
    MatTableModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
    }),
    BrowserAnimationsModule,  
    CommonModule,  

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


