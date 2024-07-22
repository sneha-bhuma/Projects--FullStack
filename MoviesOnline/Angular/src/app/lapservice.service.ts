import { Injectable } from '@angular/core';
import { Lap } from './Models/lap';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class LapserviceService {

  constructor() { }
  
  _url : string = 'http://localhost:3000/lap/' ;
  

  indCnt:number = 0;

   // get all employees
  getEmps() {
    return fetch(this._url).then((res) => res.json());
  }


  addEmp(lap:Lap){
    return fetch(this._url,{
      method : 'POST',
      headers : {
        'Content-Type' :'application/jason',
      },

      body :JSON.stringify(lap),
    });

  };

  delEmp(emp:Lap){
    console.log('called delete');
    if(this.indCnt > 0){
      this.indCnt --;
    }    
    
    if(emp.ind == 'Unmark'){
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


  empStar(lap:Lap){ 
    // console.log('called update');    

    if(lap.ind == 'Mark'){
      lap.model = lap.model + '*';
      lap.ind = 'Unmark'
      this.indCnt ++;

    }else{
      lap.model = lap.model.slice(0,-1)
      lap.ind = 'Mark'
      console.log('ummarking called', lap.model);
      this.indCnt --;

    }

    return fetch(this._url + lap.id,{
      method : 'PATCH',
      headers : {
        'Content-Type' :'application/jason',
      },

      body :JSON.stringify(lap),
    }).then((res) => {
      console.log(res);
      
    });

  }



}
