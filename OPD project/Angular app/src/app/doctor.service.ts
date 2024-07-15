import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  doctors_url: string = 'http://127.0.0.1:8000/api/doctors/';

  constructor() { }

  get_doctors() {
    return fetch(this.doctors_url).then((res) => res.json())
    .catch((err) => {
      throw err;
    });
  }

  async get_doctor_by_id(doctor_id: string) {
    try {
      const res = await fetch(`${this.doctors_url}${doctor_id}`);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return await res.json();
    } catch (error) {
      console.error("Error:", error);
      throw error
    }
  }

}
