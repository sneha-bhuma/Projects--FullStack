import { Component, OnInit } from '@angular/core';
import { MovieserviceService } from '../movieservice.service';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.component.html',
  styleUrl: './fav.component.css'
})

export class FavComponent implements OnInit{

  x1:any ={};

  constructor(private mov:MovieserviceService){}

  ngOnInit(): void {
   this.x1 = this.mov.getFav()
  //  console.log(this.x1);
   
  }

}
