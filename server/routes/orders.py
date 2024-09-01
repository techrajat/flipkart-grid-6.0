from flask import *
orders_bp = Blueprint("orders_bp", __name__)

import pymongo
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient['Flipkart-Grid']
users = mydb['Users']

import json

@orders_bp.route("/addtoorders", methods=['POST'])
def addtoorders():
    try:
        user = request.environ['user']
        if not user:
            return {"error": "User not found"}, 400
        orders = request.form['orders']
        orders = json.loads(orders)
        currOrders = users.find_one({'email': user['email']}, {'_id': 0})['orders']
        if currOrders:
            orders.extend(currOrders)
        users.update_one({'email': user['email']}, {'$set': {'orders': orders}})
        return {"success": "successful"}, 200
    except:
        return {"error": "Server error"}, 500

@orders_bp.route("/getorders")
def getorders():
    try:
        user = request.environ['user']
        if not user:
            return {"error": "User not found"}, 400
        orders = users.find_one({'email': user['email']}, {'_id': 0})['orders']
        return {"orders": orders}, 200
    except:
        return {"error": "Server error"}, 500