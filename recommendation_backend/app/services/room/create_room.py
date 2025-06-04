from fastapi import HTTPException
from sqlalchemy.orm.session import Session
from passlib.context import CryptContext
from app.models.watch_room import WatchRoom
from app.schemas.watch_room import RoomCreate
from app.services.room.get_room import get_room_by_name

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_room_service(db: Session, room_create: RoomCreate) -> WatchRoom:
    """
    Create a new watch room in the database.

    Args:
        db (Session): The database session.
        room_create (RoomCreate): The room data to create.

    Returns:
        WatchRoom: The created watch room object.
    """
    if get_room_by_name(room_create.room_name, db):
        raise HTTPException(
            status_code=400,
            detail="Room name already exists"
        )

    hashed_password = pwd_context.hash(room_create.password)

    db_room = WatchRoom(
        room_name=room_create.room_name,
        password=hashed_password,
        movie_id=room_create.movie_id,
    )

    db.add(db_room)
    db.commit()
    db.refresh(db_room)
    return db_room

