from flask import *
search_bp = Blueprint("search_bp", __name__)

import pymongo
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient['Flipkart-Grid']
collection = mydb['Products']
users = mydb['Users']

import search_response
import recommender

# Endpoint for search query
@search_bp.route("/search", methods=['POST'])
def search():
    try:
        query = request.form['query']
        res = search_response.filter_response(query, 20)
        return {"products": res[0], "response": res[1]}, 200
    except:
        return {"error": "Server error"}, 500

# Enpoint for getting the details of a particular product
@search_bp.route("/getproduct", methods=['POST'])
def getproduct():
    try:
        uniq_id = request.form['uniq_id']
        product = collection.find_one({'uniq_id': uniq_id}, {'_id': 0})
        return {"product": product}, 200
    except:
        return {"error": "Server error"}, 500

# Endpoint to insert the search string of a user in the database :-
@search_bp.route('/setstring', methods=['POST'])
def setstring():
    try:
        user = request.environ['user']
        if not user:
            return {"error": "User not found"}, 400
        curr_str = request.form['str']
        original_str = users.find_one({'email': user['email']}, {'_id': 0})
        original_str = original_str['search_string']
        users.update_one({'email': user['email']}, {"$set": {"search_string": curr_str + " " + original_str}})
        return {"success": "Search string updated"}, 200
    except:
        return {"error": "Server error"}, 500
    
# Endpoint for recommending products
@search_bp.route("/recommend")
def recommend():
    try:
        user = request.environ['user']
        if not user:
            return {"error": "User not found"}, 400
        search_string = users.find_one({'email': user['email']}, {'_id': 0})
        search_string = search_string['search_string']
        res = search_response.filter_response(search_string, 50)
        return {"products": res[0]}, 200
    except:
        return {"error": "Server error"}, 500
    
# Endpoint for giving combo
@search_bp.route("/combo", methods=['POST'])
def combo():
    try:
        user = request.environ['user']
        if not user:
            return {"error": "User not found"}, 400
        product = request.form['uniq_id']
        similarProduct = recommender.recommendations(product, 1)
        similarProduct = similarProduct.tolist()
        similarProduct = collection.find_one({'uniq_id': similarProduct[0]}, {'_id': 0})
        return {"similarProduct": similarProduct}, 200
    except:
        return {"error": "Server error"}, 500