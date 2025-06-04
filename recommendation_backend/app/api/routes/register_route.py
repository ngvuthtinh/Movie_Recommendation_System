from fastapi import APIRouter, Depends
from app.cores.database import get_db
from app.services.auth.register import create_user
from sqlalchemy.orm import Session
from app.schemas.token import Token
from app.schemas.user import UserCreate
from app.cores.auth import create_token_access

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=Token)
async def register(user: UserCreate, db: Session = Depends(get_db)):
    new_user = create_user(
        db,
        user_data=user
    )
    access_token = create_token_access(data={"sub": str(new_user.id)})
    return {"access_token": access_token, "token_type": "bearer"}