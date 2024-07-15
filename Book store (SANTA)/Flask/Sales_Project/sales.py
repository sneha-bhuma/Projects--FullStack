import uuid
from flask_smorest import Api
from flask_pymongo import PyMongo
from flask import Flask, abort, request, jsonify
from flask_cors import CORS
from db import Sales, books
 
app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = "mongodb://localhost:27017/Sales_db"
mongo = PyMongo(app)

sales_collection = mongo.db.sales  
books_collection = mongo.db.books  
 

@app.get("/books")
def get_books():
    return { list(books.values())}
 
@app.get("/books/<id>")
def getbooksById(id):
    if (id in books):
        return books[id]
    else:
        return {"message": "id Not Present"},404

 
 
@app.post("/books")
def create_books():
    book_data = request.get_json()
    if ("title" not in book_data or "author" not in book_data or "category" not in book_data or "price" not in book_data or "synopsis" not in book_data) :
        abort(
            400,
            "Bad request. Ensure all details are included in the JSON payload.",
        )
    # if book_data["title"] in Sales:
    else:
        max_id=0
        for book in books.values():
            # if (book_data["tile"] == book["title"] and book_data["author"] == book["author"]):
            #     abort(400, "book already exists.")
            if int(book["id"]) > max_id:
                max_id = int(book["id"])
        if max_id == 0:
            book_id = "1"
        else:
            book_id = f'{max_id+1}'
        book = {**book_data, "id": book_id}
        books[book_id] = book
        return book
    
    # else:
    #     abort(
    #         404,
    #         "Bad request. Sale not present",
    #     )
   
    
    
@app.get("/Sale")
def get_Sales():
    return {"sales": list(Sales.values())}
 
@app.get("/Sale/<id>")
def getAuthorsById(id):
    if (id in Sales):
        return Sales[id]
    else:
        return {"message": "id Not Present"},404
 
@app.post("/Sale")
def create_Sale():
    Sale_data = request.get_json()
    if ( "books" not in Sale_data or "total_price" not in Sale_data or "no_of_books" not in Sale_data or "email" not in Sale_data or "userName" not in Sale_data or  "address" not in Sale_data):
        abort(
            400,
            "Bad request. Ensure name or no_of_books is included in the JSON payload.",
        )
    max_id=0
    max_order_id=0
    for Sale in Sales.values():
        if int(Sale["order_id"]) > max_order_id:
            max_id = int(Sale["order_id"])
        if int(Sale["id"]) > max_id:
            max_id = int(Sale["id"])
    if max_id == 0:
        sale_id = "1"
        order_id = "1"
    else:
        sale_id = f'{max_id+1}'
        order_id = f'{max_id+1}'
    
    Sale = {**Sale_data, "id": sale_id,"order_id":order_id}
    Sales[order_id] = Sale
    return Sale
     
 
@app.delete("/Sale/<id>")
def delAuthorById(id):
    if (id in Sales):
        del Sales[id]
        return {"message": "Sale Deleted"},200
    else:
        return {"message": "id Not Present"},404
@app.put("/book/<id>")
def putbooksById(id):
    if (id in books):
        book_data = request.get_json()
        if ("Sale_id" in book_data ) :
            abort(
            400,
            "Bad request. Ensure all details are included in the JSON payload.",
        )
        for book in books.values():
            if (id == book["id"]):
                book.update(book_data)
                return {"message": "book Updated"},200

@app.put("/Sale/<id>")
def putAuthorById(id):
    if (id in Sales):
        Sale_data = request.get_json()
        if ("name" not in Sale_data or "no_of_books" not in Sale_data):
            abort(
            400,
            "Bad request. Ensure name or no_of_books is included in the JSON payload.",
        )
        for Author in Sales.values():
            if (id == Author["id"]):
                Author.update(Sale_data)
                return {"message": "Author Updated"},200