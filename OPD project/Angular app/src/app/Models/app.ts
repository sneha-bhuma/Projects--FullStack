import { Time } from "@angular/common";

export class App {
    patient_id: string = '';
    patient_name: string = '';
    speciality: string = '';
    doctor_id: string = '';
    appointment_date: Date;
    slot: string = '';
    problem_description: string = '';
    purpose: string | undefined;
    doctorName: any;
    status:string="Not Approved";

    constructor(patient_id: string, patient_name: string, speciality: string, doctor_id: string, appointment_date: Date,
        slot: string, problem_description: string,status:string) {
        this.patient_id = patient_id;
        this.patient_name = patient_name;
        this.speciality = speciality;
        this.doctor_id = doctor_id;
        this.appointment_date = appointment_date;
        this.slot = slot;
        this.problem_description = problem_description;
        this.status=status;
    }
}
