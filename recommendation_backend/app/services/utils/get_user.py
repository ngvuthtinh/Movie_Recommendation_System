from sqlalchemy.orm.session import Session
from app.models.user import User

def get_user_by_email(db: Session, email: str) -> User | None:
    """
    Get a user by email from the database.

    Args:
        db (Session): The database session.
        email (str): The email of the user to retrieve.

    Returns:
        User: The user object if found, None otherwise.
    """
    return db.query(User).filter(User.email == email).first()
