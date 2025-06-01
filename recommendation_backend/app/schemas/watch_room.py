from pydantic import BaseModel

class RoomCreate(BaseModel):
    movie_id: int
    room_name: str
    password: str

class RoomOut(BaseModel):
    id: int

    class Config:
        from_attributes = True

class RoomLogin(BaseModel):
    room_name: str
    password: str