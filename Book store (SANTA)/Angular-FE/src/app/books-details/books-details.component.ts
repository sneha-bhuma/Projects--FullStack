import { Component, Input } from '@angular/core';
import { Books } from '../models/Books';
import { BooksService } from '../books.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-books-details',
  templateUrl: './books-details.component.html',
  styleUrl: './books-details.component.css'
})
export class BooksDetailsComponent {

  //@Input() bdet: Books | undefined;

  @Input() bdet: Books | undefined;
  constructor(private booksService: BooksService,private toastr: ToastrService) {}

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
