import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { ReviewsService } from '../reviews.service';
import { review } from '../models/reviews';
import { ToastrService } from 'ngx-toastr';
import { BooksService } from '../books.service';
import { SharingService } from '../sharing.service';
 
@Component({
  selector: 'app-review-management',
  templateUrl: './review-management.component.html',
  styleUrl: './review-management.component.css'
})
export class ReviewManagementComponent {
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
    
 
    this.getReview()
    this.getBooks()
    
    // this.reviewForm.controls['name'].disable()
  }
  getReview() {
  this.reviewservice
      .getReview().then((data) => {this.reviews = data; this.start=false})
      .catch((err) => {this.toastr.error('No Reviews Available');
        
      });
    }
 
    reviewForm = this.formBuilder.group({
      title: ['', Validators.required],
      rating: ['', Validators.required],
      desc: ['', Validators.required]
    });
  getBooks(){
    this.bookservice
      .getBooks().then((data) => {this.books = data; this.start=false})
      .catch((err) => {this.toastr.error('No Books Available');
 
      });
  }
 
  deleteReview(review: review) {
    this.reviewservice.deleteReview(review.id)
    .then(()=> 
      {this.getReview()});
    this.toastr.success('user deleted successfully!');
    console.log(this.reviews)
  }

 
}