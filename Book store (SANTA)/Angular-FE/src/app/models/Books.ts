export class Books {
    id: number = 0;
    title: string = '';
    author: string = '';
    category: string = "";
    synopsis: string = "";
    price: number = 0;
    isbn: string="";
    publication_date: string="";
    image:string='';
    constructor(id: number,title: string,
        author: string, category:string,synopsis:string,
        price: number,isbn:string,publication_date:string,
        image: string) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.category = category;
        this.synopsis = synopsis
        this.price = price
        this.isbn = isbn
        this.publication_date = publication_date
        this.image = image
    }
    
    

}