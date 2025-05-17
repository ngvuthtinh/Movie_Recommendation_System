from sqlalchemy import (
    Column, Integer, String, Float, Boolean, Text, Date, DateTime, ForeignKey
)
from sqlalchemy.orm import declarative_base

Base = declarative_base()


# Production Country table
class ProductionCountry(Base):
    __tablename__ = "production_country"
    country = Column(String(100), primary_key=True)


# Production Company table
class ProductionCompany(Base):
    __tablename__ = "production_company"
    id = Column(Integer, primary_key=True, autoincrement=True)
    company_name = Column(String(100))


# Spoken Language table
class SpokenLanguage(Base):
    __tablename__ = "spoken_language"
    id = Column(Integer, primary_key=True, autoincrement=True)
    language = Column(String(100), unique=True, nullable=False)


# Genre table
class Genre(Base):
    __tablename__ = "genre"
    id = Column(Integer, primary_key=True, autoincrement=True)
    genre_name = Column(String(100), nullable=False)


# Keyword table
class Keyword(Base):
    __tablename__ = "keyword"
    id = Column(Integer, primary_key=True, autoincrement=True)
    word = Column(String(100), nullable=False)


# Movie table
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


# Watch Room table
class WatchRoom(Base):
    __tablename__ = "watch_room"
    id = Column(Integer, primary_key=True, autoincrement=True)
    movie_id = Column(Integer, ForeignKey("movie.id", ondelete="CASCADE"))
    room_name = Column(String(100))
    password = Column(String(255))


# User table
class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String(50))
    last_name = Column(String(50))
    display_name = Column(String(100))
    email = Column(String(100), nullable=False, unique=True)
    phone_number = Column(String(20))
    date_of_birth = Column(Date)
    created_date = Column(Date)
    avatar_url = Column(String(255))
    password = Column(String(255), nullable=False)


# Watching History table
class WatchingHistory(Base):
    __tablename__ = "watching_history"
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), primary_key=True)
    watch_timestamp = Column(DateTime, primary_key=True)
    amount = Column(Integer)


# Favorite Movie table
class FavoriteMovie(Base):
    __tablename__ = "favorite_movie"
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), primary_key=True)
    like_timestamp = Column(DateTime, primary_key=True)
    amount = Column(Integer)


# Watch Record table
class WatchRecord(Base):
    __tablename__ = "watch_record"
    user_id = Column(Integer, primary_key=True)
    watch_timestamp = Column(DateTime, primary_key=True)
    movie_id = Column(Integer, ForeignKey("movie.id", ondelete="CASCADE"), primary_key=True)


# Gallery table
class Gallery(Base):
    __tablename__ = "gallery"
    user_id = Column(Integer, primary_key=True)
    like_timestamp = Column(DateTime, primary_key=True)
    movie_id = Column(Integer, ForeignKey("movie.id", ondelete="CASCADE"), primary_key=True)


# Participant table
class Participant(Base):
    __tablename__ = "participant"
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), primary_key=True)
    room_id = Column(Integer, ForeignKey("watch_room.id", ondelete="CASCADE"), primary_key=True)


# Movie Company table
class MovieCompany(Base):
    __tablename__ = "movie_company"
    movie_id = Column(Integer, ForeignKey("movie.id", ondelete="CASCADE"), primary_key=True)
    company_id = Column(Integer, ForeignKey("production_company.id", ondelete="CASCADE"), primary_key=True)


# Movie Country table
class MovieCountry(Base):
    __tablename__ = "movie_country"
    movie_id = Column(Integer, ForeignKey("movie.id", ondelete="CASCADE"), primary_key=True)
    country = Column(String(100), ForeignKey("production_country.country", ondelete="CASCADE"), primary_key=True)


# Movie Language table
class MovieLanguage(Base):
    __tablename__ = "movie_language"
    movie_id = Column(Integer, ForeignKey("movie.id", ondelete="CASCADE"), primary_key=True)
    language_id = Column(Integer, ForeignKey("spoken_language.id", ondelete="CASCADE"), primary_key=True)


# Movie Genre table 
class MovieGenre(Base):
    __tablename__ = "movie_genre"
    movie_id = Column(Integer, ForeignKey("movie.id", ondelete="CASCADE"), primary_key=True)
    genre_id = Column(Integer, ForeignKey("genre.id", ondelete="CASCADE"), primary_key=True)


# Movie Keyword table
class MovieKeyword(Base):
    __tablename__ = "movie_keyword"
    movie_id = Column(Integer, ForeignKey("movie.id", ondelete="CASCADE"), primary_key=True)
    keyword_id = Column(Integer, ForeignKey("keyword.id", ondelete="CASCADE"), primary_key=True)