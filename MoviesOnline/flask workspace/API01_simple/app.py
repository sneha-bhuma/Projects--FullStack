from flask import Flask
app=Flask(__name__)
 
 
@app.route("/hello1")
 
def sayHello1():
    return ({'message': 'Hello mines'})
 
 
@app.route("/hello2")
 
def sayHello2():
    return ({'message': 'Hello mines 2'})
 
 
@app.route("/error")
 
def checkError():
    return 10/0
