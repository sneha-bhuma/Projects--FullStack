import { Injectable } from '@angular/core';
import { Emp } from './Models/emp';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmpsService {

  _url : string = 'http://localhost:3000/lap/' ;
  

  indCnt:number = 0;

  emp:Emp[] = [];
   

  constructor() { }

  // get all employees
  getEmps() {
    return fetch(this._url).then((res) => res.json());
  }


  addEmp(emp:Emp){
    return fetch(this._url,{
      method : 'POST',
      headers : {
        'Content-Type' :'application/jason',
      },

      body :JSON.stringify(emp),
    });

  };

  delEmp(emp:Emp){
    console.log('called delete');
    if(this.indCnt > 0){
      this.indCnt --;
    }    
    
    return fetch(this._url + emp.id,{
      method : 'DELETE',
      headers : {
        'Content-Type' :'application/jason',
      },

      body :JSON.stringify(emp),
    }).then((res) => {
      console.log(res);
      
    });

  }


  empStar(emp:Emp){ 
    // console.log('called update');    

    if(emp.ind == 'Mark'){
      emp.name = emp.name + '*';
      emp.ind = 'Unmark'
      this.indCnt ++;

    }else{
      emp.name = emp.name.slice(0,-1)
      emp.ind = 'Mark'
      console.log('ummarking called', emp.name);
      this.indCnt --;

    }

    return fetch(this._url + emp.id,{
      method : 'PATCH',
      headers : {
        'Content-Type' :'application/jason',
      },

      body :JSON.stringify(emp),
    }).then((res) => {
      console.log(res);
      
    });

  }


}
