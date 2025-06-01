# app/schemas/movie.py
from pydantic import BaseModel
from datetime import date
from typing import Optional


class MovieBase(BaseModel):
    title: str
    release_date: Optional[date] = None
    vote_average: Optional[float] = None
    vote_count: Optional[int] = None
    overview: Optional[str] = None
    original_language: Optional[str] = None
    popularity: Optional[float] = None
    runtime : Optional[int] = None
    poster_path: Optional[str] = None
    backdrop_path: Optional[str] = None
    tagline: Optional[str] = None 
    is_watched: Optional[bool] = False
    is_loved: Optional[bool] = False
    
class MovieOut(MovieBase):
    id: int 
    
    class Config:
        from_attributes = True
        # arbitrary_types_allowed = True


class MovieTitleOut(BaseModel):
    id: int
    title: str

    class Config:
        from_attributes = True
