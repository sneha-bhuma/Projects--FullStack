import { Injectable } from '@angular/core';
import { Appointment } from './Models/appointment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  patient_url: string = 'http://127.0.0.1:8000/api/patients/';
  appointments_url: string = 'http://127.0.0.1:8000/api/appointments/';

  constructor() { }

  book_appointment(appointment: Appointment) {
    return fetch(this.appointments_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(appointment),
    }).then((res) => {
      return res.text();
    }).catch((error) => {
      return `Some error while booking the appointment ${error}`
    })
  }

  get_appointments() {
    return fetch(`${this.appointments_url}`).then(
      (res) => res.json());
  } 
  get_appointments_by_id(patient_id: string) {
    return fetch(`${this.appointments_url}${patient_id}`).then(
      (res) => res.json());
  }

  cancelAppointment(appointmentId: string) {
    return fetch(`${this.appointments_url}delete/${appointmentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((res) =>{
      return res.text();
    }).catch((error) => {
      throw `Some error occured while cancelling the appointment. ${error}`;
    })
  }

  rescheduleAppointment(appointment_id : string, appointment_date : Date, slot : string){
    return fetch(`${this.appointments_url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        appointment_id: appointment_id,
        appointment_date: appointment_date,
        slot: slot,
      }),
    }).then((res) =>{
      return res.text();
    }).catch((error) => {
      console.log(error);
      throw `Some error occured while rescheduling the appointment. ${error}`;
    })
  }

}
