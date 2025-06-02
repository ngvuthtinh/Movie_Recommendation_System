export interface WatchRoomLogin {
    roomName: string;
    password: string;
}
export interface WatchRoomRegister {
    movieId: number;
    roomName: string;
    password: string;
    confirmPassword: string;
}

export interface RoomResponse {
    access_token: string;
    token_type: string;
    room_id: number;
}

export interface RoomLoginResponse {
    access_token: string;
    token_type: string;
}

export interface RoomCreationResponse {
    access_token: string;
    token_type: string;
}

export interface JwtPayload {
    sub: string;
    exp: number;
}
