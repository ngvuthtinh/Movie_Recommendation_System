from typing import Dict, List
from sqlalchemy.orm import Session
from app.models.movie import Genre, Keyword
from app.cores.database import get_db
from pathlib import Path
import pickle
import numpy as np


def assign_all_weights(db: Session) -> Dict[str, List[float]]:
    """

    """
    
    genre_count = db.query(Genre).count()
    keyword_count = db.query(Keyword).count()
    
    genre_keyword_weights = {
        "recommend_for_you": 0.8,   
        "top_rated":         0.05,   
        "trending_now":      0.1,   
        "new_released":      0.05  
    }

    weight_defs = {
        "recommend_for_you": [0.25, 0.25, 0.25, 0.25],  
        "top_rated":         [0.9,  0.05,  0.05, 0],  
        "trending_now":      [0.4,  0.05, 0.5,  0.05], 
        "new_released":      [0.05, 0.05, 0.1,  0.8]
    }

    result = {}
    for name, (w_avg, w_count, w_pop, w_date) in weight_defs.items():
        remaining_weight = 1.0 - genre_keyword_weights[name]
        weights = (
            [(genre_keyword_weights[name] / genre_count) * (1 / 4) ] * genre_count +
            [(genre_keyword_weights[name] / keyword_count) * (3 / 4)] * keyword_count +
            [
                w_avg * remaining_weight,
                w_count * remaining_weight,
                w_pop * remaining_weight,
                w_date * remaining_weight
            ]
        )
        result[name] = weights
        
    return result

def get_similarity_cache_path(movie_id: int, strategy: str) -> Path:
    cache_dir = Path(__file__).resolve().parent.parent.parent / "models" / "recommendation_cache"
    cache_dir.mkdir(parents=True, exist_ok=True)
    return cache_dir / f"similarity_{movie_id}_{strategy}.pkl"

def load_similarity_from_cache(movie_id: int, strategy: str):
    path = get_similarity_cache_path(movie_id, strategy)
    if path.exists():
        with open(path, "rb") as f:
            return pickle.load(f)
    return None

def save_similarity_to_cache(movie_id: int, strategy: str, data):
    path = get_similarity_cache_path(movie_id, strategy)
    with open(path, "wb") as f:
        pickle.dump(data, f)


def calculate_similarity(movie_id: int, db: Session, recommendation_type: str) -> None:
    cached = load_similarity_from_cache(movie_id, recommendation_type)
    if cached:
        return cached
    
    base_dir = Path(__file__).resolve().parent.parent.parent / "models"
    pkl_path = base_dir / "movie_vectors.pkl"

    with open(pkl_path, "rb") as f:
        movie_vectors = pickle.load(f)

    weights_dict = assign_all_weights(db)
    weights = np.array(weights_dict[recommendation_type])

    # Convert all feature vectors and movie_ids to NumPy arrays
    feature_matrix = np.array([movie["feature_vector"] for movie in movie_vectors])
    movie_ids = np.array([movie["movie_id"] for movie in movie_vectors])

    # Find the index of the target movie
    try:
        idx = np.where(movie_ids == movie_id)[0][0]
    except IndexError:
        raise ValueError(f"Movie with ID {movie_id} not found.")

    vector_A = feature_matrix[idx]
    weighted_A = weights * vector_A

    # Remove the target movie from the matrix for comparison
    mask = movie_ids != movie_id
    feature_matrix_others = feature_matrix[mask]
    movie_ids_others = movie_ids[mask]

    # Weighted feature matrix for all other movies
    weighted_matrix = feature_matrix_others * weights

    # Compute cosine similarity in a vectorized way
    numerator = np.dot(weighted_matrix, weighted_A)
    denominator = np.linalg.norm(weighted_matrix, axis=1) * np.linalg.norm(weighted_A)
    similarity_scores = np.divide(numerator, denominator, out=np.zeros_like(numerator), where=denominator!=0)

    # Combine movie_ids and scores, sort, and print top 10
    similarity = list(zip(movie_ids_others.tolist(), similarity_scores.tolist()))
    similarity.sort(key=lambda x: x[1], reverse=True)
    
    save_similarity_to_cache(movie_id, recommendation_type, similarity)
    return similarity


# Create a cache to load into frontend
if __name__ == "__main__":
    db_gen = get_db()
    db = next(db_gen)
    try:
        for movie_id in range(1, 3):
            calculate_similarity(movie_id, db, "recommend_for_you")
        for movie_id in range(1, 3):
            calculate_similarity(movie_id, db, "top_rated")
        for movie_id in range(1, 3):
            calculate_similarity(movie_id, db, "trending_now")
        for movie_id in range(1, 3):
            calculate_similarity(movie_id, db, "new_released")
    finally:
        db_gen.close()




