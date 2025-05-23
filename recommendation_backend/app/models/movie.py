from sqlalchemy import Column, Integer, String, Float, Date, Text, Boolean
from app.cores.database import Base

class ProductionCountry(Base):
    __tablename__ = "production_country"
    country = Column(String(100), primary_key=True)


class ProductionCompany(Base):
    __tablename__ = "production_company"
    id = Column(Integer, primary_key=True, autoincrement=True)
    company_name = Column(String(100))


class SpokenLanguage(Base):
    __tablename__ = "spoken_language"
    id = Column(Integer, primary_key=True, autoincrement=True)
    language = Column(String(100), unique=True, nullable=False)


class Genre(Base):
    __tablename__ = "genre"
    id = Column(Integer, primary_key=True, autoincrement=True)
    genre_name = Column(String(100), nullable=False)


class Keyword(Base):
    __tablename__ = "keyword"
    id = Column(Integer, primary_key=True, autoincrement=True)
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