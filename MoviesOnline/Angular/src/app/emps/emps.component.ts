import { Component, OnInit } from '@angular/core';
import { EmpsService} from '../emps.service';
import { FormBuilder,Validators } from '@angular/forms';
import {Emp} from '../Models/emp'

@Component({
  selector: 'app-emps',
  templateUrl: './emps.component.html',
  styleUrl: './emps.component.css'
})

export class EmpsComponent implements OnInit {

  err:string = '';
  emps : any =[];
  starcnt:number = 0;

  ngOnInit(): void {
    
    this.getEmpsFromService();    

  }

  public constructor( private empsService:EmpsService,private formBuilder: FormBuilder){ }

    getEmpsFromService(){
      this.empsService.getEmps().then((data) => {

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
      let name = this.profileForm.value.name || '';
      let salary = Number(this.profileForm.value.salary);
      let image = this.profileForm.value.image || '';

      this.addEmp(new Emp(id,name,salary,image,'Mark'));
      
      this.profileForm.reset()
    }


  profileForm = this.formBuilder.group({
    id: ['', Validators.required],
    name: [''],
    salary: [''],
    image: ['']
  
  });
  
  addEmp(emp : Emp){
      this.empsService.addEmp(emp).then(() => {this.getEmpsFromService()  });
  }

  delEmp(emp:Emp){
    // console.log(emp);
    this.starcnt--;
    this.empsService.delEmp(emp).then(() => {this.getEmpsFromService() });
    
  }

  markEmp(emp:Emp){
    // emp.star = true;     
    // console.log(emp.name.length);      
       
      this.empsService.empStar(emp).then(() =>{this.getEmpsFromService()})
      this.starcnt = this.empsService.indCnt;
        
  }


}
