import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  loginUrl = 'http://127.0.0.1:8000/profilevs/';

  constructor() {}

  getUser(){
    return fetch(this.loginUrl).then((res)=> res.json());
  }

  addUser(user: any) {
    return fetch(this.loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  }

  deleteUser(id: number) {
    return fetch(this.loginUrl+id+"/", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  
}



