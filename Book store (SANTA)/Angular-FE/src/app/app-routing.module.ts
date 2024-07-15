import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowseComponent } from './browse/browse.component';
import { ReviewComponent } from './review/review.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BooksDetailsComponent } from './books-details/books-details.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { BookManagementComponent } from './book-management/book-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ReviewManagementComponent } from './review-management/review-management.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './auth-gaurd.guard';




const routes: Routes = [
  { path: 'browse', component: BrowseComponent },
  { path: 'review', component: ReviewComponent  ,canActivate:[
 authGuard
    ]},
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'cart', component: CartComponent},
  { path: 'checkout', component: CheckoutComponent ,canActivate:[
    authGuard
       ]},
  { path: 'book/:ID', component: BookDetailsComponent},
  { path: 'books', component: BooksDetailsComponent},
  { path: 'umanage', component: UserManagementComponent},
  { path: 'rmanage', component: ReviewManagementComponent},
  { path: 'bmanage', component: BookManagementComponent},
  { path: 'register', component: RegisterComponent},

  { path: '', component: FrontPageComponent},

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
