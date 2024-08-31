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

def negotiation_response(user_price, discount_price):
    negotiation_agree = [f"Absolutely! I'm happy to accept your offer of {user_price} rupees. Let's finalize the deal!",
f"That works for me! I'll adjust the price to {user_price} rupees. Thanks for reaching out!",
f"Deal! I'm happy to agree to {user_price} rupees. Let's proceed with the purchase!",
f"Sure! I'll set the price to {user_price} rupees. It's a pleasure to work with you!",
f"Great! I'll accept {user_price} rupees for this product. Thanks for your offer!"]

    negotiation_deny = [f"I can offer a discount, but the lowest I can go is {discount_price} rupees. It's still a great deal!",
f"I can reduce the price to {discount_price} rupees, which is the best I can do for this product. I hope it works for you!",
f"We can lower the price to {discount_price} rupees, but unfortunately, we can't go any lower. It's a fantastic value!",
f"The best price I can offer is {discount_price} rupees. It's the most competitive we can provide for this item!",
f"I can offer a reduction to {discount_price} rupees, but that's the lowest we can go. It's a great price for this quality!"]
    
    if(user_price < discount_price):
        return discount_price, random.choice(negotiation_deny)
    else:
        return user_price, random.choice(negotiation_agree)
    
def response(query, uniq_id):
    intent = predict_intent(query)
    if(intent == 'checkout'):
        return "checkout", random.choice(checkout_response)
    else:
        nums = re.findall(r'\d+', query)
        nums = [int(num) for num in nums]
        discount_price = collection.find_one({'uniq_id': uniq_id}, {'_id': 0})
        discount_price = discount_price['discounted_price']
        if(len(nums) == 0):
            return negotiation_response(-1, discount_price)
        else:
            user_price = nums[0]
            return negotiation_response(user_price, discount_price)