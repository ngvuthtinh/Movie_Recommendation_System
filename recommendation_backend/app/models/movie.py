from sqlalchemy import Column, Integer, String, Float, Date, Text, Boolean
from app.cores.database import Base
from app.models.movie_relations import MovieGenre, MovieKeyword, MovieCompany, MovieLanguage
from sqlalchemy.orm import relationship

class ProductionCountry(Base):
    __tablename__ = "production_country"
    id = Column(Integer, primary_key=True)
    country = Column(String(100), unique=True, nullable=False)


class ProductionCompany(Base):
    __tablename__ = "production_company"
    id = Column(Integer, primary_key=True)
    company_name = Column(String(100))


class SpokenLanguage(Base):
    __tablename__ = "spoken_language"
    id = Column(Integer, primary_key=True)
    language = Column(String(100), unique=True, nullable=False)

class Genre(Base):
    __tablename__ = "genre"
    id = Column(Integer, primary_key=True)
    genre_name = Column(String(100), nullable=False)


class Keyword(Base):
    __tablename__ = "keyword"
    id = Column(Integer, primary_key=True)
    word = Column(String(100), nullable=False)


class Movie(Base):
    __tablename__ = "movie"
    id = Column(Integer, primary_key=True)
    title = Column(String(255), nullable=False)
    release_date = Column(Date)
    vote_average = Column(Float)
    vote_count = Column(Integer)
    status = Column(String(50))
    overview = Column(Text)
    original_language = Column(String(50))
    backdrop_path = Column(String(255))
    poster_path = Column(String(255))
    popularity = Column(Float)
    adult = Column(Boolean)
    runtime = Column(Integer)
    tagline = Column(Text)
    movie_link = Column(String(255))

    # Relationships
    genres = relationship("Genre", secondary="movie_genre", backref="movies")
    keywords = relationship("Keyword", secondary="movie_keyword", backref="movies")
    companies = relationship("ProductionCompany", secondary="movie_company", backref="movies")
    languages = relationship("SpokenLanguage", secondary="movie_language", backref="movies")
