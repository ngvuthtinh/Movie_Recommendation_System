from sqlalchemy import Column, Integer, String, ForeignKey
from app.core.database import Base


class WatchRoom(Base):
    __tablename__ = "watch_room"
    id = Column(Integer, primary_key=True, autoincrement=True)
    movie_id = Column(Integer, ForeignKey("movie.id", ondelete="CASCADE"))
    room_name = Column(String(100))
    password = Column(String(255))
