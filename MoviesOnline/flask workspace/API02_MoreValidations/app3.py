from flask import Flask, jsonify, request, abort
# from db2 import books,authors

app = Flask(__name__)

# Dummy data (in-memory storage)
authors = []
books = []

# Helper function to get the next available ID
def get_next_id(collection):
    if not collection:
        return 1
    return max(item['id'] for item in collection) + 1

# Routes for Authors

@app.route('/authors', methods=['GET'])
def get_authors():
    return jsonify(authors)

@app.route('/authors/<int:id>', methods=['GET'])
def get_author(id):
    author = next((author for author in authors if author['id'] == id), None)
    if author:
        return jsonify(author)
    else:
        abort(404)
# @app.post("/store")
@app.route('/authors', methods=['POST'])
def create_author():
    if not request.json or 'name' not in request.json:
        abort(400)
    new_author = {
        'id': get_next_id(authors),
        'name': request.json['name']
    }
    authors.append(new_author)
    return jsonify(new_author), 201

@app.route('/authors/<int:id>', methods=['PUT'])
def update_author(id):
    author = next((author for author in authors if author['id'] == id), None)
    if not author:
        abort(404)
    if not request.json:
        abort(400)
    author['name'] = request.json.get('name', author['name'])
    return jsonify(author)

@app.route('/authors/<int:id>', methods=['DELETE'])
def delete_author(id):
    author = next((author for author in authors if author['id'] == id), None)
    if not author:
        abort(404)
    authors.remove(author)
    return jsonify({'result': True})

# Routes for Books

@app.route('/books', methods=['GET'])
def get_books():
    return jsonify(books)

@app.route('/books/<int:id>', methods=['GET'])
def get_book(id):
    book = next((book for book in books if book['id'] == id), None)
    if book:
        return jsonify(book)
    else:
        abort(404)

@app.route('/books', methods=['POST'])
def create_book():
    if not request.json or 'title' not in request.json or 'author_id' not in request.json:
        abort(400)
    author_id = request.json['author_id']
    author = next((author for author in authors if author['id'] == author_id), None)
    if not author:
        abort(404)
    new_book = {
        'id': get_next_id(books),
        'title': request.json['title'],
        'author_id': author_id
    }
    books.append(new_book)
    return jsonify(new_book), 201

@app.route('/books/<int:id>', methods=['PUT'])
def update_book(id):
    book = next((book for book in books if book['id'] == id), None)
    if not book:
        abort(404)
    if not request.json:
        abort(400)
    book['title'] = request.json.get('title', book['title'])
    book['author_id'] = request.json.get('author_id', book['author_id'])
    return jsonify(book)

@app.route('/books/<int:id>', methods=['DELETE'])
def delete_book(id):
    book = next((book for book in books if book['id'] == id), None)
    if not book:
        abort(404)
    books.remove(book)
    return jsonify({'result': True})

# Error handling

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(400)
def bad_request(error):
    return jsonify({'error': 'Bad request'}), 400

if __name__ == '__main__':
    app.run(debug=True)
