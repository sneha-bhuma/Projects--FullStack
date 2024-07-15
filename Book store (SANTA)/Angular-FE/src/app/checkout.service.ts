import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  url: string = "http://127.0.0.1:5000/sales";
  _url: string = "http://127.0.0.1:5000/sale";


  constructor() { }

  getSales(){
    return fetch(this.url).then((res)=> res.json());
  }
  createSale(saleinfo:any){
    return fetch(this._url,{
      method: 'POST',
      headers:{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(saleinfo)
    });
  }
}
