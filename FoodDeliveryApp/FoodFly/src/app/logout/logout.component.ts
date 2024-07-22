import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharingService } from '../sharing.service';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private sharingservice: SharingService,
    private userAuthService: UserAuthService
  ) { }

  ngOnInit(): void {
    // Optionally, you can call this.logout() here if you want to log out immediately on component load
  }

  logout() {
    // Remove token from local storage
    this.userAuthService.clearToken();
    
    // Perform additional logout operations
    this.sharingservice.doLogout();
    
    // Navigate to main page
    this.router.navigate(['/main']);
    
    // Show success message
    this.toastr.success("Logged out successfully");
  }

  cancel() {
   // window.alert(window.location.href);
    // Stay on the current page, no navigation needed
  }
}
