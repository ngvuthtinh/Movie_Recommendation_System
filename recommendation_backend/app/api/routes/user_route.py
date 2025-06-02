from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.user import UserResponse, UserUpdate, ChangePassword, UserResponseDetail
from app.models.user import User
from app.services.utils.get_user_data import get_user_data
from app.services.user.update_profile import update_user_profile
from app.services.user.change_password import change_password
from app.cores.database import get_db
from app.cores.dependencies import get_current_user

router = APIRouter(
    prefix="/users",
    tags=["User"],
)


@router.get("/me", response_model=UserResponse)
def get_current_user_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> UserResponse:
    """
    Retrieve the current user's profile information.

    Args:
        db (Session): The database session.
        current_user (User): The currently authenticated user.

    Returns:
        UserResponse: The current user's profile information.
    """
    user_data = get_user_data(db, current_user.id)
    
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found."
        )
    
    return UserResponse.model_validate(user_data)


@router.put("/me", response_model=UserResponse)
def update_current_user_profile(
    user_update: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> UserResponse:
    """
    Update the current user's profile information.

    Args:
        user_update (UserUpdate): The data to update the user's profile.
        db (Session): The database session.
        current_user (User): The currently authenticated user.

    Returns:
        UserResponse: The updated user's profile information.
    """
    updated_user = update_user_profile(db, current_user.id, user_update)
    
    if not updated_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found."
        )
    
    return UserResponse.model_validate(updated_user)


@router.put("/me/password", response_model=UserResponse)
def update_user_password(
    password_data: ChangePassword,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> UserResponse:
    """
    Change the current user's password.
    Args:
        password_data (ChangePassword): The data containing old and new passwords.
        db (Session): The database session.
        current_user (User): The currently authenticated user.
    Returns:
        UserResponse: The updated user's profile information after password change.
    """
    
    updated_user = change_password(
        db, current_user.id, password_data
    )
    
    if not updated_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found."
        )
    
    return UserResponse.model_validate(updated_user)


@router.get("/me/details", response_model=UserResponseDetail)
def get_current_user_details(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> UserResponseDetail:
    """
    Retrieve the current user's detailed profile information.

    Args:
        db (Session): The database session.
        current_user (User): The currently authenticated user.

    Returns:
        UserResponseDetail: The current user's detailed profile information.
    """
    user_data = get_user_data(db, current_user.id)
    
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found."
        )
    
    return UserResponseDetail.model_validate(user_data)