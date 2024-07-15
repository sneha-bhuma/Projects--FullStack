import os
from flask import Flask, request, jsonify, abort
from flask_pymongo import PyMongo # type: ignore
from flask_cors import CORS # type: ignore
from bson import ObjectId # type: ignore
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

app = Flask(__name__)
# app.config["MONGO_URI"] = "mongodb://localhost:27017/FeedbackDB"
app.config["MONGO_URI"] = os.getenv("MONGO_URI", "mongodb://localhost:27017/FeedbackDB")
mongo = PyMongo(app)
CORS(app, resources={r"/feedback/*": {"origins": "*"}})

# feedback_collection = mongo.db.feedback

# Route to get all feedback
@app.route("/feedback", methods=["GET"])
def get_feedback():
    feedbacks = [i for i in mongo.db.Feedback.find({}, {'_id': 0})]
    return jsonify(feedbacks)

# Route to add new feedback
@app.route("/feedback", methods=["POST"])
def add_feedback():
    feedback = request.json

    # Extract individual feedback types and email
    ui_experience = feedback.get('uiExperience', 0)
    loan_status_experience = feedback.get('loanStatusExperience', 0)
    customer_support_experience = feedback.get('customerSupportExperience', 0)
    email = feedback.get('email', '')


    # Create feedback array
    feedback_array = {
        "uiExperience": ui_experience,
        "loanStatusExperience": loan_status_experience,
        "customerSupportExperience": customer_support_experience,
        "email": email  # Include email field
    }

    # Insert into MongoDB
    mongo.db.Feedback.insert_one(feedback_array)

    return jsonify({"message": "Feedback added successfully"}), 201


#to run the app
if __name__ == "__main__":
    app.run(debug=True)