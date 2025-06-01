import { WatchRoomLogin} from "@/types/WatchRoom.ts";

export async function LoginRoom(data: WatchRoomLogin): Promise<void> {
    const roomData = {
        room_name: data.roomName,
        password: data.password
    }

    const response = await fetch("http://localhost:8000/room/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(roomData),
    });

    if (!response.ok) throw new Error("Login failed");

    return response.json();
}