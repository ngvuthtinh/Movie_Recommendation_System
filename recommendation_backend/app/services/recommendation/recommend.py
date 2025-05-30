from calculate_similarity import calculate_similarity
from sqlalchemy.orm import Session
from typing import List
from app.models.user import WatchRecord


def recommend_for_click(movie_id: int, db: Session, recommendation_type: str, n=10) -> List[int]:
    """
    Recommend movies based on a given movie ID and recommendation type.
    
    Args:
        movie_id (int): The ID of the movie to base recommendations on.
        db (Session): The database session for querying.
        recommendation_type (str): The type of recommendation to perform.
        n (int): The number of recommended movies to return. Default is 10.
    Returns:
        list: A size n list of recommended movies.
    """
    # Calculate similarity scores for the given movie
    similarity_scores = calculate_similarity(movie_id, db, recommendation_type)
    
    # Sort movies by similarity score in descending order
    sorted_movies = sorted(similarity_scores.items(), key=lambda x: x[1], reverse=True)
    
    # Return the top n recommended movies
    return [movie for movie, score in sorted_movies[:n]]


def recommend_for_history(
    db: Session, user_id: int, recommendation_type: str, n=10, history_size=10
) -> List[int]:
    """
    Recommend movies based on a user's history.
    Args:
        db (Session): The database session for querying.
        user_id (int): The ID of the user to base recommendations on.
        recommendation_type (str): The type of recommendation to perform.
        n (int): The number of recommended movies to return. Default is 10.
        history_size (int): The number of recent movies to consider from the user's history. Default is 10.
    Returns:
        list: A size n list of recommended movies.
    """
    # Query the user's watch history
    user_history = db.query(WatchRecord).filter(WatchRecord.user_id == user_id).order_by(
        WatchRecord.watch_timestamp.desc()
    ).limit(history_size).all()
    
    if not user_history:
        return []
    
    # Get the movie IDs from the user's history
    movie_ids = [record.movie_id for record in user_history]
    
    if not movie_ids:
        return []
    
    # Calculate similarity scores 
    all_recommendations = {}
    for movie_id in movie_ids:
        similarity_scores = calculate_similarity(movie_id, db, recommendation_type)
        
        # Aggregate recommendations
        for rec_movie, score in similarity_scores.items():
            if rec_movie not in all_recommendations:
                all_recommendations[rec_movie] = 0
            all_recommendations[rec_movie] += score
    
    # Sort movies by aggregated similarity score in descending order
    sorted_movies = sorted(all_recommendations.items(), key=lambda x: x[1], reverse=True)
    
    # Return the top n recommended movies excluding those already in the user's history
    recommended_movies = [movie for movie, score in sorted_movies if movie not in movie_ids]
    return recommended_movies[:n]