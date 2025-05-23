from datetime import date
from pydantic import BaseModel

class UserBase(BaseModel):
    first_name: str
    last_name: str
    date_of_birth: date
    phone_number: str
    email: str

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: int

    class Config:
        from_attributes = True

class UserUpdate(UserBase):
    display_name: str
    avatar_url: str



