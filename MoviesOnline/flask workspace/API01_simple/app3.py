from flask import Flask, render_template, request, redirect, url_for
from flask_pymongo import PyMongo
from flask_cors import CORS


app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/feedback_db"
mongo = PyMongo(app)
CORS(app)
feedback_collection = mongo.db.feedback


# Dummy list to store feedback (replace with database in real application)
feedback_data = []

@app.route('/')
def index():
    # Render your main page here (ticket details page)
    return render_template('index.html')

@app.route('/feedback', methods=['GET', 'POST'])
def feedback():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']
        feedback_data.append({'name': name, 'email': email, 'message': message})
        # In real application, you would process the feedback (store in DB, etc.)
        return redirect(url_for('thank_you'))
    return render_template('feedback.html')

@app.route('/thank_you')
def thank_you():
    return render_template('thank_you.html')

if __name__ == '__main__':
    app.run(debug=True)
