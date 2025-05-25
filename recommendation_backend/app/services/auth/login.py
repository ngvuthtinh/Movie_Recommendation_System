from fastapi import HTTPException
from sqlalchemy.orm.session import Session
from app.models.user import User

from app.services.utils.get_user import get_user_by_email
from app.services.utils.verfify_password import verify_password

def authentication_user(db: Session, email: str, password: str) -> User:
    """
    Authenticate a user by email and password.

    Args:
        db (Session): The database session.
        email (str): The email of the user to authenticate.
        password (str): The password of the user to authenticate.

    Returns:
        User: The authenticated user object if credentials are valid, None otherwise.
    """
    user = get_user_by_email(db, email)
    if not user:
        raise HTTPException(
            status_code=400,
            detail="The email does not exist",
            headers={"WWW-Authenticate": "Bearer"}
        )

    if verify_password(password, user.password):
        return user
    raise HTTPException(
        status_code=400,
        detail="Invalid password",
        headers={"WWW-Authenticate": "Bearer"}
    )