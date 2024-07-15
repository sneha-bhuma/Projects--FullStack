import { Component } from '@angular/core';
import { SharingService } from '../sharing.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BooksService } from '../books.service';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private toastr: ToastrService,
    private router: Router,
    private sharingService: SharingService, private booksService: BooksService){}
 
  user: boolean   = this.sharingService.isLoggedIn;
 
  ngOnInit(): void {
    this.booksService.getcart()
 
}
SubmitNo(){
  this.sharingService.doNotLogout();
  this.toastr.success(' Thank you Staying Back');
  this.router.navigate(['/browse']);
  }
  Submit(){
    this.booksService.deleteAll()
    this.sharingService.doLogout();
  this.toastr.error('Sorry To See you Leave');
  }
}
