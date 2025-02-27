from flask import *

cart_bp = Blueprint("cart_bp", __name__)

import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["Flipkart-Grid"]
collection = mydb["Products"]
users = mydb["Users"]

@cart_bp.route("/addtocart/<uniq_id>", methods=["POST"])
def addtocart(uniq_id):
    try:
        user = request.environ["user"]
        if not user:
            return {"error": "User not found"}, 400
        cart = users.find_one({"email": user["email"]}, {"_id": 0})
        cart = cart["cart"]
        product = collection.find_one({"uniq_id": uniq_id}, {"_id": 0})
        product["retail_price"] = int(request.form["price"])
        cart[uniq_id] = product
        users.update_one({"email": user["email"]}, {"$set": {"cart": cart}})
        return {"success": "Product added to cart"}, 200
    except:
        return {"error": "Access Denied"}, 500

@cart_bp.route("/fetchcart")
def fetchcart():
    try:
        user = request.environ["user"]
        if not user:
            return {"error": "User not found"}, 400
        cart = users.find_one({"email": user["email"]}, {"_id": 0})
        cart = cart["cart"]
        return {"products": cart}, 200
    except:
        return {"error": "Access Denied"}, 500

@cart_bp.route("/emptycart")
def emptycart():
    try:
        user = request.environ["user"]
        if not user:
            return {"error": "User not found"}, 400
        users.update_one({"email": user['email']}, {"$set": {"cart": {}}})
        return {"success": "Cart emptied succesfully"}, 200
    except:
        return {"error": "Access Denied"}, 500
