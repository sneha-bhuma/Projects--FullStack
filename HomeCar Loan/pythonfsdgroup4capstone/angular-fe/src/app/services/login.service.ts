  import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class LoginService {

    constructor() { }

    loginUrl = 'http://127.0.0.1:8000/api/login/';
    loanUrl ="http://127.0.0.1:8000/api/loanapp/";

    // create fetch method for passing name and password to the backend
    // and get the token back
    fetchToken(name: string, password: string) {
      return fetch(this.loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: name,
          password: password,
        }),
      }).then((response) => response.json());
    }

    // create method to pass token to the backend and get profile data back
    fetchProfile(token: string) {
      return fetch('http://127.0.0.1:8000/api/profile/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => response.json());
    }

    //for status
    // getLoanData(email: string | null | undefined) {
    //   const url = `${this.loanUrl}?email=${email}`;
    // return fetch(url).then((res) => res.json());
    // }


  // isLoggedIn: boolean= false; //check user
  // isAdmin: boolean= false; //for admin

  // public loggedin = new ReplaySubject<number>(0); //to store the value
  // loggedin$ =this.loggedin.asObservable(); //to subscribe replaysubject

  
  // doLogin(){
  //   this.isLoggedIn=true;
  //   this.loggedin.next(1); //for observable true(enable)
  // }

  // doAdminLogin(){
  //   this.isLoggedIn=true;
  //   this.isAdmin=true;
  //   this.loggedin.next(1); //for observable true(enable)
  // }
  
  // doLogout(){
  //   this.isLoggedIn=false;
  //   this.isAdmin=false;
  //   this.loggedin.next(0); //for observable false(disable)
  // }



}
