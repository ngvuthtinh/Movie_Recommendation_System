from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends
from app.cores.database import get_db
from app.schemas.watch_room import RoomCreate
from app.services.room.create_room import create_room_service
from app.schemas.token import Token
from app.cores.auth import create_token_access

router = APIRouter(prefix="/room", tags=["room"])
@router.post("/create", response_model=Token)
async def create_room_route(room_create: RoomCreate, db: Session = Depends(get_db)):
    """
    Create a new watch room.

    Args:
        room_create (RoomCreate): The room data to create.
        db (Session): The database session.

    Returns:
        Token: The access token for the created room.
    """
    new_room = create_room_service(db=db, room_create=room_create)
    access_token = create_token_access(data={"sub": str(new_room.id)})
    return {"access_token": access_token, "token_type": "bearer", "room_id": new_room.id}
