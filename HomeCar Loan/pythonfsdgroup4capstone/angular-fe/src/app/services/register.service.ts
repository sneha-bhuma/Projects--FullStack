import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  registerUrl ='http://127.0.0.1:8000/api/profile/';

  constructor() { }

  //to add/post reg user  data to server
  // addRegs(reg:any){
  //   return fetch(this.registerUrl,{
  //     method: 'POST',
  //     headers:{
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(reg),
  //   }).catch((error) => {
  //     console.error("error",error);
  //     return false;
  //   });

  // }
   // to add/post reg user data to server
   async addRegs(reg: any) {
    try {
      const response = await fetch(this.registerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reg),

      });
      console.log("inside service fun",reg);
      

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('error', error);
      return false;
    }
  }

}
