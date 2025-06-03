from sqlalchemy.orm import Session
from app.cores.database import get_db
from app.models.movie import Movie, Genre, Keyword
from app.models.movie_relations import MovieKeyword, MovieGenre
from typing import List, Dict
from math import log10
from datetime import datetime
import pickle
import os


"""
Step 2: Normalize data for recommendation system.
Since the data is very diverse, we need to normalize it to ensure that each feature contributes equally to the recommendation scores.
"""
def normalize_vote_count(vote_count: int, db: Session) -> float:
    """_summary_

    Args:
        vote_count (int): total vote count of the movie
        db (Session): the database session

    Returns:
        float: the normalized vote count
    """
    max_vote_count = db.query(Movie).order_by(Movie.vote_count.desc()).first().vote_count
    if max_vote_count == 0:
        return 0.0
    return log10(vote_count) / log10(max_vote_count) if vote_count > 0 else 0.0


def normalize_vote_average(vote_average: float, db: Session) -> float:
    """_summary_

    Args:
        vote_average (float): the average vote of the movie
        db (Session): the database session

    Returns:
        float: the normalized vote average
    """
    max_vote_average = db.query(Movie).order_by(Movie.vote_average.desc()).first().vote_average
    return vote_average / max_vote_average if max_vote_average > 0 else 0.0


def normalize_popularity(popularity: float, db: Session) -> float:
    """_summary_

    Args:
        popularity (float): the popularity score of the movie
        db (Session): the database session

    Returns:
        float: the normalized popularity score
    """
    max_popularity = db.query(Movie).order_by(Movie.popularity.desc()).first().popularity
    return log10(popularity) / log10(max_popularity) if max_popularity > 0 else 0.0


def normalize_release_date(release_date: str) -> float:
    """_summary_
    Args:
        release_date (str): the release date of the movie in 'YYYY-MM-DD' format
    Returns:
        float: the normalized release date score
    """   
    if not release_date:
        return 0.0
    
    try:
        release_year = int(release_date.split("-")[0])
    except:
        return 0.0

    current_year = datetime.now().year
    delta_years = current_year - release_year

    if delta_years < 0:
        return 1.0
    elif delta_years <= 5:
        return 1.0 - (delta_years / 5.0) 
    else:
        return 0.0  


"""
Step 3: Create feature vectors for each movie.
Expected output:
    vectors = [
        {
            "movie_id": 1,
            "feature_vector": [1, 0, 1, ..., 0.75, 0.5]
        },
        ...
    ]
"""
def create_feature_vectors(db: Session) -> List[Dict]:
    """_summary_

    Args:
        db (Session): the database session
    Returns:
        List[Dict]: a list of dictionaries containing movie ids and their corresponding feature vectors
    """
    genres = db.query(Genre).order_by(Genre.id).all()
    keywords = db.query(Keyword).order_by(Keyword.id).all()

    movies = db.query(Movie).all()
    vectors = []

    for movie in movies:
        # Get genre ids for this movie
        movie_genre_ids = {mg.genre_id for mg in db.query(MovieGenre).filter_by(movie_id=movie.id)}
        genre_vector = [1 if genre.id in movie_genre_ids else 0 for genre in genres]

        # Get keyword ids for this movie
        movie_keyword_ids = {mk.keyword_id for mk in db.query(MovieKeyword).filter_by(movie_id=movie.id)}
        keyword_vector = [1 if keyword.id in movie_keyword_ids else 0 for keyword in keywords]
        
        # Normalize data
        vote_avg_normalized = normalize_vote_average(movie.vote_average, db)
        vote_count_normalized = normalize_vote_count(movie.vote_count, db)
        popularity_normalized = normalize_popularity(movie.popularity, db)
        release_date_normalized = normalize_release_date(str(movie.release_date))
        
        # Create the feature vector for this movie
        featutre_vector = genre_vector + keyword_vector + [
            vote_avg_normalized,
            vote_count_normalized,
            popularity_normalized,
            release_date_normalized
        ]

        vectors.append({
            "movie_id": movie.id,
            "feature_vector": featutre_vector
        })
        
    return vectors

# Save the feature vectors to a pickle file
if __name__ == "__main__":
     # Get a database session
    db_gen = get_db()
    db = next(db_gen)

    # Create feature vectors
    vectors = create_feature_vectors(db)

    # Ensure the output directory exists
    output_dir = os.path.join(os.path.dirname(__file__), "../../models")
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, "movie_vectors.pkl")

    # Save to pickle file
    with open(output_path, "wb") as f:
        pickle.dump(vectors, f)

    print(f"Feature vectors exported to {output_path}")