import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BooksService } from '../books.service';

// import { CartComponent } from '../cart/cart.component';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit  {
  sales:any;
  [x: string]: any;
  checkoutForm: FormGroup;
  cartInfo:any;
  count:any;
  books: any[]=[];
  price: any;
  status:number=0;

constructor(private checkoutService: CheckoutService,private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private booksService: BooksService){
      this.checkoutForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        zip: ['', Validators.required],
        cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
        expiryDate: ['', Validators.required],
        cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]]
      });
    }



    ngOnInit() {
      this.cartInfo = this.booksService.getcart();
      this.count=this.booksService.count;
      
      this.count=this.count['_buffer'];
      
      
      this.price=this.booksService.price;
      this.price=this.price['_buffer'];
      this.count=this.count[0];
      this.price=this.price[0];
      
      
      console.log(this.cartInfo);
      // this.getSalesFromService();
    }  

  getSalesFromService() {
    this.checkoutService.getSales().then((data) => {
      console.log(data);
      this.sales = data;
      //this.start=false;
    });
  }


  onSubmit(): void {
      if (this.checkoutForm.valid) {
        this.toastr.success('Order successfully placed 😊 😍');
        
        
        const saleInfo = { 
          userName: this.checkoutForm.value.name,
          email: this.checkoutForm.value.email,
          address: this.checkoutForm.value.address,
          no_of_books: this.count,
          total_price:this.price,
          books: this.cartInfo
          }
          console.log(saleInfo);
          

          this.checkoutService.createSale(saleInfo).then(() => { this.getSalesFromService() });

          // for (let item of this.cartInfo) {

          //   this.books.push({
          //     title: item.title,
          //     author: item.author,
          //     category: item.category,
          //     price: item.price,
          //     synopsis: item.synopsis,
          //     isbn: item.isbn,
          //     publication_date: item.publication_date
          //   });}
          // this.cart.cartlist=[]
          this.booksService.deleteAll()
          this.router.navigate(['logout']);
          


      
     } else {
        // this.sharingService.isLoggedIn = false;
        this.toastr.error('Please verify details entered 😢');
  }
}
}




