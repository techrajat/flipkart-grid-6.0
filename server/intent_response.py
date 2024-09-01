import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pickle
import numpy as np
import random
import re

model = tf.keras.models.load_model('intent_prediction_model.h5')

tokenizer = Tokenizer(num_words=5000)

# Load the tokenizer
with open('tokenizer.pkl', 'rb') as f:
    tokenizer = pickle.load(f)

# Load the label encoder
with open('label_encoder.pkl', 'rb') as f:
    label_encoder = pickle.load(f)

with open('max_len.pkl', 'rb') as f:
    max_len = pickle.load(f)

# Function to predict intent using the loaded model
def predict_intent(query):
    seq = tokenizer.texts_to_sequences([query])
    padded = pad_sequences(seq, maxlen=max_len)
    pred = model.predict(padded)
    intent = label_encoder.inverse_transform([np.argmax(pred)])
    return intent[0]

from pymongo import MongoClient
client = MongoClient("mongodb://localhost:27017/")
db = client['Flipkart-Grid']
collection = db['Products']

checkout_response = ["You've made an excellent choice! Let's get this to you.",
                     "Ready to complete your purchase? Let's move forward.",
                     "You're about to get something great! Let's wrap this up.",
                     "Your selection is top-notch! Time to finalize the details.",
                     "You're all set! Let's proceed to complete your order.",
                     "This is going to be fantastic! Let's finish the checkout.",
                     "You're making a great decision! Let's get everything sorted.",
                     "Exciting times ahead! Let's finalize your purchase.",
                     "Let's complete this, and you'll have it in no time!",
                     "You're about to receive something wonderful! Let's get it checked out."]

def negotiation_response(user_price, discount_price, curr_price):
    price_reduction = curr_price * random.uniform(0.1, 0.2)
    seller_price = max(user_price, max(curr_price - price_reduction, discount_price))
    seller_price = int(seller_price)

    negotiation_agree = [
        f"Absolutely! I'm happy to accept your offer of {user_price} rupees. Let's finalize the deal!",
        f"That works for me! I'll adjust the price to {user_price} rupees. Thanks for reaching out!",
        f"Deal! I'm happy to agree to {user_price} rupees. Let's proceed with the purchase!",
        f"Sure! I'll set the price to {user_price} rupees. It's a pleasure to work with you!",
        f"Great! I'll accept {user_price} rupees for this product. Thanks for your offer!"
    ]
    
    negotiation_interactive = [
        f"I can offer {seller_price} rupees. How does that work for you?",
        f"What if we adjust the price to {seller_price} rupees? Does that sound good?",
        f"Let's settle on {seller_price} rupees. Let me know your thoughts!",
        f"I'm willing to adjust the price to {seller_price} rupees. How about that?",
        f"How about {seller_price} rupees? I think that's a fair deal."
    ]

    negotiation_final = [
       f"The the best I can do is {seller_price} rupees. I hope this works for you!",
       f"I've given you my final offer at {seller_price} rupees. It's a great deal!",
       f"I can't go any lower than {seller_price} rupees. Let's wrap this up!",
       f"The lowest I can offer is {seller_price} rupees. It's a fair price for this quality.",
       f"I'm giving you the best possible price at {seller_price} rupees. Let's move forward with this!"
    ]

    if seller_price == user_price:
        return seller_price, random.choice(negotiation_agree)
    elif seller_price == curr_price:
        return seller_price, random.choice(negotiation_final)
    else:
        return seller_price, random.choice(negotiation_interactive)
    
def response(query, uniq_id, curr_price):
    intent = predict_intent(query)
    if(intent == 'checkout'):
        return "checkout", random.choice(checkout_response)
    else:
        nums = re.findall(r'\d+', query)
        nums = [int(num) for num in nums]
        product = collection.find_one({'uniq_id': uniq_id}, {'_id': 0})
        discount_price = product['discounted_price']
        if(len(nums) == 0):
            return negotiation_response(-1, discount_price, curr_price)
        else:
            user_price = nums[0]
            return negotiation_response(user_price, discount_price, curr_price)