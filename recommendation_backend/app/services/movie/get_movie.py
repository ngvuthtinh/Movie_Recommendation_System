from sqlalchemy.orm.session import Session
from sqlalchemy.orm import joinedload
from app.models.movie import Movie
from app.schemas.movie import (
    MovieDetail,
    GenreOut,
    KeywordOut,
    CompanyOut,
    LanguageOut
)


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


def get_movie_detail(db: Session, movie_id: int) -> MovieDetail:
    """
    Get detailed information about a specific movie by its ID.
    Returns data matching the MovieDetail schema.
    """
    movie = (
        db.query(Movie)
        .options(
            joinedload(Movie.genres),
            joinedload(Movie.keywords),
            joinedload(Movie.companies),
            joinedload(Movie.languages)
        )
        .filter(Movie.id == movie_id)
        .first()
    )

    if not movie:
        return None

    return MovieDetail(
        id=movie.id,
        title=movie.title,
        vote_average=movie.vote_average,
        release_date=movie.release_date,
        runtime=movie.runtime,
        overview=movie.overview,
        backdrop_path=movie.backdrop_path,
        genres=[GenreOut(id=g.id, genre_name=g.genre_name) for g in movie.genres],
        keywords=[KeywordOut(id=k.id, word=k.word) for k in movie.keywords],
        companies=[CompanyOut(id=c.id, company_name=c.company_name) for c in movie.companies],
        languages=[LanguageOut(id=l.id, language=l.language) for l in movie.languages]
    )