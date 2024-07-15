import { Component } from '@angular/core';
import { SharingService } from '../sharing.service';
import { BooksService } from '../books.service';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {
count: any
  
  isLogged =false;
  loggedin$: any;
  admin$: any;
  count$:any;
  constructor(private service: SharingService,private books: BooksService){}
  
  
  ngOnInit(): void {
    this.isLogged = this.service.isLoggedIn;
    this.loggedin$ = this.service.loggedin$;
    this.admin$ = this.service.admin$;
    this.count$=this.books.count$
}}
