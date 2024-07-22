
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelloComponent } from './hello/hello.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { TsclassComponent } from './tsclass/tsclass.component';
import { Todo2Component } from './todo2/todo2.component';
import { React1Component } from './react1/react1.component';
import { React2Component } from './react2/react2.component';
import { React3Component } from './react3/react3.component';
import { LoginComponent } from './login/login.component';
import { Login1Component } from './login1/login1.component';
import { EmpsComponent } from './emps/emps.component';
import { Login2Component } from './login2/login2.component';
import { MovieComponent } from './movie/movie.component';
import { authGuard } from './auth.guard';
import { adminGuard } from './admin.guard';
import { LogoutComponent } from './logout/logout.component';
import { single } from 'rxjs';
import { MovieSingleComponent } from './movie-single/movie-single.component';
import { FavComponent } from './fav/fav.component';
import { LapComponent } from './lap/lap.component';
import { SearchComponent } from './search/search.component';
import { MovieUserComponent } from './movie-user/movie-user.component';
import { tick } from '@angular/core/testing';
import { TicketComponent } from './ticket/ticket.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
 
// import { Login2Component } from './login2/login2.component';
 

const routes: Routes = [
  {path:'hello',component:HelloComponent,canActivate:[authGuard]},
  {path:'welcome',component:WelcomeComponent,canActivate:[adminGuard]},
  {path:'parent',component:ParentComponent},
  {path:'child',component:ChildComponent},
  {path:'tsclass',component:TsclassComponent},
  {path:'todo2',component:Todo2Component},
  {path:'react1',component:React1Component},
  {path:'react2',component:React2Component},
  {path:'react3',component:React3Component},
  {path:'login',component:LoginComponent},
  {path:'login1',component:Login1Component},
  {path:'emps',component:EmpsComponent},
  {path:'login2',component:Login2Component},
  {path:'movie',component:MovieComponent },  
  {path:'logout',component:LogoutComponent},
  {path:'movie-single',component:MovieSingleComponent},
  {path:'fav',component:FavComponent},
  {path:'lap',component:LapComponent},
  {path:'search',component:SearchComponent},
  {path:'movie-user',component:MovieUserComponent},
  {path:'ticket', component:TicketComponent},
  {path:'upcoming', component:UpcomingComponent},
  {path:'contact-us',component:ContactUsComponent}
   
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

