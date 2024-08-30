from flask import *
prediction_bp = Blueprint("prediction_bp", __name__)

import intent_response

# Endpoint to predict intent
@prediction_bp.route("/predict", methods=['POST'])
def predict():
    try:
        query = request.form['query']
        intent = intent_response.predict_intent(query)
        return {"intent": intent}, 200
    except:
        return {"error": "Server error"}, 500

# Endpoint to generate response for negotiation
@prediction_bp.route("/negotiate", methods=['POST'])
def negotiate():
    try:
        user = request.environ['user']
        if not user:
            return {"error": "User not found"}, 400
        query = request.form['query']
        uniq_id = request.form['uniq_id']
        res = intent_response.response(query, uniq_id)
        return {"newPrice": res[0], "response": res[1]}, 200
    except:
        return {"error": "Server error"}, 500