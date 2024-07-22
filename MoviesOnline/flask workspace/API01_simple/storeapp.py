from flask import Flask, jsonify,request
app = Flask(__name__)


stores = [
    {
        "name": "Store 1",        
        "items":[
            {
                "name":"Table",
                "price":5678
            },
            {
                "name":"Chair",
                "price":2678
            },
        ]
    },
    {
        "name": "Store 2",        
        "items":[
            {
                "name":"Laptop",
                "price":58678
            },
            {
                "name":"Tablet",
                "price":32678
            },
        ]
    }
]
@app.route("/store")
def getStores():
    return {"stores": stores}
@app.post("/store")

def createStore():
    counter=0
    request_data=request.get_json()
    new_store={"name":request_data["name"],"items":[]}
    for i in stores:
      if(new_store["name"]==i["name"]):
          counter+=1;
    if (counter==0):
          stores.append(new_store)
 
          return {"new store =":new_store}, 201