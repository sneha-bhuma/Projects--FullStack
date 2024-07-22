import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { UserAuthService } from '../user-auth.service';
import { Cart } from '../Models/cart';
import { FeedbackService } from '../feedback.service';
import { ToastrService } from 'ngx-toastr';
import { SharingService } from '../sharing.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() maxRating = 5;
  @Input() selectedstars = 0;
  maxRatingArray: any = Array(this.maxRating).fill(0).map((x, i) => i + 1);
  PreviousmouseSelection = 0;
  status: boolean = false;
  rating: number = 0;  // Variable to store the rating value

  carts: Cart[] = [];
  countcart: number = 0;
  uniquecart: Cart[] = [];
  current_user_id: number | null = null;
  current_user_name: string | null = null;
  totalprice: number = 0;
  totalbill: number = 0;
  platform_fee: number = 5;
  delivery_fee: number = 0;
  GST: number = 0;
  frequencyMap: { [key: string]: number } = {};
  count: any;
  totalQuantity: number = 0;
  

  constructor(
    private cartService: CartService,
    private userAuthService: UserAuthService,
    private feedbackService: FeedbackService,
    private toastr: ToastrService,
    private sharingService: SharingService
  ) {}

  ngOnInit(): void {
    this.current_user_id = this.userAuthService.getUserId();
    this.current_user_name = this.userAuthService.getUserName();
    if (this.current_user_id !== null) {
      this.cartService.fetchCartByUserId(this.current_user_id).subscribe(result => {
        this.carts = result.cart;
        this.countcart = this.carts.length;
        this.uniquecart = this.getUniqueItems(this.carts);
        this.calculateTotalPrice();
        // You can also use result.totalQuantity if needed
        this.totalQuantity = result.totalQuantity;
        this.sharingService.setTotalQuantity(this.totalQuantity);
        console.log(this.totalQuantity);
        
      });
    }
  }

  getUniqueItems(arr: Cart[]): Cart[] {
    return arr.filter((value, index, self) => self.findIndex(t => t.id === value.id) === index);
  }

  calculateTotalPrice(): number {
    // Calculate total price of items in the cart
    this.totalprice = this.uniquecart.reduce((total: number, prod: Cart) => total + (prod.price || 0) * (prod.quantity || 1), 0);
  
    // Calculate delivery fee based on total price
    if (this.totalprice <= 1000) {
      this.delivery_fee = this.totalprice * 0.1;
    } else {
      this.delivery_fee = 0;
    }
  
    // Calculate GST (assuming rounding to nearest integer)
    this.GST = Math.round(this.totalprice * 0.08);
  
    // Calculate total bill including platform fee, delivery fee, and GST
    this.totalbill = this.totalprice + this.delivery_fee + this.GST + this.platform_fee;
  
    // Return the total price of the cart items
    return this.totalprice;
  }
  
  addToCart(product: Cart): void {
    // Check if the product is already in the cart
    const existingProduct = this.uniquecart.find(item => item.id === product.id);

    if (existingProduct) {
      // Increment the quantity of the existing product
      existingProduct.quantity++;
    } else {
      // Add the product to the cart with quantity 1
      this.uniquecart.push({ ...product, quantity: 1 });
    }

    // Update the cart service with the updated cart data
    this.cartService.addToCart(product);

    // Recalculate total price and other bill details
    this.countcart = this.uniquecart.length;
    this.totalQuantity += 1;
    this.sharingService.setTotalQuantity(this.totalQuantity);
    this.calculateTotalPrice();
  }

  removeCart(product: Cart): void {
    const existingProductIndex = this.uniquecart.findIndex(item => item.id === product.id);
  
    if (existingProductIndex !== -1) {
      const cartId = this.uniquecart[existingProductIndex].id;
  
      this.cartService.removeCart(product).subscribe(
        () => {
          this.uniquecart.splice(existingProductIndex, 1); // Remove the item locally
          this.countcart = this.uniquecart.length;
          this.calculateTotalPrice();
          this.totalQuantity -= 1;
          this.sharingService.setTotalQuantity(this.totalQuantity);
          this.toastr.success('Item removed from cart');
        },
        (error) => {
          this.toastr.error('Failed to remove item from cart');
          console.error('Error removing item from cart:', error);
        }
      );
    }
  }
  
  
  removeAllCart(): void {
    this.cartService.removeAllCart().subscribe(
      () => {
        this.uniquecart = []; // Clear the local cart array
        this.countcart = 0; // Reset the count of items
        this.totalprice = 0; // Reset the total price
        this.totalQuantity = 0;
        this.sharingService.setTotalQuantity(this.totalQuantity);
        this.toastr.info('All items removed from cart');
      },
      (error) => {
        this.toastr.error('Failed to remove all items from cart');
        console.error('Error removing all items from cart:', error);
      }
    );
  }
  
  

  decreaseQuantity(product: Cart): void {
    // Find the product in the unique cart
    const existingProduct = this.uniquecart.find(item => item.id === product.id);

    if (existingProduct) {
      // Decrease the quantity if greater than 1
      if (existingProduct.quantity > 1) {
        existingProduct.quantity--;
      } else {
        // Remove the item if quantity is 1
        this.removeCart(product);
      }

      // Update the cart service with the updated cart data
      this.cartService.decreaseQuantity(product);

      // Recalculate total price and other bill details
      this.countcart = this.uniquecart.length;
      this.calculateTotalPrice();
      this.totalQuantity -= 1;
      this.sharingService.setTotalQuantity(this.totalQuantity);
    }
  }

  HandleMouseEnter(index: number): void {
    this.selectedstars = index + 1;
  }

  HandleMouseLeave(): void {
    if (this.PreviousmouseSelection !== 0) {
      this.selectedstars = this.PreviousmouseSelection;
    } else {
      this.selectedstars = 0;
    }
  }

  Rating(index: number): void {
    this.selectedstars = index + 1;
    this.PreviousmouseSelection = this.selectedstars;
    this.rating = this.selectedstars;
  }

  onSubmit() {
    if (this.current_user_id !== null && this.rating !== 0 && this.current_user_name) {
      this.feedbackService.postFeedback(this.current_user_id, this.rating, this.current_user_name).subscribe(
        response => {
          console.log('Feedback submitted successfully:', response);
        },
        error => {
          console.error('Error submitting feedback:', error);
        }
      );
    } else {
      console.error('User ID and rating are required.');
    }
  }

  onCancel() {
    // Handle the cancel action
  }

  addFav() {
    console.log(this.current_user_id);
   
    if (this.current_user_id === null) {
     
    } else {
      console.log('Adding to Bill 1');
      console.log('Adding to Bill 1',this.totalbill);
   
      const cartItem = {
        
             GST:this.GST,
   
              platform_fee : this.platform_fee,
              delivery_fee : this.delivery_fee,
              totalbill : this.totalbill,
              totalprice : this.totalprice,
              countcart: this.countcart,
              user_id: this.current_user_id,
             
      };
     
        console.log('Adding to Bill2', cartItem);
        this.cartService.addCart(cartItem).subscribe(
          (response: any) => {
              console.log('Adding to Bill2 - Response:', response);
              this.toastr.success("bill data submitted succefully");
              
          },
          (error: any) => {
              console.error('Error adding to Bill2:', error);
              
          }
      );
     
     
    }
   
  }
  //========================================================
   
 
   

}
