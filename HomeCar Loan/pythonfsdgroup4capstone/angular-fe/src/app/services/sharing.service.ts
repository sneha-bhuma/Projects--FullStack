import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingService {

  isLoggedIn: boolean= false; //check user
  isAdmin: boolean= false; //for admin

  public loggedin = new ReplaySubject<number>(0); //to store the value, initially takes 0 when logged in change to 1 in doLogin,0 again in doLogout
  loggedin$ =this.loggedin.asObservable(); //to subscribe replaysubject

  userProfile: any; // Store user profile details

  constructor() { }
  doLogin(){
    this.isLoggedIn=true;
    this.loggedin.next(1); //for observable true(enable)
  }

  doAdminLogin(){
    this.isLoggedIn=true;
    this.isAdmin=true;
    this.loggedin.next(1); //for observable true(enable)
  }
  
  doLogout(){

    localStorage.removeItem('email');
    console.log('User logged out, local storage cleared');
    this.isLoggedIn=false;
    this.isAdmin=false;
    this.loggedin.next(0); //for observable false(disable)
  }

  doNotLogout(){
    this.isLoggedIn = true;
    this.loggedin.next(1);
   
  }

  // setUserProfile(profile: any) {
  //   this.userProfile = profile;
  // }

  // getUserType(): string {
  //   if (this.userProfile) {
  //     return this.userProfile.user_type;
  //   } else {
  //     return ''; // Handle case where user profile is not set
  //   }
  // }

}
