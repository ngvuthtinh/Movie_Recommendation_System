from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
import json
from app.cores.auth import verify_user_token, verify_room_token
from app.cores.websocket_mediator import WebSocketMediator
from app.models.watch_room import WatchRoom
from app.cores.database import get_db

router = APIRouter(prefix="/room", tags=["room"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
user_oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/user/login")

async def get_username_from_token(user_token: str = Depends(user_oauth2_scheme)) -> str:
    token_data = verify_user_token(user_token)
    if not token_data.username:
        raise HTTPException(status_code=401, detail="Invalid user token")
    return token_data.username

async def get_room_id_from_token(room_token: str = Depends(oauth2_scheme)) -> str:
    token_data = verify_room_token(room_token)
    if not token_data.room_id:
        raise HTTPException(status_code=401, detail="Invalid room token")
    return token_data.room_id

@router.websocket("/{room_id}/chat")
async def websocket_chat(
        websocket: WebSocket,
        room_id: str,
        room_token: str = Depends(oauth2_scheme),
        user_token: str = Depends(user_oauth2_scheme),
        db: Session = Depends(get_db)
):
    # Validate tokens
    token_room_id = await get_room_id_from_token(room_token)
    if token_room_id != room_id:
        await websocket.close(code=1008)
        return
    username = await get_username_from_token(user_token)

    # Validate room exists
    room = db.query(WatchRoom).filter(WatchRoom.id == room_id).first()
    if not room:
        await websocket.close(code=1008)
        return

    # Initialize Mediator
    mediator = WebSocketMediator()

    try:
        await mediator.connect(websocket, room_id)
        await mediator.notify(room_id, {"username": "System", "message": f"{username} has joined room {room_id}"})

        while True:
            data = await websocket.receive_text()
            message_data = json.loads(data)
            await mediator.notify(room_id, {
                "username": username,
                "message": message_data.get("message", "")
            })
    except WebSocketDisconnect:
        mediator.disconnect(websocket, room_id)
        await mediator.notify(room_id, {"username": "System", "message": f"{username} has left room {room_id}"})
    except Exception:
        await websocket.close(code=1000)