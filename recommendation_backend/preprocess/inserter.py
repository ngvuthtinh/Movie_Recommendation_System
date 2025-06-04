import pickle
from typing import List, Dict
from sqlalchemy.orm import Session
from app.models.movie import (
    Movie, Genre, Keyword, ProductionCompany, ProductionCountry, SpokenLanguage
)
from app.models.movie_relations import (
    MovieGenre, MovieKeyword, MovieCompany, MovieCountry, MovieLanguage
)


def insert_all(db: Session, data_path: str) -> None:
    with open(data_path, 'rb') as file:
        raw_data = pickle.load(file)
        data = {}
        for entry in raw_data:
            data.update(entry)

    movie_data = data['movie']
    genre_data = data['genres_table']
    keyword_data = data['keywords_table']
    company_data = data['production_companies_table']
    country_data = data['production_countries_table']
    language_data = data['spoken_languages_table']
    movie_genre_data = data['movie_genres']
    movie_keyword_data = data['movie_keywords']
    movie_company_data = data['movie_production_companies']
    movie_country_data = data['movie_production_countries']
    movie_language_data = data['movie_spoken_languages']

    insert_movie(db, movie_data.to_dict(orient='records'))
    insert_genre(db, genre_data.to_dict(orient='records'))
    insert_keyword(db, keyword_data.to_dict(orient='records'))
    insert_production_company(db, company_data.to_dict(orient='records'))
    insert_production_country(db, country_data.to_dict(orient='records'))
    insert_spoken_language(db, language_data.to_dict(orient='records'))
    insert_movie_genre(db, movie_genre_data.to_dict(orient='records'))
    insert_movie_keyword(db, movie_keyword_data.to_dict(orient='records'))
    insert_movie_company(db, movie_company_data.to_dict(orient='records'))
    insert_movie_country(db, movie_country_data.to_dict(orient='records'))
    insert_movie_language(db, movie_language_data.to_dict(orient='records'))



def insert_movie(db: Session, movie_data) -> None:
    for row in movie_data:
        movie = Movie(
            id=row['movie_id'],
            title=row['title'],
            release_date=row['release_date'],
            vote_average=row['vote_average'],
            vote_count=row['vote_count'],
            status=row['status'],
            overview=row['overview'],
            original_language=row['original_language'],
            backdrop_path=row['backdrop_path'],
            poster_path=row['poster_path'],
            popularity=row['popularity'],
            adult=row['adult'],
            runtime=row['runtime'],
            tagline=row['tagline'],
        )
        db.merge(movie)
    db.commit() 


def insert_genre(db: Session, genre_data) -> None:
    for row in genre_data:
        genre = Genre(
            id=row['id'],
            genre_name=row['genres']
        )
        db.merge(genre)
    db.commit()

def insert_keyword(db: Session, keyword_data) -> None:
    for row in keyword_data:
        keyword = Keyword(
            id=row['id'],
            word=row['keywords']
        )
        db.merge(keyword)
    db.commit()


def insert_production_company(db: Session, company_data) -> None:
    for row in company_data:
        company = ProductionCompany(
            id=row['id'],
            company_name=row['production_companies']
        )
        db.merge(company)
    db.commit()


def insert_production_country(db: Session, country_data) -> None:
    for row in country_data:
        country = ProductionCountry(
            country=row['production_countries']
        )
        db.merge(country)
    db.commit()


def insert_spoken_language(db: Session, language_data) -> None:
    for row in language_data:
        language = SpokenLanguage(
            id=row['id'],
            language=row['spoken_languages']
        )
        db.merge(language)
    db.commit()

def insert_movie_genre(db: Session, movie_genre_data) -> None:
    for row in movie_genre_data:
        movie_genre = MovieGenre(
            movie_id=row['movie_id'],
            genre_id=row['genres_id']
        )
        db.merge(movie_genre)
    db.commit()

def insert_movie_keyword(db: Session, movie_keyword_data) -> None:
    for row in movie_keyword_data:
        movie_keyword = MovieKeyword(
            movie_id=row['movie_id'],
            keyword_id=row['keywords_id']
        )
        db.merge(movie_keyword)
    db.commit()

def insert_movie_company(db: Session, movie_company_data) -> None:
    for row in movie_company_data:
        movie_company = MovieCompany(
            movie_id=row['movie_id'],
            company_id=row['production_companies_id']
        )
        db.merge(movie_company)
    db.commit()

def insert_movie_country(db: Session, movie_country_data) -> None:
    for row in movie_country_data:
        movie_country = MovieCountry(
            movie_id=row['movie_id'],
            country_id=row['production_countries_id']
        )
        db.merge(movie_country)
    db.commit()

def insert_movie_language(db: Session, movie_language_data) -> None:
    for row in movie_language_data:
        movie_language = MovieLanguage(
            movie_id=row['movie_id'],
            language_id=row['spoken_languages_id']
        )
        db.merge(movie_language)
    db.commit()