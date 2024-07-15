import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  user: string =""
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  public loggedin = new ReplaySubject<number>(0);
  public adminloggedin = new ReplaySubject<number>(0);
  loggedin$ = this.loggedin.asObservable();
  public username = new ReplaySubject<string>(0);
  username$ = this.username.asObservable();
  admin$ = this.adminloggedin.asObservable();

  doLogin(name:string) {
    this.isLoggedIn = true;
    this.loggedin.next(1);
    this.username.next(name)
  }

doLogout() {
  this.isLoggedIn = false;
  this.isAdmin = false;
  this.loggedin.next(0);
  this.adminloggedin.next(0);

}
 
doAdminLogin(name:string) {
  this.isLoggedIn = true;
  this.loggedin.next(1);
  this.adminloggedin.next(1);
  this.username.next(name)
  this.isAdmin = true;
}

doNotLogout(){
  this.isLoggedIn = true;
  this.loggedin.next(1);

}
  constructor() { }
}
