import { Component } from '@angular/core';
import { SharingService } from '../sharing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patientnav',
  templateUrl: './patientnav.component.html',
  styleUrls: ['./patientnav.component.css']
})
export class PatientnavComponent {

  isLogged = false;
  loggedin$:any;
  patient_id: string = '';

  constructor(private sharingService: SharingService,
    private router: Router) {
    this.patient_id = this.sharingService.patient_id;
  }
  
  
  ngOnInit(): void {
    if(this.sharingService.isLoggedIn){
      this.isLogged = this.sharingService.isLoggedIn;
      this.loggedin$ = this.sharingService.loggedin$;   //subscribe to the observable
      console.log(this.isLogged);
    }else{
      alert("Please Login")
      this.router.navigate(['/profile'])
    }
  }

}
