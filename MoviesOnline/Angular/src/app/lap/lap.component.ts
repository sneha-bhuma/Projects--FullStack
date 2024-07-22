 import { Component, OnInit } from '@angular/core';
import { EmpsService} from '../emps.service';
import { FormBuilder,Validators } from '@angular/forms';
import {Lap} from '../Models/lap'
import { LapserviceService } from '../lapservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lap',
  templateUrl: './lap.component.html',
  styleUrl: './lap.component.css'
})

export class LapComponent  implements OnInit {


  err:string = '';
  emps : any =[];
  starcnt:number = 0;

  ngOnInit(): void {
    
    this.getEmpsFromService();    

  }

public constructor( private toastr: ToastrService, private lapservice:LapserviceService,private formBuilder: FormBuilder){ }

    getEmpsFromService(){
      this.lapservice.getEmps().then((data) => {

        // console.log(data);
        this.emps = data; 
        
      })
      .catch((err) =>{
        console.log(err);
        this.err = "Error fetching data...check server";
        
      });   

    };


    onSubmit() {
      console.warn(this.profileForm.value);
      console.warn(this.profileForm.value.id);

      let id = String(this.profileForm.value.id) || '';
      let model = String(this.profileForm.value.model) || '';
      let company = String(this.profileForm.value.company);
      let price = Number(this.profileForm.value.price) ;

      this.addEmp(new Lap(id,model,company,price,'Mark'));
      
      this.profileForm.reset()
    }


  profileForm = this.formBuilder.group({
    id: ['', Validators.required],
    model: [''],
    company: [''],
    price: ['']
  
  });
  
  addEmp(lap : Lap){
      this.lapservice.addEmp(lap).then(() => {this.getEmpsFromService()  });
      this.toastr.success('Lap added!');
  }

  delEmp(lap:Lap){
    // console.log(emp);
    // this.starcnt--;
    this.lapservice.delEmp(lap).then(() => {this.getEmpsFromService() });
    this.toastr.error('Lap deleted!');
    // this.starcnt = this.lapservice.indCnt;
    
  }

  markEmp(lap:Lap){
    // emp.star = true;     
    // console.log(emp.name.length);      
       
      this.lapservice.empStar(lap).then(() =>{this.getEmpsFromService()})
      this.starcnt = this.lapservice.indCnt;
        
  }


}
