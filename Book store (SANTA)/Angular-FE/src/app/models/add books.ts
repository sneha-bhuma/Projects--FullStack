export class Add_Books {
    title: string = '';
    author: string = '';
    category: string = "";
    synopsis: string = "";
    price: number = 0;
    isbn: string="";
    publication_date: string="";
    image:string='';
    id: number;
    constructor(title: string, id: number,
        author: string, category:string,synopsis:string,
        price: number,isbn:string,publication_date:string,
        image: string) {
        this.title = title;
        this.id = id;
        this.author = author;
        this.category = category;
        this.synopsis = synopsis
        this.price = price
        this.isbn = isbn
        this.publication_date = publication_date
        this.image = image
    }
}