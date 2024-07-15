import { Component, OnInit } from '@angular/core';
import { SharingService } from '../../services/sharing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  menuValue: boolean = false;
  menu_icon: string = 'bi bi-list';

  isLogged =false;
  loggedin$: any;

  isApprover = false; // Flag to check if logged in as approver

  userEmail: string | null = '';

  constructor(private sharingService: SharingService) {}
  ngOnInit(): void {
    // Subscribe to the login status
    this.sharingService.loggedin$.subscribe(status => {
    this.isLoggedIn = status === 1;  //enable logout it changes to 0 when disable
    //logout enable upon login
    this.isLogged=this.sharingService.isLoggedIn;
    this.loggedin$=this.sharingService.loggedin$;
    console.log(this.isLogged); 
    }); 
    
    //to show profile name
    this.userEmail = localStorage.getItem('email');

  }

  toggleMenu() {
    this.menuValue = !this.menuValue;
    this.menu_icon = this.menuValue ? 'bi bi-x' : 'bi bi-list';
  }

  closeMenu() {
    this.menuValue = false;
    this.menu_icon = 'bi bi-list';
  }
  openMenu() {
    this.menuValue = !this.menuValue;
    this.menu_icon = this.menuValue ? 'bi bi-x' : 'bi bi-list';
  }

}
