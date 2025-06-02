export interface Participant {
    avatarUrl: string;
    name: string;
    id: string;
    isHost: boolean;
    isMicOn: boolean;
}

export const participantDefault: Participant[] = [
    {
        avatarUrl: "https://github.com/shadcn.png",
        name: "Son Dang",
        id: "user1",
        isHost: true,
        isMicOn: true,
    },
    {
        avatarUrl: "https://github.com/shadcn.png",
        name: "Phuong Pham",
        id: "user2",
        isHost: false,
        isMicOn: true,
    }
];