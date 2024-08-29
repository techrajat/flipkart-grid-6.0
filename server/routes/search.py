from flask import *
search_bp = Blueprint("search_bp", __name__)

import pymongo
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient['Flipkart-Grid']
collection = mydb['Products']

import search_response

@search_bp.route("/search", methods=['POST'])
def search():
    try:
        query = request.form['query']
        res = search_response.filter_response(query, 20)
        return {"products": res[0], "response": res[1]}, 200
    except:
        return {"error": "Server error"}, 500