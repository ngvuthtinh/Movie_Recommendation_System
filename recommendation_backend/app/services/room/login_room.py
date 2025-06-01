from app.models.watch_room import WatchRoom
from app.services.room.get_room import get_room_by_name
from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.services.utils.verfify_password import verify_password


def authentication_room(db, room_name: str, password: str):
    """
    Authenticate a room by room_id and password.

    Args:
        db (Session): The database session.
        room_name (str): The name of the room to authenticate.
        password (str): The password of the room to authenticate.

    Returns:
        Room: The authenticated room object if credentials are valid, None otherwise.
    """
    room = get_room_by_name(room_name, db)
    if not room:
        raise HTTPException(
            status_code=400,
            detail="The room does not exist",
            headers={"WWW-Authenticate": "Bearer"}
        )

    if verify_password(password, room.password):
        return room

    raise HTTPException(
        status_code=400,
        detail="Invalid password",
        headers={"WWW-Authenticate": "Bearer"}
    )