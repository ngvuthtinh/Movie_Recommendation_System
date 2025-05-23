from datetime import datetime
from fastapi import HTTPException
from sqlalchemy.orm.session import Session
from passlib.context import CryptContext
from app.models.user import User
from app.schemas.user import UserCreate
from app.services.utils.get_user import get_user_by_email

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_user(db: Session, user_data: UserCreate) -> User:
    """
    Create a new user in the database.

    Args:
        db (Session): The database session.
        user_data (UserCreate): The user data to create.

    Returns:
        User: The created user object.
    """
    if get_user_by_email(db, user_data.email):
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    hashed_password = pwd_context.hash(user_data.password)

    db_user = User(
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        date_of_birth=user_data.date_of_birth,
        phone_number=user_data.phone_number,
        email=user_data.email,
        password=hashed_password,
        created_date=datetime.now(),
        display_name=user_data.first_name + " " + user_data.last_name,
        avatar_url=""
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user