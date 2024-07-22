import { Injectable } from '@angular/core';
import { Prod } from './Models/prod';


@Injectable({
  providedIn: 'root'
})
export class FoodService {

 
  url: string = "http://127.0.0.1:8000/api/itemvs/";
 
  constructor() { }
  getFoods(): Promise<Prod[]> {
    return fetch(this.url).then((res) => res.json());
  }

  getFoodById(id: number) {
    return fetch(this.url + id + '/').then((res) => res.json());
  }
}