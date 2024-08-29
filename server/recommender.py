import pandas as pd
import pickle

articles = pd.read_csv('database.csv')
indices = pd.Series(articles.index, index=articles['uniq_id']).drop_duplicates()

# Load cos_sim from the pickle file :-
with open('recommender.pkl', 'rb') as file:
    cos_sim = pickle.load(file)

# Method to give top n recommendations :-
def recommendations(uniq_id, n):
    i = indices[uniq_id]
    sim_scores = list(enumerate(cos_sim[i]))
    sim_scores.sort(key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[:n]
    article_indices = [score[0] for score in sim_scores]
    return articles['uniq_id'].iloc[article_indices].values