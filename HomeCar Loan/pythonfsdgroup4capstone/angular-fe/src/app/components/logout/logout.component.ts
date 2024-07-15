import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharingService } from '../../services/sharing.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(
    private sharingService: SharingService,
    private router: Router) { }

  ngOnInit(): void {
    this.sharingService.doLogout();
  }

  logout(name: string) {
    if (confirm("Are you sure you want to logout?")) {
      this.sharingService.doLogout();
      this.router.navigate(['login']);
    } else {
      console.log("Logout cancelled");
    }
  }

  SubmitNo() {
    this.sharingService.doNotLogout();
    this.router.navigate(['/welcome']);
  }

}
