from datetime import date
from pydantic import BaseModel
from typing import Optional


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


class UserTokenData(BaseModel):
    id: str


class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    date_of_birth: Optional[date] = None
    phone_number: Optional[str] = None
    email: Optional[str] = None
    display_name: Optional[str] = None
    avatar_url: Optional[str] = None


class UserLogin(BaseModel):
    email: str
    password: str
    

class ChangePassword(BaseModel):
    old_password: str
    new_password: str
    
    
class ChangeDisplayName(BaseModel):
    display_name: str
    

class UserResponse(BaseModel):
    id: int
    # first_name: str
    # last_name: str
    # date_of_birth: date
    # phone_number: str
    # email: str
    display_name: str
    avatar_url: str
    created_date: date
    movies_in_list: int = 0
    movies_watched: int = 0

    class Config:
        from_attributes = True
        
        
class UserResponseDetail(UserResponse):
    first_name: str
    last_name: str
    date_of_birth: date
    phone_number: str
    email: str

    class Config:
        from_attributes = True