import os
from flask import Flask, request, jsonify, abort
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson import ObjectId
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

app = Flask(__name__)
app.config["MONGO_URI"] = os.getenv("MONGO_URI", "mongodb://localhost:27017/feedback_db")
mongo = PyMongo(app)
CORS(app, resources={r"/feedback/*": {"origins": "*"}})

feedback_collection = mongo.db.feedback

@app.route("/feedback", methods=["POST"])
def create_feedback():
    feedback_data = request.get_json()
    
    # Validate input data
    if not feedback_data or not isinstance(feedback_data, dict):
        abort(400, "Invalid input data. Expected a JSON object.")
    if "user_id" not in feedback_data or not isinstance(feedback_data["user_id"], int):
        abort(400, "Invalid or missing 'user_id'. Expected an integer.")
    if "rating" not in feedback_data or not isinstance(feedback_data["rating"], (int, float)):
        abort(400, "Invalid or missing 'rating'. Expected a number.")
    if "name" not in feedback_data or not isinstance(feedback_data["name"], str):
        abort(400, "Invalid or missing 'name'. Expected a string.")
    
    # Insert the feedback data into the MongoDB collection
    result = feedback_collection.insert_one({
        "user_id": feedback_data["user_id"],
        "rating": feedback_data["rating"],
        "name": feedback_data["name"]
    })
    
    # Retrieve the newly inserted feedback data
    new_feedback = feedback_collection.find_one({"_id": result.inserted_id})
    
    # Convert ObjectId to string for JSON serialization
    new_feedback['_id'] = str(new_feedback['_id'])
    
    return jsonify(new_feedback), 201

@app.route("/feedback", methods=["GET"])
def get_feedbacks():
    try:
        feedback_list = list(feedback_collection.find())
        for feedback in feedback_list:
            feedback['_id'] = str(feedback['_id'])  # Convert ObjectId to string
        return jsonify(feedback_list), 200
    except Exception as e:
        abort(500, f"Failed to fetch feedbacks: {str(e)}")

@app.route("/feedback/<feedback_id>", methods=["GET"])
def get_feedback(feedback_id):
    try:
        feedback = feedback_collection.find_one({"_id": ObjectId(feedback_id)})
        if feedback:
            # Convert ObjectId to string for JSON serialization
            feedback['_id'] = str(feedback['_id'])
            return jsonify(feedback), 200
        else:
            return {"message": "Feedback not found"}, 404
    except Exception as e:
        abort(500, f"Failed to fetch feedback: {str(e)}")

if __name__ == "__main__":
    app.run(debug=True)
