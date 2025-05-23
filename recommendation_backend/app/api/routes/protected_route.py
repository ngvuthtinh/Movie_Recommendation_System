from fastapi import APIRouter, Depends
from app.cores.dependencies import get_current_user

router = APIRouter(prefix="/api", tags=["protected"])

@router.get("/protected")
async def protected_route(current_user: dict = Depends(get_current_user)):
    return {"message": f"Hello, user {current_user['user_id']}!"}