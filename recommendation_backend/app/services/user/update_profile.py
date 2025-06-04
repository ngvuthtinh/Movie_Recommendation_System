from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserResponse, UserUpdate
from app.services.utils.get_user import get_user_by_id
from fastapi import HTTPException, status

def update_user_profile(
    db: Session,
    user_id: int,
    user_update_data: UserUpdate
) -> UserResponse:
    """
    Update the user profile with the provided data.

    Args:
        db (Session): The database session.
        user_id (int): The ID of the user whose profile is to be updated.
        user_update_data (UserUpdate): The data to update the user's profile.

    Returns:
        UserResponse: The updated user information.

    Raises:
        HTTPException: If the user is not found or if any validation fails.
    """
    user = get_user_by_id(db, user_id)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with ID {user_id} not found."
        )

    for key, value in user_update_data.model_dump(exclude_unset=True).items():
        setattr(user, key, value)

    db.commit()
    db.refresh(user)

    return UserResponse.model_validate(user)
