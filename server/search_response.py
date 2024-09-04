from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import random
import re

from pymongo import MongoClient
client = MongoClient("mongodb://localhost:27017/")
db = client['Flipkart-Grid']
collection = db['Products']

articles = pd.read_csv('database.csv')
indices = pd.Series(articles.index, index=articles['uniq_id']).drop_duplicates()

cols = ['product_name', 'product_category_tree', 'description', 'brand']

articles['combined_cols'] = articles[cols].apply(lambda row: ' '.join(row.values.astype(str)), axis=1)
articles = articles[['uniq_id', 'combined_cols']]

def text_process(desc):
    # Remove punctuation :-
    noPunc = [c for c in desc if c.isalnum() or c.isspace()]
    noPunc = ''.join(noPunc)
    noPunc = noPunc.split()
    # Remove stopwords :-
    stopword = stopwords.words('english')
    desc_stopwords = [word.lower() for word in noPunc if word.lower() not in stopword]
    # Replace words with their respective stems :-
    stemmer = PorterStemmer()
    desc_cleaned = [stemmer.stem(word) for word in desc_stopwords]
    return desc_cleaned

from sklearn.feature_extraction.text import TfidfVectorizer
tfidf = TfidfVectorizer(analyzer=text_process)
tfidf_matrix = tfidf.fit_transform(articles['combined_cols'])

# Method for showing search results with a given description of the product :-
def search_result(desc, n):
    search_tfidf = tfidf.transform([desc])
    cos_sim = cosine_similarity(search_tfidf, tfidf_matrix)
    sim_scores = list(enumerate(cos_sim[0]))
    sim_scores.sort(key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[:n] # Get the top n results
    article_indices = [score[0] for score in sim_scores]
    return articles['uniq_id'].iloc[article_indices].values

# Different types of responses :-
def general_response():
    response = ["Here's what I've found just for you!",
                "These selections are just perfect for you!",
                "Take a look at these top picks, chosen with you in mind!",
                "These are the best options for you, handpicked and ready!",
                "Your ideal match is just a click away!",
                "Check out these fantastic options, tailor-made for you!",
                "I think you'll love these, take a look!",
                "These gems are waiting for you. Let's explore!",
                "I've found some great choices that are perfect for you!",
                "Here are some excellent finds that you'll absolutely adore!"]
    return random.choice(response)

def under_response(price):
    response = [f"Check out these amazing finds under {price} rupees that you'll absolutely love!",
                f"I've handpicked some fantastic options for you under {price} rupees.",
                f"Great news! These top choices are all under {price} rupees.",
                f"Discover your perfect match, all under {price} rupees.",
                f"Take a look at these budget-friendly options, all under {price} rupees"]
    return random.choice(response)
    
def around_response(price):
    response = [f"Explore these excellent selections, all around {price} rupees.",
                f"I've found some great deals just for you, around {price} rupees.",
                f"These products around {price} rupees are sure to catch your eye!",
                f"You'll love these picks, all priced around {price} rupees.",
                f"Here are some top choices, all around {price} rupees."]
    return random.choice(response)
    
def range_response(lower, upper):
    response = [f"Let's explore these fantastic options ranging from {lower} to {upper} rupees.",
                f"I've curated a selection just for you, ranging from {lower} to {upper} rupees.",
                f"Here are some excellent choices within your range of {lower} to {upper} rupees.",
                f"These products, ranging from {lower} to {upper} rupees, are sure to impress.",
                f"Discover a variety of top picks, all within the {lower} to {upper} rupees range."]
    return random.choice(response)

# Filter products and responses :-
def filter_response(desc, n):
    uniq_ids = search_result(desc, n)
    nums = re.findall(r'\d+', desc)
    nums = [int(num) for num in nums]
    products = []
    response = None
    if len(nums) == 0:
        for id in uniq_ids:
            product = collection.find_one({'uniq_id': id}, {'_id': 0})
            products.append(product)
        response = general_response()
    elif len(nums) == 1:
        if "under" in desc:
            price = nums[0]
            for id in uniq_ids:
                product = collection.find_one({'uniq_id': id}, {'_id': 0})
                if product and product['retail_price'] <= price:
                    products.append(product)
            response = under_response(price)
        else:
            price = nums[0]
            lower = int(price * 0.75)
            upper = int(price * 1.25)
            for id in uniq_ids:
                product = collection.find_one({'uniq_id': id}, {'_id': 0})
                if product and product['retail_price'] >= lower and product['retail_price'] <= upper:
                    products.append(product)
            response = around_response(price)
    else:
        lower = nums[0]
        upper = nums[1]
        for id in uniq_ids:
            product = collection.find_one({'uniq_id': id}, {'_id': 0})
            if product and product['retail_price'] >= lower and product['retail_price'] <= upper:
                products.append(product)
        response = range_response(lower, upper)

    return products, response