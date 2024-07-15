import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharingService } from '../sharing.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(private sharingService: SharingService,
    private router: Router,) { }
  ngOnInit() {
    this.sharingService.doLogout()
  }
  getURL() {
    let currentUrl = this.router.url;
  }
  ifYes() {
    this.router.navigate(['/profile']);
  }
  ifNo() {
    console.log("currentUrl");

  }

}
