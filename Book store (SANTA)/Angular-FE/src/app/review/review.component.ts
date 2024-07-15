import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { ReviewsService } from '../reviews.service';
import { review } from '../models/add review';
import { ToastrService } from 'ngx-toastr';
import { BooksService } from '../books.service';
import { SharingService } from '../sharing.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewComponent {
  name$: any;
  name:string=""
  constructor(private reviewservice: ReviewsService,private bookservice: BooksService, private formBuilder: FormBuilder, private toastr: ToastrService,private sharingService: SharingService) { }
  reviews: any;
  bookid:any;
  bookimage:any;
  books:any
  list:string[]=[]
  start: boolean = true;
  error: string = '';
  formvalues = '';
  selected: string=''
  rating: any;
  ngOnInit(): void {
    this.name$=this.sharingService.username
    console.log(this.name$['_buffer'])
    this.name=this.name$['_buffer']
    this.name=this.name[0]
    console.log(this.name)

    this.getreviews()
    this.getBooks()
    // this.reviewForm.controls['name'].disable()
  }
  getreviews() {
  this.reviewservice
      .getReview().then((data) => {this.reviews = data; this.start=false})
      .catch((err) => {this.toastr.error('No Reviews Available');

      });
    }
  
  getBooks(){
    this.bookservice
      .getBooks().then((data) => {this.books = data; this.start=false})
      .catch((err) => {this.toastr.error('No Books Available');

      });
  }
  reviewForm = this.formBuilder.group({
    title: ['', Validators.required],
    
    rating: ['', Validators.required],
    desc: ['', Validators.required]
    
  });

  onSubmit() {
    if (this.name==undefined){
      this.toastr.error('Please Login To Add Your Review')
    }else{
      if (this.rating=="" || this.selected=="" || this.reviewForm.value.desc==""){
      this.toastr.error('Please Provide Proper Comments')
      }else{
    for (let book of this.books){
      if (this.selected == book.title){
          this.bookid = book['id']
          this.bookimage = book['image']
          console.log(this.bookimage)
      }
    }
    this.bookid = this.bookid.toString()
    let title = this.selected;
    let name = this.name;
    let rating = Number(this.rating)
    
    let image = this.bookimage
    let desc = this.reviewForm.value.desc || '';
    this.addReview(new review(this.bookid,title, name, rating, desc,image));
    this.reviewForm.reset()
    this.selected=""
    this.rating=""}
  }}

  addReview(review: review) {
    console.log(review)
    this.reviewservice.addReview(review).then(() => { this.getreviews() });
    this.toastr.info('You Just Posted a Review');
    this.toastr.success('Review Posted succesfully.');

  }

  
}