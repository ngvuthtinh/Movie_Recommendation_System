import {WatchRoomRegister} from "@/types/WatchRoom.ts";

export async function CreateRoom(data: WatchRoomRegister) {
    // Create a new object with only the required fields
    const roomData = {
        movie_id: data.movieId,
        room_name: data.roomName,
        password: data.password
    };

    console.log('Sending room data:', roomData);

    const response = await fetch(`http://localhost:8000/room/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(roomData)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Room registration failed: ${errorData.message || response.statusText}`);
    }

    return response.json();
}