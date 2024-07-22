import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieserviceService } from '../movieservice.service';
import { Moviemod } from '../Models/moviemodel';
import { FormBuilder } from '@angular/forms';
import { data } from 'cypress/types/jquery';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrl: './upcoming.component.css'
})
export class UpcomingComponent implements OnInit {

  mdet: any; // Define mdet property here, adjust type as per your actual data structure

  movierelease:any;
  err:string = "";
  constructor(private mov:MovieserviceService,private formBuilder: FormBuilder){}
  ngOnInit(): void {
    this.getmovierelease();
    
  }
  

  
  
  getmovierelease(){
    console.log("upcoming ts");
    
    this.mov.getMoviesrelease().then((data) => {
      this.movierelease=data;
      console.log(this.movierelease);
    })
    .catch(() => {
      this.err = "Error Fetching Upcoming Movies";
    });
  }
  

}

