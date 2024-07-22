import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingService {

 
  isLoggedIn: boolean = false;  // check user
  isAdmin: boolean = false;   // check admin
  private totalQuantitySubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
 
  private loggedin = new ReplaySubject<boolean>(1); // create a ReplaySubject to store the authentication state
  loggedin$ = this.loggedin.asObservable(); // create an observable to subscribe to
 
  constructor() { }
 
  doLogin() {
    this.isLoggedIn = true;
    this.loggedin.next(true); // notify subscribers that the user is logged in
  }
 
  doLogout() {
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.loggedin.next(false); // notify subscribers that the user is logged out
  }
 
  doAdminLogin() {
    this.isLoggedIn = true;
    this.isAdmin = true;
    this.loggedin.next(true); // notify subscribers that the user is logged in as admin
  }


  setTotalQuantity(quantity: number): void {
    this.totalQuantitySubject.next(quantity);
  }

  getTotalQuantity(): Observable<number> {
    return this.totalQuantitySubject.asObservable();
  }
 
  getAuthStatus(): Observable<boolean> {
    return this.loggedin$;
  }
}
 