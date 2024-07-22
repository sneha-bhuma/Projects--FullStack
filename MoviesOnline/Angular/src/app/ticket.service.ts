import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private ticket = new BehaviorSubject<{ NumberofTickets: any, totalprice: any,
                                         selectedDate:any, theater:any
  } >
  ( {NumberofTickets: null, totalprice: null,selectedDate:null, theater:null} );
  data$ = this.ticket.asObservable();
  

  constructor() { }

  changeTicket(NumberofTickets: any, totalprice: any, selectedDate: any, theater: any, value: any) {
    this.ticket.next({NumberofTickets,totalprice,selectedDate, theater});
    
  }
}
