import Participants from "@/components/Participants";
import RoomDetail from "@/components/RoomDetail";
import ChatFrame from "@/components/ChatFrame";

import { roomInfoDefault } from "@/types/RoomInfo";
import { participantDefault } from "@/types/Participants.ts";

export default function WatchTogetherPage() {
    return (
        <>
            <ChatFrame />
            <RoomDetail {...roomInfoDefault} />
            <Participants participants={participantDefault} />
        </>
    );
}