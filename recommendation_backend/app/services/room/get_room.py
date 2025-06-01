from app.models.watch_room import WatchRoom
from sqlalchemy.orm import Session

def get_room_by_name(name: str, db: Session) -> WatchRoom | None:
    """
    Get a room by its name.

    Args:
        name (str): The name of the room.
        db (Session): The database session.

    Returns:
        WatchRoom | None: The room if found, otherwise None.
    """
    return db.query(WatchRoom).filter(WatchRoom.room_name == name).first()