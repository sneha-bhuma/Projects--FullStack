export class Doctor {
    doctor_id: string = '';
    doctor_name: string = '';    
    speciality: string = '';
    

    constructor(doctor_id: string, doctor_name: string, speciality: string) {
        this.doctor_id = doctor_id;
        this.doctor_name = doctor_name;
        this.speciality = speciality;
        
    }
}
