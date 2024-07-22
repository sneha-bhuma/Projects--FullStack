import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from './user-auth.service';
import { SharingService } from './sharing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Food Fly App';

  constructor(
    private userAuthService: UserAuthService,
    private sharingService: SharingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.userAuthService.getToken();
    if (token) {
      if (this.userAuthService.getIsSuperuser()) {
        this.sharingService.doAdminLogin();
      } else {
        this.sharingService.doLogin();
      }
      // Optionally navigate to a default route if user is logged in
      this.router.navigate(['/foods']);
    } else {
      this.router.navigate(['/main']);
    }
  }
}
