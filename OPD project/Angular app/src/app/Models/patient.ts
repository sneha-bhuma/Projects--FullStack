export class Patient {
    patient_name: string = '';
    dob: string = '';
    sex: string = '';
    height: number;
    weight: number;
    marital_status: string = '';
    phone: string = '';
    email: string = '';
    allergies: string = '';
    medications: string = '';
    address1: string = '';
    address2: string = '';
    city: string = '';
    state: string = '';
    zipcode: string = '';
    emg_contact_name: string = '';
    emg_contact_phone: string = '';

    constructor(
        patient_name: string,
        dob: string,
        sex: string,
        height: number,
        weight: number,
        marital_status: string,
        phone: string,
        email: string,
        allergies: string,
        medications: string,
        address1: string,
        address2: string,
        city: string,
        state: string,
        zipcode: string,
        emg_contact_name: string,
        emg_contact_phone: string
    ) {
        this.patient_name = patient_name;
        this.dob = dob;
        this.sex = sex;
        this.height = height;
        this.weight = weight;
        this.marital_status = marital_status;
        this.phone = phone;
        this.email = email;
        this.allergies = allergies;
        this.medications = medications;
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
        this.emg_contact_name = emg_contact_name;
        this.emg_contact_phone = emg_contact_phone;
    }
}
