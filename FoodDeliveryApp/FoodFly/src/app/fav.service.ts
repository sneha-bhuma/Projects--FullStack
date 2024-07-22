import { Injectable } from '@angular/core';
import { Wish } from './Models/wish';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject, Observable, tap, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FavService {
  private prod: Wish[] = [];
  private wishlistUrl: string = "http://127.0.0.1:8000/api/wishlist/";
  private countSubject = new ReplaySubject<number>(1);
  private count = 0;
  private current_user_id: number = 0;

  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private userService: UserService
  ) {}

  addFav(prods: Wish) {
    this.fetchFavs().then(() => {
      this.userService.getUserById(prods.user_id).subscribe(
        (user: any) => {
          this.current_user_id = user.id;
          const existingProduct = this.prod.find(
            (p) => p.product_id === prods.product_id && p.user_id === this.current_user_id
          );

          if (!existingProduct) {
            const wishlistItem: Wish = {
              id: 0,  // Assuming the backend assigns the ID
              product_id: prods.product_id,
              name: prods.name,
              price: prods.price,
              category: prods.category,
              image: prods.image,
              user_id: this.current_user_id
            };

            this.http.post<Wish>(this.wishlistUrl, wishlistItem).subscribe(
              (newItem) => {
                this.prod.push(newItem);
                this.count++;
                this.countSubject.next(this.count);
                this.toastr.success('Item added to wishlist');
              },
              (error) => {
                this.toastr.error('Failed to add item to wishlist');
                console.error('Error adding item to wishlist:', error);
              }
            );
          } else {
            this.toastr.warning('Item already added to wishlist');
          }
        },
        (error) => {
          this.toastr.error('Failed to fetch current user');
          console.error('Error fetching current user:', error);
        }
      );
    });
  }

  removeFav(prods: Wish) {
    const existingProductIndex = this.prod.findIndex(
      (p) => p.product_id === prods.product_id && p.user_id === prods.user_id
    );
    if (existingProductIndex !== -1) {
      const wishId = this.prod[existingProductIndex].id;
      this.http.delete(`${this.wishlistUrl}${wishId}/`).subscribe(
        () => {
          this.prod.splice(existingProductIndex, 1);
          this.count--;
          this.countSubject.next(this.count);
          this.toastr.warning('Item removed from wishlist');
        },
        (error) => {
          this.toastr.error('Failed to remove item from wishlist');
          console.error('Error removing item from wishlist:', error);
        }
      );
    }
  }

  removeAllFav() {
    const userId = this.current_user_id;
    const url = `${this.wishlistUrl}delete_all/?user_id=${userId}`;
  
    this.http.delete(url).subscribe(
      () => {
        // Clear local array of items for the current user
        this.prod = this.prod.filter((p) => p.user_id !== userId);
  
        // Update count and notify subscribers
        this.count = 0;
        this.countSubject.next(this.count);
  
        // Show success message
        this.toastr.info('All items removed from wishlist');
      },
      (error) => {
        // Handle error
        this.toastr.error('Failed to remove all items from wishlist');
        console.error('Error removing all items from wishlist:', error);
      }
    );
  }

  fetchFavs(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.get<Wish[]>(this.wishlistUrl).subscribe(
        (wishlistItems) => {
          this.prod = wishlistItems;
          this.toastr.info('Wishlist items fetched successfully');
          resolve();
        },
        (error) => {
          this.toastr.error('Failed to fetch wishlist items');
          console.error('Error fetching wishlist items:', error);
          reject(error);
        }
      );
    });
  }

  fetchFavs2(userId: number): Observable<Wish[]> {
    return this.http.get<Wish[]>(`${this.wishlistUrl}?user_id=${userId}`).pipe(
      tap((wishlistItems) => {
        this.prod = wishlistItems;
        // Update the count for the specific user
        this.count = this.prod.filter(item => item.user_id === userId).length;
        this.countSubject.next(this.count); // Notify subscribers about the new count
      }),
      catchError((error) => {
        this.toastr.error('Failed to fetch wishlist items');
        console.error('Error fetching wishlist items:', error);
        throw error;
      })
    );
  }

  getFavs(): Wish[] {
    return this.prod;
  }

  getCountObservable(): Observable<number> {
    return this.countSubject.asObservable();
  }
}
