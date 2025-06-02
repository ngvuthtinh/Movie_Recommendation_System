from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, Query
from app.cores.database import get_db
from app.schemas.movie import MovieTitleOut
from app.services.movie.get_movie import search_movie_titles
router = APIRouter(prefix="/utils", tags=["utils"])

@router.get("/movies/search", response_model=list[MovieTitleOut])
def search_movies_route(query: str = Query(...), db: Session = Depends(get_db)):
    return search_movie_titles(db=db, query=query)

