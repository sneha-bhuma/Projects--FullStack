import { Component, Input, OnInit } from '@angular/core';
import { MovieserviceService } from '../movieservice.service';
import jsPDF from 'jspdf';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

 

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})


export class TicketComponent implements OnInit {

  name : string= '';
  noTickets :number = 0;
  date = new Date();
  time:string = '';
  theater:string = '';
  totalPrice:number = 0;


  constructor(private router:Router,private mov :MovieserviceService,private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.name = params['name'],
      this.noTickets = params['noTickets'],
      this.date = params['date'],
      this.time = params['time'],
      this.theater = params['theatre'],
      this.totalPrice = params['total']
    })

    console.log('name is ',this.name);
    
  }

 
  downloadTicketPdf(): void {
    this.mov.generateTicketPdf(this.name, String(this.date),this.time,this.theater,String(this.totalPrice),String(this.noTickets));
  } 


}
