import { Component } from '@angular/core';

import{Book} from './book'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})



export class SearchComponent {

  minPrice:number=0;
  maxPrice:number=0;
  err:string='';
  

  books:Book[] = [
    {id:1,title:'Book1',author:'auth1',price:100},
    {id:2,title:'Book2',author:'auth2',price:200},
    {id:3,title:'Book3',author:'auth3',price:300}

  ]

  filteredBooks:Book[] = [];

  constructor(){

    function greet(name:string|undefined) {
      if (name === undefined){
        console.log("hello guest");
        
      }else{
        console.log(`hello, ${name}`);
        
      }
      
    }
  
    greet('a')



    function greet1(name ?:string) {
      if (name === undefined){
        console.log("hello guest");
        
      }else{
        console.log(`hello, ${name}`);
        
      }
      
    }
  
    greet1()


     
    
  }

 
  
 
  //  filteredBookFn(minPrice:number,maxPrice:number){
    filteredBookFn(){
    this.filteredBooks = this.books.filter(item => {
       return item.price < this.maxPrice && item.price > this.minPrice;
    })

    if (this.minPrice > this.maxPrice){
      this.err = 'Min price cannot be more than max';
    }

    if (this.filteredBooks.length < 1){
      this.err = 'No books found';
    }

    if (this.filteredBooks.length >= 1){
      this.minPrice = 0;
      this.maxPrice = 0;
      this.err='';
      
    }


  }

  reset(){
    this.minPrice = 0;
    this.maxPrice = 0;
    this.err='';
    this.filteredBooks = [];
  }



 
}
