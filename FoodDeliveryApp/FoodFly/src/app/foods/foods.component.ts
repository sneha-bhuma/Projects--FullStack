import { Component, OnInit } from '@angular/core';
import { FoodService } from '../food.service';
import { Prod } from '../Models/prod';
import { UserService } from '../user.service';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit {
  products_list: Prod[] = [];
  filteredProducts: Prod[] = [];
  searchTerm: string = '';
  selected: string = '';
  current_user_name: string | null = null;

  constructor(
    private foodService: FoodService,
    private userauthService: UserAuthService
  ) {}

  ngOnInit() {
    this.getProdsFromService();
    this.current_user_name = this.userauthService.getUserName();
    console.log(this.current_user_name);
  }

  getProdsFromService() {
    this.foodService.getFoods().then((data) => {
      this.products_list = data;
      console.log(this.products_list);
      
      this.filteredProducts = data; // Initialize filteredProducts with all products
      this.filterProducts(); // Apply initial filter
    }).catch(error => {
      console.error('Error fetching products:', error);
    });
  }

  filterProducts(): void {
    this.filteredProducts = this.products_list.filter((prod: Prod) => {
      const matchesSearchTerm = this.searchTerm ? prod.name.toLowerCase().includes(this.searchTerm.toLowerCase()) : true;
      const matchesCategory = this.selected ? prod.category === this.selected : true;
      return matchesSearchTerm && matchesCategory;
    });
  }

  getUniqueCategories(): string[] {
    const categories: string[] = [];
    for (const prod of this.products_list) {
      if (!categories.includes(prod.category)) {
        categories.push(prod.category);
      }
    }
    return categories;
  }
}
