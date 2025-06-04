from pydantic import BaseModel
from datetime import date
from typing import Optional, List

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
    score: Optional[float] = None
    
    class Config:
        from_attributes = True
        # arbitrary_types_allowed = True


class MovieTitleOut(BaseModel):
    id: int
    title: str

    class Config:
        from_attributes = True

class GenreOut(BaseModel):
    id: int
    genre_name: str

class CompanyOut(BaseModel):
    id: int
    company_name: str

class KeywordOut(BaseModel):
    id: int
    word: str

class LanguageOut(BaseModel):
    id: int
    language: str

class MovieDetail(BaseModel):
    id: int
    title: str
    vote_average: float
    release_date: date
    runtime: int
    overview: str
    backdrop_path: str
    genres: List[GenreOut]
    keywords: List[KeywordOut]
    companies: List[CompanyOut]
    languages: List[LanguageOut]

class MovieLink(BaseModel):
    id: int
    link: str


