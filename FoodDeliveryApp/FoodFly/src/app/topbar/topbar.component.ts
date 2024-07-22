import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginpopComponent } from '../loginpop/loginpop.component';
import { FavService } from '../fav.service';
import { SharingService } from '../sharing.service';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  isLogged = false;
  loggedin$: any;
  count: number = 0;
  countcart: number = 0;
  totalQuantity: number = 0;
  
  constructor(
    private dialog: MatDialog,
    private favservice: FavService,
    private service: SharingService,
    private userAuthService: UserAuthService
  ) {}

  ngOnInit(): void {
    this.loggedin$ = this.service.getAuthStatus();
    this.service.getAuthStatus().subscribe(isLoggedIn => {
      this.isLogged = isLoggedIn;
    });

    // Subscribe to count observable from FavService
    this.favservice.getCountObservable().subscribe((count) => {
      this.count = count;
    });


     // Subscribe to totalQuantity from SharingService
     this.service.getTotalQuantity().subscribe(quantity => {
      this.totalQuantity = quantity;
    });
  }

  openLoginDialog(): void {
    this.dialog.open(LoginpopComponent, {
      width: '400px',
    });
  }
}
