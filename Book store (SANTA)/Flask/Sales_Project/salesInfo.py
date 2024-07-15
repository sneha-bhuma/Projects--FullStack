from flask import Flask, request, jsonify, abort
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson import ObjectId

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/sales_db"
mongo = PyMongo(app)
CORS(app)

#books_collection = mongo.db.books
sales_collection = mongo.db.sales

# @app.route("/books", methods=["GET"])
# def get_books():
#     books_list = list(books_collection.find())
#     return jsonify(books_list), 200

# @app.route("/books/<book_id>", methods=["GET"])
# def get_book(book_id):
#     book = books_collection.find_one({"_id": ObjectId(book_id)})
#     if book:
#         return jsonify(book), 200
#     else:
#         return {"message": "Book not found"}, 404

# @app.route("/books", methods=["POST"])
# def create_book():
#     book_data = request.get_json()
#     if not all(key in book_data for key in ("title", "author", "category", "price", "synopsis")):
#         abort(400, "Bad request. Ensure all details are included in the JSON payload.")

#     result = books_collection.insert_one(book_data)
#     new_book = books_collection.find_one({"_id": result.inserted_id})

#     return jsonify(new_book), 201

@app.route("/sales", methods=["GET"])
def get_sales():
    try:
        sales_list = list(sales_collection.find())
        for sale in sales_list:
            sale['_id'] = str(sale['_id'])  # Convert ObjectId to string
        return jsonify(sales_list), 200
    except Exception as e:
        abort(500, f"Failed to fetch sales: {str(e)}")

@app.route("/sales/<sale_id>", methods=["GET"])
def get_sale(sale_id):
    try:
        sale = sales_collection.find_one({"_id": ObjectId(sale_id)})
        if sale:
            # Convert ObjectId to string for JSON serialization
            sale['_id'] = str(sale['_id'])
            return jsonify(sale), 200
        else:
            return {"message": "Sale not found"}, 404
    except Exception as e:
        abort(500, f"Failed to fetch sale: {str(e)}")
        
@app.route("/sale", methods=["POST"])       
def create_sale():
    Sale_data = request.get_json()
    if ("books" not in Sale_data or "total_price" not in Sale_data or "no_of_books" not in Sale_data or "email" not in Sale_data or "userName" not in Sale_data or "address" not in Sale_data):
        abort(
            400,
            "Bad request. Ensure all required fields are included in the JSON payload.",
        )

    result = sales_collection.insert_one(Sale_data)
    new_sale = sales_collection.find_one({"_id": result.inserted_id})

    # Convert ObjectId to string for JSON serialization
    new_sale['_id'] = str(new_sale['_id'])

    return jsonify(new_sale), 201
        
           
   
    





if __name__ == "__main__":
    app.run(debug=True)
