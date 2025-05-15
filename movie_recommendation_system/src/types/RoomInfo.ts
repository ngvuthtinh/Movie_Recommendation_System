export interface RoomInfo {
    roomID: string;
    roomName: string;
    roomPassword: string;
}

export const roomInfoDefault: RoomInfo = {
    roomID: "123456",
    roomName: "My Room",
    roomPassword: "password123",
}