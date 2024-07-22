import { Injectable } from '@angular/core';
import { Moviemod } from './Models/moviemodel';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})

export class MovieserviceService {

  constructor() { }  

  _url : string = 'http://localhost:3000/movies/' ;
  url1 :string = 'http://127.0.0.1:8000/api/movies/';
  url2 : string = 'http://127.0.0.1:8000/api/tickets/';
  url3 : string = 'http://127.0.0.1:8000/api/moviesrelease/';
 
 

  // get all employees
  getMovies() {
    return fetch(this.url1).then((res) => res.json());
  }
  getMoviesrelease() {
    return fetch(this.url3).then((res) => res.json());
    console.log("inside movie release");
  }



  addTicket(name:string,date:string,time:string,theatre:string,total:number,noSeats:string){
    return fetch(this.url2,{
      method : 'POST',
      headers : {
        'Content-Type' :'application/json',
      },

      body :JSON.stringify({
        name:name,
        date:date,
        time:time,
        theatre:theatre,
        total:total,
        noSeats:noSeats
      })
    })

  };


  addMovie(mov:any){
    return fetch(this._url,{
      method : 'POST',
      headers : {
        'Content-Type' :'application/json',
      },

      body :JSON.stringify(mov),
    });

  };


  clickedArticle : any = {}; 
  fav : any = [];

  setCLickedArticleObj(obj :any){
     this.clickedArticle  = obj;
  }
  
  getClickedArticle(){
     return this.clickedArticle;  
  }

  setFav(obj:any){
    this.fav.push(obj);
    
  }

  getFav(){
    return this.fav;
  }

  
  generateTicketPdf(movieName: string, date: string, time: string,theatre:string,totalPrice:string,noTickets:string): void {
    const doc = new jsPDF();
 
     
    doc.setFontSize(18);
    doc.text(`Ticket Details`, 20, 20);
 
    doc.setFontSize(12);
    doc.text(`Movie: ${movieName}`, 20, 30);
    doc.text(`Date  : ${date}`, 20, 40);
    doc.text(`Time: ${time}`, 20, 50);
    doc.text(`Theatre: ${theatre}`, 20, 60);
    doc.text(`No of Tickets: ${noTickets}`, 20, 70);
    doc.text(`Total Price: ${totalPrice}`, 20, 80);
      
    doc.save('ticket.pdf');
  }
  
 
  
}
