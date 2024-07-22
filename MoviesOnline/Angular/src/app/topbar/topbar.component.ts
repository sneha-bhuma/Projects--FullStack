import { Component, OnInit } from '@angular/core';
import { SharingService } from '../sharing.service';
import { Router } from '@angular/router';

 

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})


export class TopbarComponent implements OnInit {
   
   
  // constructor(private signoutModalService: BsModalService) {}
  constructor(private service: SharingService,private router:Router ){}

  isLogged = false;
  loggedin$:any;

  ngOnInit(): void {
    
    this.isLogged = this.service.isLoggedIn;
    this.loggedin$ = this.service.loggedin$ //subscribing here
  }

  logoutConf(){
    this.router.navigate(['/logout']);
  }
  

  loginFn(){
    this.router.navigate(['/login2']);

  }
}
