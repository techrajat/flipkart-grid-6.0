from flask import *
cart_bp = Blueprint("cart_bp", __name__)

import pymongo
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient['Flipkart-Grid']
collection = mydb['Products']
users = mydb['Users']
    
@cart_bp.route('/addtocart/<uniq_id>')
def addtocart(uniq_id):
    try:
        user = request.environ['user']
        if not user:
            return {"error": "User not found"}, 400
        cart = users.find_one({'email': user['email']}, {'_id': 0})
        cart = cart['cart']
        cart.append(uniq_id)
        users.update_one({'email': user['email']}, {'$set': {'cart': cart}})
        return {"success": "Product added to cart"}, 200
    except:
        return {"error": "Access Denied"}, 500
    
@cart_bp.route('/fetchcart')
def fetchcart():
    try:
        user = request.environ['user']
        if not user:
            return {"error": "User not found"}, 400
        cart = users.find_one({'email': user['email']}, {'_id': 0})
        cart = cart['cart']
        products = []
        for uniq_id in cart:
            product = collection.find_one({'uniq_id': uniq_id}, {'_id': 0})
            products.append(product)
        return {"products": products}, 200
    except:
        return {"error": "Access Denied"}, 500