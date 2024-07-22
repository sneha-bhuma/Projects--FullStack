import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { LoginFormComponent } from './login-form/login-form.component';

import { LogoutComponent } from './logout/logout.component';

import { CartComponent } from './cart/cart.component';
import { MainComponent } from './main/main.component';

import { ShowfavComponent } from './showfav/showfav.component';

import { RegisterComponent } from './register/register.component';
import { FoodsComponent } from './foods/foods.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';
import { LoginpopComponent } from './loginpop/loginpop.component';
import { AdminComponent } from './admin/admin.component';

 

const routes: Routes = [
  
  
 
  {path:"login-form",component:LoginFormComponent },

 
 {path:"foods",component:FoodsComponent},
 
 {path:"logout",component:LogoutComponent},
 {path:"cart", component:CartComponent},
 {path:"",component:MainComponent},
 {path:"main",component:MainComponent},
 { path: 'food', component: FoodDetailComponent },
  
  { path: 'food/:ID', component: FoodDetailComponent },
  {path:"showfav",component:ShowfavComponent},
  
  {path:"register",component:RegisterComponent},
  {path:"admin",component:AdminComponent},

  

  
  


];
 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }