import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SharingService {

  isLoggedIn: boolean =false;
  isAdmin : boolean = false;

  public loggedin = new ReplaySubject<number>(0);
  loggedin$ =this.loggedin.asObservable();

  constructor() { 
    this.loggedin.next(0)
  }

  doLogin(){
    this.isLoggedIn = true
    this.loggedin.next(1)
  }

  doLogout(){
    this.isAdmin = false;
    this.isLoggedIn = false
    this.loggedin.next(0)
  }

  doAdminLogin(){
    this.isAdmin = true;
    this.isLoggedIn = true
    this.loggedin.next(1)
  }


}
