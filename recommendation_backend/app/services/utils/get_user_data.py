from sqlalchemy import func, distinct
from sqlalchemy.orm import Session
from app.models.user import User, WatchRecord, Gallery
from app.schemas.user import UserResponse, UserResponseDetail
from fastapi import HTTPException, status
from app.services.utils.get_user import get_user_by_id

def get_user_data(db: Session, user_id: int) -> UserResponseDetail:
    """
    Retrieve the user profile by user ID.

    Args:
        db (Session): The database session.
        user_id (int): The ID of the user whose profile is to be retrieved.

    Returns:
        UserResponse: The user's profile information.
    """
    user = get_user_by_id(db, user_id)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with ID {user_id} not found."
        )
    
    history_amount = db.query(func.count(distinct(WatchRecord.movie_id)))\
              .filter(WatchRecord.user_id == user_id)\
              .scalar()
              
    gallery_amount = db.query(func.count(distinct(Gallery.movie_id)))\
              .filter(Gallery.user_id == user_id)\
              .scalar()
              
    user.movies_in_list = history_amount if history_amount else 0
    user.movies_watched = gallery_amount if gallery_amount else 0
    
    return UserResponseDetail.model_validate(user)
    