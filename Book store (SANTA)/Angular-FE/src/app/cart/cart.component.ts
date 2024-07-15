import { Component } from '@angular/core';
import { BooksService } from '../books.service';
import { Books } from '../models/Books';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  initial_amount: number=0;
  constructor(private bookservice: BooksService, private router: Router) { }
  cartlist: Books[] =[];
  count: any=0;
  discount_count:number=0
  total_price:number=0
  dis_percent:number=0
  dis_amount:number=0
  tax_amount:number=0
  final_amount:number=0
  // public famount = new ReplaySubject<number>(0); // create a replay subject to store the value
  // famount$ = this.famount.asObservable(); // create an observable to subscribe to


  ngOnInit(): void {
    this.cartlist = this.bookservice.getcart();
    
    this.count=this.bookservice.count$;
    this.discount_count=this.cartlist.length
    this.getTotalPrice()
  }
  deleteAll() {
    this.cartlist =[]
    this.bookservice.deleteAll()
    this.getTotalPrice()
  }
  deleteCurrent(wlist: Books) {
    this.bookservice.deletecart(wlist);
    this.cartlist = this.bookservice.getcart();
    this.getTotalPrice()
 
  }
  getTotalPrice(){
    this.total_price=0
    for (let book of this.cartlist){
      this.total_price += book.price
    }
    this.tax_amount = Number((this.total_price * 0.07).toFixed(2))
    this.initial_amount=this.total_price + this.tax_amount
    if(this.discount_count< 3){
      this.dis_percent = 12
    }else if (this.discount_count < 5 ){
      this.dis_percent = 18
    }else if (this.discount_count < 10 ){
      this.dis_percent = 22
    }
    this.dis_amount = Number((this.initial_amount * (this.dis_percent/100)).toFixed(2))
    this.final_amount=Number((this.initial_amount - this.dis_amount).toFixed(2))
    this.bookservice.updatePrice(this.final_amount)

  }
  checkout(){
    this.router.navigate(['/checkout']);
  }
}
