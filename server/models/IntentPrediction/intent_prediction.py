import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pickle
import numpy as np

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