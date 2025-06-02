from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import Dict

router = APIRouter()
room_states: Dict[int, dict] = {}  # {room_id: {"is_playing": bool, "current_time": float}}
connections: Dict[int, list] = {}  # {room_id: [WebSocket, ...]}

@router.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: int):
    await websocket.accept()
    if room_id not in connections:
        connections[room_id] = []
    connections[room_id].append(websocket)
    try:
        while True:
            data = await websocket.receive_json()
            # Validate incoming data
            if "action" not in data or "current_time" not in data:
                continue  # Ignore malformed messages
            room_states[room_id] = {
                "is_playing": data["action"] == "play",
                "current_time": data["current_time"]
            }
            message = {
                "type": "play-pause",
                "play": room_states[room_id]["is_playing"],
                "current_time": room_states[room_id]["current_time"]
            }
            for conn in connections[room_id]:
                if conn != websocket:
                    await conn.send_json(message)
    except WebSocketDisconnect:
        connections[room_id].remove(websocket)