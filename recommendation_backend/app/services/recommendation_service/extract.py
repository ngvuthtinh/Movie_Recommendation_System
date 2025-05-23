import json
from sqlalchemy.orm import Session
from app.cores.database import get_db
from app.models.movie import Movie, Genre, Keyword
from app.models.movie_relations import MovieKeyword, MovieGenre
from math import log10


def normalize_vote_average(vote_average: float, db: Session) -> float:
    max_vote_average = db.query(Movie).order_by(Movie.vote_average.desc()).first().vote_average
    return log10(vote_average) / log10(max_vote_average)


def extract_to_json(db: Session, output_path: str) -> None:
    genres = db.query(Genre).order_by(Genre.id).all()
    keywords = db.query(Keyword).order_by(Keyword.id).all()

    movies = db.query(Movie).all()
    export_list = []

    for movie in movies:
        # Get genre ids for this movie
        movie_genre_ids = {mg.genre_id for mg in db.query(MovieGenre).filter_by(movie_id=movie.id)}
        genre_vector = [1 if genre.id in movie_genre_ids else 0 for genre in genres]

        # Get keyword ids for this movie
        movie_keyword_ids = {mk.keyword_id for mk in db.query(MovieKeyword).filter_by(movie_id=movie.id)}
        keyword_vector = [1 if keyword.id in movie_keyword_ids else 0 for keyword in keywords]

        export_list.append({
            "movie_id": movie.id,
            "genre": genre_vector,
            "keyword": keyword_vector,
            "vote_average": normalize_vote_average(movie.vote_average, db),
        })
        
        break

    with open(output_path, "w") as f:
        json.dump(export_list, f, indent=4)


if __name__ == "__main__":
    db = next(get_db())
    output_path = output_path = "app/services/recommendation_service/recommendation_db.json"
    extract_to_json(db, output_path)
    print(f"Data extracted to {output_path}")