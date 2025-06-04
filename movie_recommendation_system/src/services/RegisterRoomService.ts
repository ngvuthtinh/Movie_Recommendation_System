import {WatchRoomRegister, JwtPayload, RoomResponse} from "@/types/WatchRoom.ts";

export async function CreateRoom(data: WatchRoomRegister): Promise<RoomResponse> {
    const userToken = localStorage.getItem('user_token');
    if (!userToken) {
        throw new Error('No authentication token found');
    }

    const roomData = {
        room_name: data.roomName,
        movie_id: data.movieId,
        password: data.password
    };

    // Create room
    const response = await fetch("http://localhost:8000/room/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`
        },
        body: JSON.stringify(roomData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create room");
    }

    const result = await response.json();

    // Get room ID from JWT token payload
    const payload = parseJwt(result.access_token);
    const roomId = parseInt(payload.sub);

    return {
        access_token: result.access_token,
        token_type: result.token_type,
        room_id: roomId
    };
}

function parseJwt(token: string): JwtPayload {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64).split('').map(c =>
            '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join('')
    );
    return JSON.parse(jsonPayload);
}