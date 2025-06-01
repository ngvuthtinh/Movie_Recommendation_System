import {WatchRoomRegister} from "@/types/WatchRoom.ts";

export async function RegisterRoom(data: WatchRoomRegister) {
    const response = await fetch(`http://localhost:8000/room/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error("Room registration failed");

    return response.json();
}