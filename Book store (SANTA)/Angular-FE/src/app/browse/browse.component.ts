import { Component, Input } from '@angular/core';

import { Books } from '../models/Books';
import { BooksService } from '../books.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})
export class BrowseComponent {

  //@Input() bdet: Books | undefined;
  books_list: any;
  selected: string='';
    ngOnInit() {

    this.getBooksFromService();
  }


  constructor(private booksService: BooksService,
    private router: Router,private toastr: ToastrService) {}

  getBooksFromService() {
    this.booksService.getBooks().then((data) => {
      console.log(data);
      this.books_list = data;
      this.filteredBook =data;
      //this.start=false;
    });
      

  }



  getfiltered(){  
    if (!this.selected){
      this.toastr.warning('Please select a Category');

      return this.filteredBook
    } else{
    this.filteredBook = this.books_list.filter((item:Books) => (item.category == this.selected && item.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ));
      this.toastr.success('Filter Applied');
    return this.filteredBook

    }
  
}

getUniqueCategories(): string[] {
  const categories: string[] = [];
  for (let i = 0; i < this.books_list.length; i++) {
    const book: Books = this.books_list[i];
    if (!categories.includes(book.category)) {
      categories.push(book.category);
    }
  }
  return categories;
}



 sendDetails(b:any){
    let id= Number(b.id);
    let title= b.title || '';
    let author= b.author || '';
    let synopsis= (b.synopsis || '');
    let category= b.category || '';
    let isbn= b.isbn || '';
    let price= Number(b.price);
    let image= b.image || '';
    let publication_date= b.publication_date || '';
    this.addtoCart(new Books(id,title,author,category,synopsis,price,isbn,publication_date,image));}

addtoCart(wlist:Books){
    let isAdded: Boolean = this.booksService.addTocart(wlist)
    if (isAdded){
    this.toastr.info('Added to Cart');}
    else {
    this.toastr.error('Already in your Cart');
    }
  }

  
  
  filteredBook: any[] = [];
  
  searchTerm: string = '';




search(): void {
  if (!this.searchTerm.trim()) {
    // If search term is empty, show all cars
    this.toastr.warning('Please provide a title to search');

    this.filteredBook = this.books_list;
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
  this.selected='';
  this.searchTerm = '';
  this.getBooksFromService()
}
}


