export class patchPatient {
    
    patient_name: string = '';
    dob: string = '';
    phone: string = '';
    email: string = '';
    allergies: string = '';
    medications: string = '';
    

    constructor(
        patient_name: string,
        dob: string,
        phone: string,
        email: string,
        allergies: string,
        medications: string
        
    ) {
        
        this.patient_name = patient_name;
        this.dob = dob;
        this.phone = phone;
        this.email = email;
        this.allergies = allergies;
        this.medications = medications;
        
    }
}
