from pydantic import BaseModel

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenDataUser(Token):
    username: str | None = None

class TokenDataRoom(Token):
    room_id: int | None = None