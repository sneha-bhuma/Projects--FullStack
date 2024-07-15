import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
//import { HomeLoanComponent } from './home-loan/home-loan.component';

import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ApproverComponent } from './components/approver/approver.component';
import { AppFormComponent } from './components/app-form/app-form.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoanCalculatorComponent } from './components/loan-calculator/loan-calculator.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoanStatusComponent } from './components/loan-status/loan-status.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

import { FeedbackComponent } from './components/feedback/feedback.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "logout", component: LogoutComponent },
  { path: "footer", component: FooterComponent },
  { path: "calculator", component: LoanCalculatorComponent },
  { path: "pagenotfound", component: PageNotFoundComponent },
  { path: "header", component: HeaderComponent },
  { path: "app-form", component: AppFormComponent },
  { path: "approver", component: ApproverComponent },
  { path: "status", component: LoanStatusComponent },
  { path: "welcome", component: WelcomeComponent },
  { path: "feedback", component: FeedbackComponent },
  { path: "", component: HomeComponent },  //default landing path 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

