import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  generated_user_id : string = '';
  constructor() { }

  patient_url: string = 'http://127.0.0.1:8000/api/patients/';

  register(patient: any) {
    return fetch(this.patient_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patient),
    }).then((res) => {
      if (res.status === 400) {
        throw `Bad Request: The server could not understand the request due to invalid data ${patient}.`;
      } else {
        return res.text();
      }
    }).catch((error) => {
      throw `Some error occurred while registering the patient. ${error}`;
    })
  }
  
  get_patients() {
    return fetch(this.patient_url).then((res) => res.json());
  }
  getPatientById(id: string) {
    return fetch(this.patient_url + id).then((res) => res.json());
  }

  async getPatientByEmail(email: string) {
      const res = await fetch(`${this.patient_url}email/${email}/`)
      if (res.ok == true) {
        return res.json();
      } else {
        return false;
      }
  }

  updatePatient(id:string){
   
    return fetch(`${this.patient_url}${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(id),
    }).then((res) =>{
      return res.json();
    }).catch((error) => {
      throw `Some error occured while updating the patient. ${error}`;
    })
  }

}
