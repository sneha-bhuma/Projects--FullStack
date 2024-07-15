import { Component } from '@angular/core';
import { SharingService } from './services/sharing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ng-app';
  isLoggedIn: boolean = false;

  constructor(private sharingService: SharingService) {
    this.sharingService.loggedin$.subscribe((status) => {
      this.isLoggedIn = status === 1;
    });
  }

  logout() {
    this.sharingService.doLogout();
  }
}