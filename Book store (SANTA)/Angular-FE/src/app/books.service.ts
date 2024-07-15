import { Injectable } from '@angular/core';
import { Books } from './models/Books';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
   url: string = "http://127.0.0.1:8000/bookvs/";
  cart: Books[]=[]
  public count = new ReplaySubject<number>(0); // create a replay subject to store the value
  count$ = this.count.asObservable(); // create an observable to subscribe to
  public price = new ReplaySubject<number>(0); // create a replay subject to store the value
  price$ = this.price.asObservable(); // create an observable to subscribe to

  constructor() { }


  getBooks(): Promise<any> {
    return fetch(this.url).then((res) => res.json());
  }

 
  getBooksById(id: number) {
    return fetch(this.url + id + '/' ).then((res) => res.json());
       
}

  addBook(book: any) {
    return fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
  });
  }

  deleteBook(id: number) {
    return fetch(this.url+id+"/", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

getcart(){
    this.updateCount();
    return this.cart

  }
  addTocart(wlist:any){
  let w=this.cart?.find((p) =>p.id ==  wlist.id);
  if (!w){
    this.cart.push(wlist);
    this.updateCount();
    return true;
  } else{
    return false;
  }
  }
  deletecart(wlist:Books){
  this.cart = this.cart.filter(obj => {return obj != wlist})
  }
  deleteAll(){
  this.cart = []
  this.updateCount();
    return this.cart
  }

  public updateCount(){
    this.count.next(this.cart.length);
    
  }
  public updatePrice(price:number){
    this.price.next(price);
    
  }



}
