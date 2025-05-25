from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from app.cores.database import get_db
from app.schemas.user import UserLogin
from app.services.auth.login import authentication_user

from sqlalchemy.orm import Session
from app.schemas.token import Token

from app.cores.auth import create_token_access
router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    """
    Authenticate a user and return an access token.

    Args:
        user (OAuth2PasswordRequestForm): The form containing user credentials.
        db (Session): The database session.

    Returns:
        Token: The access token for the authenticated user.
    """
    authenticated_user = authentication_user(db, user.email, user.password)
    access_token = create_token_access(data={"sub": str(authenticated_user.id)})
    return {"access_token": access_token, "token_type": "bearer"}

