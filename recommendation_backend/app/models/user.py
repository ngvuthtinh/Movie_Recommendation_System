from sqlalchemy import Column, Integer, String, Date, ForeignKey, DateTime
from app.core.database import Base


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


class FavoriteMovie(Base):
    __tablename__ = "favorite_movie"
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), primary_key=True)
    like_timestamp = Column(DateTime, primary_key=True)
    amount = Column(Integer)


class WatchRecord(Base):
    __tablename__ = "watch_record"
    user_id = Column(Integer, primary_key=True)
    watch_timestamp = Column(DateTime, primary_key=True)
    movie_id = Column(Integer, ForeignKey("movie.id", ondelete="CASCADE"), primary_key=True)


class Gallery(Base):
    __tablename__ = "gallery"
    user_id = Column(Integer, primary_key=True)
    like_timestamp = Column(DateTime, primary_key=True)
    movie_id = Column(Integer, ForeignKey("movie.id", ondelete="CASCADE"), primary_key=True)


class Participant(Base):
    __tablename__ = "participant"
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), primary_key=True)
    room_id = Column(Integer, ForeignKey("watch_room.id", ondelete="CASCADE"), primary_key=True)
