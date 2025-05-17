from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import (
    Base, Movie, Genre, ProductionCompany, ProductionCountry, SpokenLanguage, Keyword,
    MovieGenre, MovieCompany, MovieCountry, MovieLanguage, MovieKeyword
)
from sqlalchemy.exc import SQLAlchemyError
import pandas as pd

class DataInserter:
    def __init__(self, db_url: str):
        self.engine = create_engine(db_url)
        self.Session = sessionmaker(bind=self.engine) 
        # Create tables
        Base.metadata.create_all(self.engine)
        
    # Insert all data into the database
    def insert_all_data(self, processed_data) -> None:
        session = self.Session()
        try:
            # Insert strong tables
            self.insert_movies(session, processed_data["movie"])
            self.insert_genres(session, processed_data["genres"])
            self.insert_production_companies(session, processed_data["production_companies"])
            self.insert_production_countries(session, processed_data["production_countries"])
            self.insert_spoken_languages(session, processed_data["spoken_languages"])
            self.insert_keywords(session, processed_data["keywords"])
            
            # Insert associative tables
            self.insert_movie_genre(session, processed_data["genres_associative"])
            self.insert_movie_company(session, processed_data["production_companies_associative"])
            self.insert_movie_country(session, processed_data["production_countries_associative"])
            self.insert_movie_language(session, processed_data["spoken_languages_associative"])
            self.insert_movie_keyword(session, processed_data["keywords_associative"])
            
            session.commit()
        except SQLAlchemyError as e:
            session.rollback()
            raise Exception(f"Error inserting data: {e}")
        finally:
            session.close()
    
    # Methods to insert data into the database  
    def insert_movies(self, session, movie_df: pd.DataFrame) -> None: 
        for _, row in movie_df.iterrows():
            movie = Movie(
                id=row['id'],
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
                tagline=row['tagline']
            )
            session.merge(movie)


    def insert_genres(self, session, genre_df: pd.DataFrame) -> None:
        for _, row in genre_df.iterrows():
            genre = Genre(
                genre_name=row['genres_name']
            )
            session.merge(genre)
            
            
    def insert_production_companies(self, session, production_company_df: pd.DataFrame) -> None:
        for _, row in production_company_df.iterrows():
            production_company = ProductionCompany(
                company_name=row['production_companies_name']
            )
            session.merge(production_company)
            
 
    def insert_production_countries(self, session, production_country_df: pd.DataFrame) -> None:
        for _, row in production_country_df.iterrows():
            production_country = ProductionCountry(
                country=row['production_countries_name']
            )
            session.merge(production_country)
            
            
    def insert_spoken_languages(self, session, spoken_language_df: pd.DataFrame) -> None:
        for _, row in spoken_language_df.iterrows():
            spoken_language = SpokenLanguage(
                language=row['spoken_languages_name']
            )
            session.merge(spoken_language)
            

    def insert_keywords(self, session, keyword_df: pd.DataFrame) -> None:
        for _, row in keyword_df.iterrows():
            keyword = Keyword(
                word=row['keywords_name']
            )
            session.merge(keyword)
            

    def insert_movie_genre(self, session, movie_genre_df: pd.DataFrame) -> None:
        for _, row in movie_genre_df.iterrows():
            movie_genre = MovieGenre(
                movie_id=row['id'],
                genre_id=session.query(Genre).filter(Genre.genre_name == row['genres_name']).first().id
            )
            session.merge(movie_genre)
            
            
    def insert_movie_company(self, session, movie_company_df: pd.DataFrame) -> None:
        for _, row in movie_company_df.iterrows():
            movie_company = MovieCompany(
                movie_id=row['id'],
                company_id=session.query(ProductionCompany).filter(ProductionCompany.company_name == row['production_companies_name']).first().id
            )
            session.merge(movie_company)
            
    
    def insert_movie_country(self, session, movie_country_df: pd.DataFrame) -> None:
        for _, row in movie_country_df.iterrows():
            movie_country = MovieCountry(
                movie_id=row['id'],
                country=session.query(ProductionCountry).filter(ProductionCountry.country == row['production_countries_name']).first().country
            )
            session.merge(movie_country)
        
    
    def insert_movie_language(self, session, movie_language_df: pd.DataFrame) -> None:
        for _, row in movie_language_df.iterrows():
            movie_language = MovieLanguage(
                movie_id=row['id'],
                language_id=session.query(SpokenLanguage).filter(SpokenLanguage.language == row['spoken_languages_name']).first().id
            )
            session.merge(movie_language)
            
            
    def insert_movie_keyword(self, session, movie_keyword_df: pd.DataFrame) -> None:
        for _, row in movie_keyword_df.iterrows():
            movie_keyword = MovieKeyword(
                movie_id=row['id'],
                keyword_id=session.query(Keyword).filter(Keyword.word == row['keywords_name']).first().id
            )
            session.merge(movie_keyword)