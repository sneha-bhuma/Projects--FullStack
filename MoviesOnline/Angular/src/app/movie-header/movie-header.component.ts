import { Component, Input } from '@angular/core';
import { Moviemod } from '../Models/moviemodel';
import { Router } from '@angular/router';
import { MovieserviceService } from '../movieservice.service';

@Component({
  selector: 'app-movie-header',
  templateUrl: './movie-header.component.html',
  styleUrl: './movie-header.component.css'
})
export class MovieHeaderComponent {


  
  constructor(private router:Router,private mov:MovieserviceService){}

 

  @Input() mdet :Moviemod | undefined;  

  
}
