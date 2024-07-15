export class review {
    
    book_id: string = ""
    book_title: string = "";
    user_name: string = "";
    rating: number = 0;
    comment: string = ""
    image:string=''
    constructor(book_id: string,book_title: string,
        user_name: string,
        rating: number,
        comment: string, image:string) {
        
        this.book_id = book_id;
        this.book_title = book_title;
        this.user_name = user_name;
        this.rating = rating;
        this.comment = comment
        this.image = image
    }
}