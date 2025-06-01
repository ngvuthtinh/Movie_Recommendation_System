from fastapi import APIRouter, Depends
from app.cores.database import get_db
from app.schemas.watch_room import RoomLogin
from sqlalchemy.orm import Session
from app.schemas.token import Token

from app.cores.auth import create_token_access
from app.services.room.login_room import authentication_room

router = APIRouter(prefix="/room", tags=["room"])

@router.post("/login", response_model=Token)
def login(room: RoomLogin, db: Session = Depends(get_db)):
    """
    Authenticate a user and return an access token.

    Args:
        room (RoomLogin): The room credentials for authentication.
        db (Session): The database session.

    Returns:
        Token: The access token for the authenticated user.
    """
    authenticated_room = authentication_room(db, room.room_name, room.password)
    access_token = create_token_access(data={"sub": str(authenticated_room.id)})
    return {"access_token": access_token, "token_type": "bearer"}

