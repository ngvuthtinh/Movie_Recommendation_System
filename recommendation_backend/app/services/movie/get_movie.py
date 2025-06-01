from sqlalchemy.orm.session import Session
from app.models.movie import Movie

def search_movie_titles(db: Session, query: str) -> list[dict]:
    """
    Search for movie titles in the database that match the given query.
    Args:
        db: The database session.
        query:  The search query string to match against movie titles.
    Returns:
        The list of movie titles.
    """
    movies = db.query(Movie.id, Movie.title).filter(Movie.title.ilike(f"%{query}%")).all()
    return [{"id": m[0], "title": m[1]} for m in movies]