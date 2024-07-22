import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit{

  constructor(private toastr: ToastrService) {}
  ngOnInit(): void {
    this.toastr.success('Hello world!', 'Toastr fun!');  
    this.toastr.error('Hello world!', 'Toastr Err!');  
  }

  tryToaster() {
    this.toastr.success('Hello world!', 'function');  
  }

  // showSuccess() {
  //   this.toastr.success('Hello world!', 'Toastr fun!');
  // }

}
