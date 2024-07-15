import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingService {

  constructor() { }
  isLoggedIn : boolean = false;
  isAdmin : boolean = false;
   
  public loggedin = new ReplaySubject<number>(0); //crete a replay subject to store the value
  loggedin$ = this.loggedin.asObservable(); //create an observable to subscribe to
    
  doLogin(){
    this.isLoggedIn = true;
    this.loggedin.next(1);
  } 

  doAdminLogin(){
    this.isLoggedIn = true;
    this.isAdmin = true;
    this.loggedin.next(1);
  }

  doLogout() {
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.loggedin.next(0);
  }
  
  private dataSource = new BehaviorSubject<any>(null);
  currentData = this.dataSource.asObservable();

  changeData(data: any) {
    this.dataSource.next(data);
  }

  patient_id : string = '';
  patient_name : string = '';

}
