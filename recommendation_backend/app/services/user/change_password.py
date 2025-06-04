from sqlalchemy.orm import Session
from app.schemas.user import ChangePassword, UserResponse
from app.services.utils.verfify_password import verify_password
from app.services.utils.get_password import get_password_hash
from app.services.utils.get_user import get_user_by_id
from fastapi import HTTPException, status


def change_password(
    db: Session,
    user_id: int,
    change_password_data: ChangePassword
) -> UserResponse:
    """
    Change the password of a user.

    Args:
        db (Session): The database session.
        user_id (int): The ID of the user whose password is to be changed.
        change_password_data (ChangePassword): The data containing old and new passwords.

    Returns:
        UserResponse: The updated user information.

    Raises:
        HTTPException: If the old password is incorrect or if the user is not found.
    """
    user = get_user_by_id(db, user_id)

    if not verify_password(change_password_data.old_password, user.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect old password."
        )

    user.password = get_password_hash(change_password_data.new_password)
    db.commit()
    db.refresh(user)
    
    return UserResponse.model_validate(user)
