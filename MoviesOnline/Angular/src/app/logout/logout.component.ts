import { Component, OnInit } from '@angular/core';
import { SharingService } from '../sharing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})

export class LogoutComponent implements OnInit{
  constructor(private sharingserice : SharingService,private router:Router){}

   ngOnInit(): void {

    this.sharingserice.doLogout()
    this.router.navigate(['/movie']);

   }
   
}
