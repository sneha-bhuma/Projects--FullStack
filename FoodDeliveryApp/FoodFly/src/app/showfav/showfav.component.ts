import { Component, Input, OnInit } from '@angular/core';
import { FavService } from '../fav.service';

import { Wish } from '../Models/wish';
import { UserAuthService } from '../user-auth.service';


@Component({
  selector: 'app-showfav',
  templateUrl: './showfav.component.html',
  styleUrl: './showfav.component.css'
})
export class ShowfavComponent implements OnInit {


  favs: Wish[] = [];
  filteredFavs: Wish[] = [];
  current_user_id: number | null = null;
  count: number = 0;
  @Input() pdet: Wish | undefined;

  totalSalary: number = 0; // Initialize total salary

  constructor(private favService: FavService, private userAuthService: UserAuthService) {}

  ngOnInit(): void {
    this.current_user_id = this.userAuthService.getUserId(); // Get the current user ID

    if (this.current_user_id !== null) {
      this.favService.fetchFavs2(this.current_user_id).subscribe((favs: Wish[]) => {
        this.favs = favs;
        this.filteredFavs = this.favs.filter(fav => fav.user_id === this.current_user_id); // Filter by current user
        this.count = this.filteredFavs.length;
        console.log('User Wishlist:', this.filteredFavs);
      });
    }
  }

  removeFav(prods: Wish) {
    console.log('remove from Fav');
    const index = this.filteredFavs.findIndex(item => item.id === prods.id);
    this.count--;
    if (index !== -1) {
      this.filteredFavs.splice(index, 1); // Remove the item at index
    }
    this.favService.removeFav(prods); // Call the service to remove from backend
  }

  removeAllFav() {
    this.favService.removeAllFav();
    this.filteredFavs = [];
      this.count = 0;
  }
}
