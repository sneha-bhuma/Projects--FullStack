from flask import Flask, render_template, request, redirect, url_for
from flask_pymongo import PyMongo

app = Flask(__name__)

# Configure MongoDB connection
app.config['MONGO_URI'] = 'mongodb://localhost:27017/feedback_db'
mongo = PyMongo(app)
# Define a collection (equivalent to a table in relational databases)
feedback_collection = mongo.db.feedback

# Define a route for the feedback form
@app.route('/feedback', methods=['GET', 'POST'])
def feedback():
    if request.method == 'POST':
        # Get form data
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']

        # Insert into MongoDB
        feedback_id = feedback_collection.insert_one({
            'name': name,
            'email': email,
            'message': message
        }).inserted_id

        # Optionally, you can redirect to a success page
        return redirect(url_for('feedback_success'))

    # Render the feedback form template
    return render_template('feedback_form.html')

# Define a route for the feedback success page
@app.route('/feedback/success')
def feedback_success():
    return 'Thank you for your feedback!'

if __name__ == '__main__':
    app.run(debug=True)
