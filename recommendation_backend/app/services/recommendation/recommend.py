from app.services.recommendation.calculate_similarity import calculate_similarity
from sqlalchemy.orm import Session
from typing import List
from app.models.user import WatchRecord
from app.models.movie import Movie


def recommend_for_click(movie_id: int, db: Session, recommendation_type: str, n=10) -> List[Movie]:
    """
     Recommend movies based on a given movie ID and recommendation type.
    
    Args:
        movie_id (int): The ID of the movie to base recommendations on.
        db (Session): The database session for querying.
        recommendation_type (str): The type of recommendation to perform.
        n (int): The number of recommended movies to return. Default is 10.
    
    Returns:
        list: A size n list of recommended movie objects (Movie model instances).
    """
    # Calculate similarity scores for the given movie
    similarity_scores = calculate_similarity(movie_id, db, recommendation_type)
    
    # # Sort movies by similarity score in descending order
    # sorted_movies = sorted(similarity_scores.items(), key=lambda x: x[1], reverse=True)
    
    # # Return the top n recommended movies
    # return [movie for movie, score in sorted_movies[:n]]
    
    recommended_movie_ids = [movie_id for movie_id, score in similarity_scores[: n]]

    if not recommended_movie_ids:
        return []
    
    # Query the database for the recommended movies details
    movies = db.query(Movie).filter(Movie.id.in_(recommended_movie_ids)).all()
    
    movie_map = {movie.id: movie for movie in movies}
    
    ordered_movies = [movie_map[movie_id] for movie_id in recommended_movie_ids if movie_id in movie_map]

    return ordered_movies


def recommend_for_history(
    db: Session, user_id: int, recommendation_type: str, n=10, history_size=10
) -> List[Movie]:
    """
    Recommend movies based on a user's history.
    Args:
        db (Session): The database session for querying.
        user_id (int): The ID of the user to base recommendations on.
        recommendation_type (str): The type of recommendation to perform.
        n (int): The number of recommended movies to return. Default is 10.
        history_size (int): The number of recent movies to consider from the user's history. Default is 10.
    Returns:
        list: A size n list of recommended movie objects (Movie model instances).
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
    sorted_movies_ids = [
        movie_id for movie_id, score in sorted(all_recommendations.items(), key=lambda x: x[1], reverse=True)
        if movie_id not in movie_ids
    ][: n]
    
    if not sorted_movies_ids:
        return []
    
    movies = db.query(Movie).filter(Movie.id.in_(sorted_movies_ids)).all()
    
    movie_map = {movie.id: movie for movie in movies}
    ordered_movies = [movie_map[movie_id] for movie_id in sorted_movies_ids if movie_id in movie_map]
    return ordered_movies
    