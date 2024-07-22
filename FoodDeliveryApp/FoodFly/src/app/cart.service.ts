import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { Cart } from './Models/cart';
import { Bill } from './Models/bill';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart[] = [];
  private cart1: Bill[] = [];
  private cartUrl: string = "http://127.0.0.1:8000/api/cart/";
  private billUrl: string = "http://127.0.0.1:8000/api/bill/";
  private countSubject = new ReplaySubject<number>(1);
  private count = 0;
  private current_user_id: number | null = null;
  private totalQuantity = 0;

  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private userService: UserService
  ) {}

  async addToCart(product: Cart) {
    try {
      await this.fetchCart(); // Wait for cart items to be fetched
      const user = await this.userService.getUserById(product.user_id).toPromise(); // Fetch user synchronously

      if (user && user.id) {
        this.current_user_id = user.id as number;

        const existingProduct = this.cart.find(
          (p) => p.product_id === product.product_id && p.user_id === this.current_user_id
        );

        if (!existingProduct) {
          const cartItem: Cart = {
            id: 0,  // Assuming the backend assigns the ID
            product_id: product.product_id,
            name: product.name,
            price: product.price,
            category: product.category,
            image: product.image,
            quantity: product.quantity || 1,
            user_id: this.current_user_id
          };

          const newItem = await this.http.post<Cart>(this.cartUrl, cartItem).toPromise(); // Wait for post request

          if (newItem) {
            this.cart.push(newItem);
            this.count++;
            this.countSubject.next(this.count);
            this.toastr.success('Item added to cart');
          } else {
            this.toastr.error('Failed to add item to cart');
            console.error('Error adding item to cart: newItem is undefined');
          }
        } else {
          // Item already exists in cart
          this.toastr.warning('Item already added to cart');
        }
      } else {
        this.toastr.error('Failed to fetch current user');
        console.error('Error fetching current user: User not found');
      }
    } catch (error) {
      this.toastr.error('Failed to add item to cart');
      console.error('Error adding item to cart:', error);
    }
  }

  removeCart(product: Cart): Observable<void> {
    const existingProductIndex = this.cart.findIndex(
      (p) => p.product_id === product.product_id && p.user_id === product.user_id
    );

    if (existingProductIndex !== -1) {
      const cartId = this.cart[existingProductIndex].id;
      return this.http.delete<void>(`${this.cartUrl}${cartId}/`).pipe(
        map(() => {
          this.cart.splice(existingProductIndex, 1);
          this.count--;
          this.countSubject.next(this.count);
        }),
        catchError((error) => {
          this.toastr.error('Failed to remove item from cart');
          console.error('Error removing item from cart:', error);
          return throwError(error);
        })
      );
    }
    return new Observable<void>((observer) => {
      observer.complete();
    });
  }

  removeAllCart(): Observable<void> {
    const userId = this.current_user_id;
    if (userId) {
      const url = `${this.cartUrl}delete_all/?user_id=${userId}`;
      return this.http.delete<void>(url).pipe(
        map(() => {
          this.cart = [];
          this.count = 0;
          this.countSubject.next(this.count);
        }),
        catchError((error) => {
          this.toastr.error('Failed to remove all items from cart');
          console.error('Error removing all items from cart:', error);
          return throwError(error);
        })
      );
    }
    return new Observable<void>((observer) => {
      observer.complete();
    });
  }

  async decreaseQuantity(product: Cart) {
    const existingProduct = this.cart.find(
      (p) => p.product_id === product.product_id && p.user_id === this.current_user_id
    );

    if (existingProduct && existingProduct.quantity > 1) {
      existingProduct.quantity--;
      try {
        await this.http.put<Cart>(`${this.cartUrl}${existingProduct.id}/`, existingProduct).toPromise();
        this.toastr.info('Item quantity decreased');
        this.updateCartTotalQuantity();
      } catch (error) {
        this.toastr.error('Failed to decrease item quantity');
        console.error('Error decreasing item quantity:', error);
      }
    } else if (existingProduct && existingProduct.quantity === 1) {
      this.removeCart(existingProduct);
    }
  }

  fetchCart(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.get<Cart[]>(this.cartUrl).subscribe(
        (cartItems) => {
          this.cart = cartItems;
          this.toastr.info('Cart items fetched successfully');
          resolve();
        },
        (error) => {
          this.toastr.error('Failed to fetch cart items');
          console.error('Error fetching cart items:', error);
          reject(error);
        }
      );
    });
  }

  fetchCartByUserId(userId: number): Observable<{ cart: Cart[], totalQuantity: number }> {
    return this.http.get<Cart[]>(`${this.cartUrl}?user_id=${userId}`).pipe(
      map(cartItems => {
        const totalQuantity = cartItems.reduce((sum, item) => sum + Number(item.quantity), 0);
        return { cart: cartItems, totalQuantity };
      }),
      catchError((error) => {
        this.toastr.error('Failed to fetch cart items');
        console.error('Error fetching cart items:', error);
        return throwError(error);
      })
    );
  }

  getCountObservable(): Observable<number> {
    return this.countSubject.asObservable();
  }

  private updateCartTotalQuantity(): void {
    this.totalQuantity = this.cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  }

  private handleError(error: any): Observable<never> {
    this.toastr.error('An error occurred');
    console.error('CartService error:', error);
    return throwError('Something bad happened; please try again later.');
  }


  addCart(cart1: Bill): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.billUrl, cart1, { headers });
  }

}
