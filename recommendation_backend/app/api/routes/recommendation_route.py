from fastapi import APIRouter, Depends, Query, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional, Dict
from app.schemas.movie import MovieOut
from app.cores.database import get_db
from app.cores.dependencies import get_current_user_id
from app.services.recommendation.recommend import recommend_for_click, recommend_for_history    

router = APIRouter(prefix="/recommendation", tags=["recommendation"])


@router.get(
    "/movie/{movie_id}",
    response_model=List[MovieOut],
    summary="Get movie recommendations based on a specific movie"
)
def get_movie_recommendations(
    movie_id: int,
    recommendation_type: str = Query( ..., 
        description="Type of recommendation to perform: recommend_for_you, top_rated, trending_now, new_released"
    ),
    n: int = Query(10, ge=1, le=50, description="Number of recommendations to return"),
    db: Session = Depends(get_db),
    current_user: Dict = Depends(get_current_user_id)
):
    """
    Retrieves a list of recommended movie objects based on the consine-similarity algorithm.
    """
    try:
        user_id = current_user.get("id") if current_user else None
        recommended_movies = recommend_for_click(movie_id, db, recommendation_type, n, user_id)
        return recommended_movies # FastAPI will automatically convert List[Movie] to List[MovieOut]
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e) or "Movie not found or no recommendations available"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e) or "An error occurred while fetching recommendations"
        )
    
    
@router.get(
    "/user",
    response_model=List[MovieOut],
    summary="Get movie recommendations based on user history"   
)
def get_user_recommendations(
    recommendation_type: str = Query(..., 
        description="Type of recommendation to perform: recommend_for_you, top_rated, trending_now, new_released"
    ),
    n: int = Query(10, ge=1, le=50, description="Number of recommendations to return"),
    history_size: int = Query(10, ge=1, le=50, description="Number of recent movies to consider from the user's history"),
    db: Session = Depends(get_db),
    current_user: Dict = Depends(get_current_user_id)
):
    """
    Retrieves a list of recommended movie objects based on the user's watch history.
    """
    try:
        user_id = current_user.get("id")
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not authenticated"
            )
        
        recommended_movies = recommend_for_history(db, user_id, recommendation_type, n, history_size)
        return recommended_movies  # FastAPI will automatically convert List[Movie] to List[MovieOut]
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e) or "No recommendations available based on user history"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e) or "An error occurred while fetching recommendations"
        )