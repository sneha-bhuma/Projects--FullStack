import { Component,Input } from '@angular/core';
import { Moviemod } from '../Models/moviemodel';
import { Router } from '@angular/router';
import { MovieserviceService } from '../movieservice.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})


export class MovieDetailsComponent {

  constructor(private router:Router,private mov:MovieserviceService){}

  goToArticle(article:any){
    // console.log('clicked',article);
    
    this.mov.setCLickedArticleObj(article)
    this.router.navigate(['/movie-single'])
  }

  @Input() mdet :Moviemod | undefined;  
  
}
