import { WatchRoomLogin, RoomResponse, JwtPayload } from "@/types/WatchRoom.ts";

export async function LoginRoom(data: WatchRoomLogin): Promise<RoomResponse> {
    const userToken = localStorage.getItem('user_token');
    if (!userToken) {
        throw new Error('No authentication token found');
    }

    const roomData = {
        room_name: data.roomName,
        password: data.password
    };

    const response = await fetch("http://localhost:8000/room/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`
        },
        body: JSON.stringify(roomData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
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