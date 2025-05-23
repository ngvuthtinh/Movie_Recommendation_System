from sqlalchemy import Column, Integer, String, ForeignKey
from app.cores.database import Base

class MovieCompany(Base):
    __tablename__ = "movie_company"
    movie_id = Column(Integer, ForeignKey("movie.id", ondelete="CASCADE"), primary_key=True)
    company_id = Column(Integer, ForeignKey("production_company.id", ondelete="CASCADE"), primary_key=True)


class MovieCountry(Base):
    __tablename__ = "movie_country"
    movie_id = Column(Integer, ForeignKey("movie.id", ondelete="CASCADE"), primary_key=True)
    country = Column(String(100), ForeignKey("production_country.country", ondelete="CASCADE"), primary_key=True)


class MovieLanguage(Base):
    __tablename__ = "movie_language"
    movie_id = Column(Integer, ForeignKey("movie.id", ondelete="CASCADE"), primary_key=True)
    language_id = Column(Integer, ForeignKey("spoken_language.id", ondelete="CASCADE"), primary_key=True)


class MovieGenre(Base):
    __tablename__ = "movie_genre"
    movie_id = Column(Integer, ForeignKey("movie.id", ondelete="CASCADE"), primary_key=True)
    genre_id = Column(Integer, ForeignKey("genre.id", ondelete="CASCADE"), primary_key=True)


class MovieKeyword(Base):
    __tablename__ = "movie_keyword"
    movie_id = Column(Integer, ForeignKey("movie.id", ondelete="CASCADE"), primary_key=True)
    keyword_id = Column(Integer, ForeignKey("keyword.id", ondelete="CASCADE"), primary_key=True)