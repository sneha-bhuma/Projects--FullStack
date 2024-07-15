from json import dumps
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/FeedbackDB"
mongo = PyMongo(app)

# Enable CORS
CORS(app, resources={r"/api/*": {"origins": "http://localhost:4200"}})

# @app.route("/feedback1")
# def home_page():
#     # emps = mongo.db.Emps.find()
#     print([x for x in mongo.db.feedback.find({})])
#     return jsonify([i for i in mongo.db.feedback.find({}, {'_id': 0})])

# @app.post("/feedback")
# def add_feedback():
#     feed = {"feedback": "Nice"}
#     mongo.db.feedback.insert_one(feed)
#     return "Added Successfully"

feedback_collection = mongo.db.feedback

@app.route('/api/feedback', methods=['POST'])
def add_feedback():
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400
    feedback_id = feedback_collection.insert_one(data).inserted_id
    return jsonify({"message": "Feedback added successfully!", "id": str(feedback_id)}), 201
    

@app.route('/api/feedback', methods=['GET'])
def get_feedback():
    feedbacks = feedback_collection.find()
    feedback_list = []
    for feedback in feedbacks:
        feedback['_id'] = str(feedback['_id'])
        feedback_list.append(feedback)
    return jsonify(feedback_list), 200

# if __name__ == '__main__':
#     app.run(debug=True)