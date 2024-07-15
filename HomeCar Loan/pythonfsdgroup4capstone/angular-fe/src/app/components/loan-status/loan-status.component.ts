import { Component } from '@angular/core';
import { StatusService } from '../../services/status.service';

@Component({
  selector: 'app-loan-status',
  templateUrl: './loan-status.component.html',
  styleUrl: './loan-status.component.css'
})
export class LoanStatusComponent {
  emps: any[] = [];
  userEmail: string | null = ''; // userEmail available after login

  constructor(private empService: StatusService) {}

  ngOnInit() {
    console.log("oninit working");
    
    // Retrieve userEmail from local storage
    this.userEmail = localStorage.getItem('email'); // Retrieve userEmail from local storage
    console.log("Retrieved userEmail: ",this.userEmail);
    
    if (this.userEmail) {
      this.getEmpsFromService(this.userEmail); // Fetch data based on email
    }
  }

  getEmpsFromService(userEmail: string) {
    console.log("inside fun",userEmail);
    
    this.empService.getEmps(userEmail)
    .then((data) => {
      console.log(data);  
      this.emps = data;
    }).catch((err) => {
      console.log(err);
    });
  }

  


}
