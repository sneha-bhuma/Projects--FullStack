import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Prod } from '../Models/prod';
import { FoodService } from '../food.service';
import { FavService } from '../fav.service';
import { CartService } from '../cart.service';
import { UserAuthService } from '../user-auth.service';
import { ToastrService } from 'ngx-toastr';
import { Wish } from '../Models/wish';
import { Cart } from '../Models/cart';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrl: './food-detail.component.css'
})
export class FoodDetailComponent implements OnInit {

  
 
  
    pdet?: Prod;
    current_user_id: number | null = null;
    
    constructor(
      private foodservice: FoodService,
      private route: ActivatedRoute,
      private favservice: FavService,
      private cartservice: CartService,
      private toastr: ToastrService,
      private userAuthService: UserAuthService
    ) { }
  
    ngOnInit(): void {
      const routeParams = this.route.snapshot.paramMap;
      const idFromRoute = Number(routeParams.get('ID'));
      console.log(idFromRoute);
      this.getProdById(idFromRoute);
      this.current_user_id = this.userAuthService.getUserId();
    }
  
    getProdById(id: number) {
      this.foodservice.getFoodById(id).then((data) => {
        console.log(data);
        this.pdet = data;
        console.log(this.pdet);
      });
    }
  
    addFav(prod: Prod) {
      console.log(this.current_user_id);
  
      if (this.current_user_id === null) {
        this.toastr.warning("Please sign in");
      } else {
        console.log('Adding to Fav');
        const wishlistItem: Wish = {
          id: 0, // This will be set by the backend
          product_id: prod.id,
          name: prod.name,
          price: prod.price,
          category: prod.category,
          image: prod.image,
          user_id: this.current_user_id
        };
        this.favservice.addFav(wishlistItem);
      }
    }
  
    addCart(prod: Prod) {
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
  

  