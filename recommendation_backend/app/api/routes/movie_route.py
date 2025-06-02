from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.services.movie.get_movie import get_movie_detail
from app.schemas.movie import MovieDetail
from app.cores.database import get_db

router = APIRouter(prefix="/movies", tags=["movies"])

@router.get("/{movie_id}", response_model=MovieDetail)
def read_movie_detail(movie_id: int, db: Session = Depends(get_db)):
    movie = get_movie_detail(db, movie_id)
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    return movie