export class  Reg{
    name:string;
    email:string;
    password:string;
    mobile_number:string;
    user_type:string;
    date_of_birth: string;
   gender: string = "";
  marital_status: string = "";
  address: string = "";
  occupation: string = "";
  monthly_income: number = 0;
  bank_account_details: string = "";
    // loan_amount: number=0;
    // tenure: number=0;
    // status: string="";
    



//creating constructor to add data to service/api & passing it in emp.components.ts under addEmpsFromService(emp:Emp)
constructor(
    name:string,
    email:string,
    password:string,
    mobile_number:string,
    user_type:string,
    date_of_birth: string = "",
    gender: string = "",
    marital_status: string = "",
    address: string = "",
    occupation: string = "",
    monthly_income: number = 0,
    bank_account_details: string = ""
    
    // tenure: 0,
    // status:string,
    
   
    // loan_amount:0
            
){
    this.name = name;
    this.email = email;
    this.password = password;
    this.mobile_number = mobile_number;
    this.user_type = user_type;
    this.date_of_birth = date_of_birth;
    this.gender = gender;
    this.marital_status = marital_status;
    this.address = address;
    this.occupation = occupation;
    this.monthly_income = monthly_income;
    this.bank_account_details = bank_account_details;
    // this.loan_amount = loan_amount;
    // this.tenure = tenure;
    // this.status=status;


}
}