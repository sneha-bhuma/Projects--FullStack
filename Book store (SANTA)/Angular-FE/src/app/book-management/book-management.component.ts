import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Add_Books } from '../models/add books';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-book-management',
  templateUrl: './book-management.component.html',
  styleUrl: './book-management.component.css'     
})
export class BookManagementComponent implements OnInit{
  flag : boolean = false;
  books: Add_Books[] = [];
  bookForm = this.fb.group({
    id : [''],
    title: ['', Validators.required],
    author: ['', Validators.required],
    category: ['', Validators.required],
    synopsis: ['', Validators.required],
    price: ['', Validators.required],
    isbn: ['', Validators.required],
    publication_date: ['', Validators.required],
    image: ['']
  });
  constructor(
    private booksService: BooksService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.getBookFromService();
  }
  // Fetch all Books
  getBookFromService() {
    this.booksService.getBooks().then((data) => {
      console.log(data);
      this.books = data;
    });
  }
  onSubmit() {
    if (this.bookForm.valid) {
      let id = Number(this.bookForm.value.id);
      let title = this.bookForm.value.title || '';
      let author = this.bookForm.value.author || '';
      let category = this.bookForm.value.category || '';
      let synopsis = this.bookForm.value.synopsis || '';
      let price = Number(this.bookForm.value.price);
      let isbn = this.bookForm.value.isbn || '';
      let publication_date = this.bookForm.value.publication_date || '';
      let image = this.bookForm.value.image || '';
      if (image ===''){
        image = "../../assets/images/default.jpg"
      }
      for ( let Book of this.books){
        if (Book.title.toLowerCase() === title.toLowerCase()) {
          this.flag = true;
        }
      }
      if (this.flag == true) {
        this.toastr.error('Book already exists!');     
      } else {
      this.addBook(new Add_Books(title, id, author, category, synopsis, price, isbn, publication_date, image));
      console.log(title, author, category, synopsis, price, publication_date);
      this.toastr.success('Book added Successful!');
      this.bookForm.reset();
    } 
  } else {
      this.toastr.error('Please fill out all the details.');
    }
  }
  addBook(book: Add_Books) {
    console.log(book)
    this.booksService.addBook(book).then(() => {
      this.getBookFromService();
    });
  }
 
  deleteBook(book: Add_Books) {  
      this.booksService.deleteBook(book.id)
      .then(()=> 
        {this.getBookFromService()});
      this.toastr.success('Book deleted successfully!');
    }
  }