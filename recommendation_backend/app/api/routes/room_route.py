from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from sqlalchemy.orm import Session
import json
from app.cores.auth import decode_access_token
from app.cores.websocket_mediator import WebSocketMediator
from app.models.watch_room import WatchRoom
from app.models.user import User
from app.cores.database import get_db
from datetime import datetime

router = APIRouter(prefix="/room", tags=["room"])

mediator = WebSocketMediator()

async def verify_tokens_and_get_user(websocket: WebSocket, room_id: str, db: Session):
    try:
        params = websocket.query_params
        room_token = params.get("room_token")
        user_token = params.get("user_token")

        if not room_token or not user_token:
            return None, None, None

        room_payload = decode_access_token(room_token)
        user_payload = decode_access_token(user_token)

        if not room_payload or not user_payload:
            return None, None, None

        token_room_id = room_payload.get("sub")
        user_id = user_payload.get("sub")

        if token_room_id != room_id:
            return None, None, None

        user = db.query(User).filter(User.id == int(user_id)).first()
        if not user:
            return None, None, None

        return {
            "room_id": token_room_id,
            "user_id": user_id,
            "display_name": user.display_name
        }
    except Exception as e:
        print(f"WebSocket verification error: {str(e)}")
        return None

@router.websocket("/{room_id}/chat")
async def websocket_chat(websocket: WebSocket, room_id: str, db: Session = Depends(get_db)):
    user_info = await verify_tokens_and_get_user(websocket, room_id, db)
    if not user_info:
        await websocket.close(code=1008)
        return

    room = db.query(WatchRoom).filter(WatchRoom.id == room_id).first()
    if not room:
        await websocket.close(code=1008)
        return

    try:
        await mediator.connect(websocket, room_id)
        system_message = {
            "type": "system",
            "content": f"{user_info['display_name']} has joined room {room_id}",
            "timestamp": datetime.now().isoformat(),
            "user": {
                "id": None,
                "display_name": "System"
            }
        }
        await mediator.notify(room_id, system_message)

        while True:
            data = await websocket.receive_text()
            message_data = json.loads(data)
            chat_message = {
                "type": "chat",
                "content": message_data.get("message", ""),
                "timestamp": datetime.now().isoformat(),
                "user": {
                    "id": user_info["user_id"],
                    "display_name": user_info["display_name"]
                }
            }
            await mediator.notify(room_id, chat_message)
    except WebSocketDisconnect:
        mediator.disconnect(websocket, room_id)
        leave_message = {
            "type": "system",
            "content": f"{user_info['display_name']} has left room {room_id}",
            "timestamp": datetime.now().isoformat(),
            "user": {
                "id": None,
                "display_name": "System"
            }
        }
        await mediator.notify(room_id, leave_message)
    except Exception:
        await websocket.close(code=1000)