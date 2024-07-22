from flask import Flask, render_template
import requests

import logging
logger = logging.getLogger('werkzeug')
 # grabs underlying WSGI logger
handler = logging.FileHandler('test.log')
 # creates handler for the log file
logger.addHandler(handler)
 # adds handler to the werkzeug WSGI logger
logger.info("Here'ssome info")
app = Flask(__name__)
 
@app.route('/hello')
def SayHello():
    return ({'msg': 'hello sunil hru? iam good from sai'})
@app.route("/guess/<name>")
def guess(name):
    # call api https://api.agify.io/ and https://api.genderize.io/
    age_url = "https://api.agify.io?name=" + name
    gender_url = "https://api.genderize.io?name=" + name
    age_response = requests.get(age_url)
    gender_response = requests.get(gender_url)
    age = age_response.json()["age"]
    gender = gender_response.json()["gender"]
    return render_template("guess.html", name=name, gender=gender, age=age)

@app.route('/comments')
def comments():
    comments = ['This is the first comment.',
                'This is the second comment.',
                'This is the third comment.',
                'This is the fourth comment.'
                ]
    return render_template('comments.html', comments=comments)