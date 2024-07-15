import { Component } from '@angular/core';
import { SharingService } from '../sharing.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-docnav',
  templateUrl: './docnav.component.html',
  styleUrls: ['./docnav.component.css']
})
export class DocnavComponent {
  isLogged = false;
  loggedin$:any;
  
  constructor(private service: SharingService,
              private router: Router,
              private route: ActivatedRoute,
               ) {}


  ngOnInit(): void {
    this.isLogged = this.service.isLoggedIn;
    this.loggedin$=this.service.loggedin$;   //subscribe to the observable
    console.log(this.isLogged);
   
  }

}
