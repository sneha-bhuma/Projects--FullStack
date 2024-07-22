import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Prod } from '../Models/prod';
import { CartService } from '../cart.service';
import { UserAuthService } from '../user-auth.service';
import { ToastrService } from 'ngx-toastr';
import { Cart } from '../Models/cart';




@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrl: './food-details.component.css'
})
export class FoodDetailsComponent {


  
  @Input() pdet: Prod | undefined;
  @Output() addToCartClicked: EventEmitter<void> = new EventEmitter<void>();
  prod: any;
  error : string = '';
  current_user_id: number | null = null;

  total: (() => number) | undefined;
  
  // itemCount: number = 0;

  constructor(
    
    private toastr: ToastrService,
    private userAuthService: UserAuthService,
    private cartservice: CartService
  ) { }
  
 
  addCart(prod: Prod) {
    this.current_user_id = this.userAuthService.getUserId();
    console.log(this.current_user_id);

    if (this.current_user_id === null) {
      this.toastr.warning("Please sign in");
    } else {
      console.log('Adding to Cart');
      const CartlistItem: Cart = {
        id: 0, // This will be set by the backend
        name: prod.name,
        price: prod.price,
        product_id: prod.id,
        image: prod.image,
        quantity: prod.quantity,
        category: prod.category,
        user_id: this.current_user_id
      };
      console.log("cart items", CartlistItem)
      this.cartservice.addToCart(CartlistItem);
    }
  }
}