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