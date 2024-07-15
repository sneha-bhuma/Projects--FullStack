import { Component } from '@angular/core';
 
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CheckoutService } from '../checkout.service';
import { BooksService } from '../books.service';

 
@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrl: './front-page.component.css'
})
export class FrontPageComponent {
  saleInfo: any;
  allBooks:any;
  fictionCount:number=0;
  nfictionCount:number=0;
  fantasyCount:number=0;
  classicCount:number=0;
  books_list: any;
  filteredBook: any;
  searchTerm: any;
  chartOptions: any={};
  thriller: number=0;
  drama: number=0;
  classic: number=0;
 
 
constructor(private router: Router,private toastr: ToastrService, private checkoutService: CheckoutService,private booksService: BooksService) {}
 
ngOnInit() {
  
  this.getBooksFromService();
  this.getSalesFromService();
  
  

}

getBooksFromService() {
    this.booksService.getBooks().then((data) => {
      console.log(data);
      this.books_list = data;
    });}
getSalesFromService(){
  this.checkoutService.getSales().then((data) => {
    console.log(data);
    this.saleInfo = data;
    this.allBooks = data.map((sale:any) => sale.books).flat();
    this.getBooksCount();  
  });
}
 
 
 


 
 search(): void {
  if (!this.searchTerm.trim()) {
    // If search term is empty, show all cars
    this.filteredBook = [];
  } else {
    // Filter based on search term
    this.filteredBook = this.books_list.filter((Books: { title: string; }) =>
      Books.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    console.log(this.filteredBook.length);
    
    if (this.filteredBook.length==0){
    this.toastr.info('No Matching Records');}
  }
}

reset(){
  
  this.searchTerm = '';
  this.filteredBook =[];
}

getBooksCount() {
  // for (let r of reviews){
  //   this.totalRating = this.totalRating+Number(r.rating)
  // }
  for (let i = 0; i < this.allBooks.length; i++) {
    const book = this.allBooks[i];
    if (book.category === 'Fiction') {
      this.fictionCount += 1;
    }
    if (book.category === 'Classic Fiction') {
      this.classicCount += 1;
    }
    if (book.category === 'Fantasy') {
      this.fantasyCount += 1;
    }
    if (book.category === 'Non-fiction') {
      this.nfictionCount += 1;
    }
    if (book.category === 'Thriller') {
      this.thriller += 1;
    }
    if (book.category === 'Drama') {
      this.drama += 1;
    }
    if (book.category === 'Classic') {
      this.classic += 1;
    }
  }
  this.fictionCount = Number((this.fictionCount*100)/this.allBooks.length);
  this.nfictionCount = Number((this.nfictionCount*100)/this.allBooks.length);
  this.fantasyCount = Number((this.fantasyCount*100)/this.allBooks.length);
  this.classicCount = Number((this.classicCount*100)/this.allBooks.length);
  this.thriller = Number((this.thriller*100)/this.allBooks.length);
  this.drama = Number((this.drama*100)/this.allBooks.length);
  this.classic = Number((this.classic*100)/this.allBooks.length);
  console.log("fiction",(this.fictionCount));
  console.log("nonfiction",(this.nfictionCount));
  console.log("fantasyfiction",(this.fantasyCount));
  console.log("classicfiction",Number(this.classicCount));
  this.chartOptions = {
      animationEnabled: true,
      
      title: {
        text: 'Popular Categories'
      },
      data: [{
        type: 'pie',
        startAngle: -90,
        indexLabel: '{name}: {y}',
        yValueFormatString: '#,###.##\'%\'',
        dataPoints: [
          { y: this.fictionCount, name: 'Fiction' },
          { y: this.nfictionCount, name: 'Non Fiction' },
          { y: this.classicCount, name: 'Classic Fiction' },
          { y: this.thriller, name: 'Thriller' },
          { y: this.drama, name: 'Drama' },
          { y: this.classic, name: 'Classic' },
          { y: this.fantasyCount, name: 'Fantasy' }
        ]
      }]
    };
}

}