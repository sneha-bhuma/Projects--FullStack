export class Moviemod {

    id: string;    
    rating: string ;
    name: string ;    
    desc: string;
    image: string ;
    price:number;


    constructor(id:string,rating:string,name:string,desc:string,image:string,price:number){
      this.id = id;
      this.rating = rating;   
      this.name = name;        
      this.desc = desc;
      this.image = image;
      this.price = price;
    }

  }

  export class Moviemod1 {

    id: string;    
    rating: string ;
    name: string ;    
    desc: string;
    image: string ;


    constructor(id:string,rating:string,name:string,desc:string,image:string){
      this.id = id;
      this.rating = rating;   
      this.name = name;        
      this.desc = desc;
      this.image = image;
    }

  }