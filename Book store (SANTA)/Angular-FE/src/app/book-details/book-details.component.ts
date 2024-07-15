import { Component } from '@angular/core';
import { Books } from '../models/Books';
import { review } from '../models/reviews';
import { BooksService } from '../books.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReviewsService } from '../reviews.service';
 
@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent {
bdet?: Books ;
  reviews? : any;
  review? : any;
  filteredReviews: any;
  totalRating : number=0;
  finalRating : any;
  no_of_reviews: any;
  comments: any[]=[];
  showReviews: boolean = false;
 

  constructor(private booksService: BooksService,
    private route: ActivatedRoute,private toastr: ToastrService,
    private reviewService: ReviewsService
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const idFromRoute = Number(routeParams.get('ID'));
    console.log(idFromRoute);
    this.getBooksById(idFromRoute);
    this.getReviews();
  }
  getBooksById(id:number){
    this.booksService.getBooksById(id).then((data) => {
    console.log(data);
    this.bdet= data;
    console.log(this.bdet);
  })}
  getReviews(){
    this.reviewService.getReview().then((reviews) => {
      console.log(reviews);
      this.reviews=reviews;
      this.filterReviews();
    })
  }
  filterReviews(): void {
    this.filteredReviews = this.reviews.filter((review: review) =>
      review.book_title.toLowerCase().includes(this.bdet?.title.toLowerCase() || '')
    );
    console.log(this.filteredReviews);
 

    const averageRating = this.calculateAverageRating(this.filteredReviews);

  }
  calculateAverageRating(reviews: any) {
    for (let r of reviews){
      this.totalRating = this.totalRating+Number(r.rating)
    }
    this.finalRating= this.totalRating/reviews.length;
    this.finalRating=Number(this.finalRating.toFixed(1))
    this.no_of_reviews=reviews.length
    console.log(this.totalRating);
    console.log(reviews.length);
 
    console.log(this.finalRating);
 
    return this.finalRating
  }
  toggleReviewsVisible(){
    this.showReviews = true;
    this.showComments();
  }
 
 
  showComments(){
    this.comments = [];
    for (let c of this.filteredReviews){
      this.comments.push(c.comment);
    }
    console.log("comment",this.comments);
  }

 

sendDetails(){
    let id= Number(this.bdet?.id);
    let title= this.bdet?.title || '';
    let author= this.bdet?.author || '';
    let synopsis= (this.bdet?.synopsis || '');
    let category= this.bdet?.category || '';
    let isbn= this.bdet?.isbn || '';
    let price= Number(this.bdet?.price);
    let image= this.bdet?.image || '';
    let publication_date= this.bdet?.publication_date || '';
    this.addtoCart(new Books(id,title,author,category,synopsis,price,isbn,publication_date,image));}
addtoCart(wlist:Books){
    let isAdded: Boolean = this.booksService.addTocart(wlist)
    if (isAdded){
    this.toastr.info('Added to Cart');}
    else {
    this.toastr.error('Already in your Cart');
    }
  }
 

}