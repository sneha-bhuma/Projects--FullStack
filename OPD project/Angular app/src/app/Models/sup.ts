export class Superuser{
    email: string;
    name:string;
    is_superuser:boolean;

constructor(email: string, name:string, is_superuser:boolean){
    this.email=email;
    this.name=name;
    this.is_superuser=is_superuser;
}

}