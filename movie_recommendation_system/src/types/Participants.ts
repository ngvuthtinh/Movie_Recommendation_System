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
        name: "John Doe",
        id: "user1",
        isHost: true,
        isMicOn: true,
    },
    {
        avatarUrl: "https://github.com/shadcn.png",
        name: "Jane Smith",
        id: "user2",
        isHost: false,
        isMicOn: false,
    },
    {
        avatarUrl: "https://github.com/shadcn.png",
        name: "Alice Johnson",
        id: "user3",
        isHost: false,
        isMicOn: true,
    },
];