import ReactPlayer from "react-player";
import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { participantDefault } from "@/types/Participants.ts";
import { roomInfoDefault } from "@/types/RoomInfo.ts";
import { getMovieLink } from "@/services/MovieLinkService.ts";

import ChatFrame from "@/components/ChatFrame.tsx";
import RoomDetail from "@/components/RoomDetail.tsx";
import Participants from "@/components/Participants.tsx";

import { Button } from "@/components/ui/button.tsx";

import { ImPhoneHangUp } from "react-icons/im";
import { HiOutlineMicrophone } from "react-icons/hi";
import { FaMicrophoneSlash } from "react-icons/fa6";
import { Info, Users, MessageSquareText } from "lucide-react";


export default function WatchTogether() {
    const [isMicOn, setIsMicOn] = useState(true);

    const [activePanel, setActivePanel] = useState<"chat" | "roomDetail" | "participants" | null>(null);

    const { roomId } = useParams<{ roomId: string }>();

    const [movieUrl, setMovieUrl] = useState<string>("");

    const [playing, setPlaying] = useState(true);
    const socketRef = useRef<WebSocket | null>(null);
    const isRemoteAction = useRef(false);

    useEffect(() => {
        if (!roomId) return;
        getMovieLink(roomId)
            .then(data => setMovieUrl(data.link)) // Adjust property if needed
            .catch(() => setMovieUrl(""));
    }, [roomId]);

    // Setup WebSocket for play/pause sync
    const [wsStatus, setWsStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected');
    const reconnectTimeoutRef = useRef<NodeJS.Timeout>(null);
    const MAX_RECONNECT_ATTEMPTS = 5;
    const reconnectAttemptsRef = useRef(0);

// Replace your existing WebSocket useEffect with this improved version
    useEffect(() => {
        if (!roomId) return;

        const connectWebSocket = () => {
            try {
                setWsStatus('connecting');
                const ws = new WebSocket(`ws://localhost:8000/ws/${roomId}`);
                socketRef.current = ws;

                ws.onopen = () => {
                    setWsStatus('connected');
                    reconnectAttemptsRef.current = 0;
                    console.log('WebSocket connected');
                };

                ws.onmessage = (event) => {
                    try {
                        const data = JSON.parse(event.data);
                        console.log('Received WebSocket message:', data);
                        if (data.type === "play-pause") {
                            isRemoteAction.current = true;
                            setPlaying(data.play);
                            console.log('Updated playing state:', data.play);
                        }
                    } catch (error) {
                        console.error("Failed to parse WebSocket message:", error);
                    }
                };

                ws.onclose = () => {
                    setWsStatus('disconnected');
                    socketRef.current = null;

                    // Attempt reconnection if not exceeded max attempts
                    if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
                        reconnectAttemptsRef.current += 1;
                        reconnectTimeoutRef.current = setTimeout(() => {
                            connectWebSocket();
                        }, 2000 * Math.pow(2, reconnectAttemptsRef.current - 1)); // Exponential backoff
                    }
                };

                ws.onerror = (error) => {
                    console.error('WebSocket error:', error);
                };

            } catch (error) {
                console.error('WebSocket connection error:', error);
                setWsStatus('disconnected');
            }
        };

        connectWebSocket();

        // Cleanup function
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }
            reconnectAttemptsRef.current = 0;
        };
    }, [roomId]);

    // Emit play/pause event
    const handlePlayPause = (play: boolean) => {
        setPlaying(play);
        if (socketRef.current && socketRef.current.readyState === 1) {
            socketRef.current.send(JSON.stringify({ type: "play-pause", play }));
        }
    };

    // Prevent feedback loop when receiving remote play/pause
    const onPlay = () => {
        if (isRemoteAction.current) {
            isRemoteAction.current = false;
            return;
        }
        handlePlayPause(true);
    };

    const onPause = () => {
        if (isRemoteAction.current) {
            isRemoteAction.current = false;
            return;
        }
        handlePlayPause(false);
    };

    return (
        <div className="bg-black h-screen flex flex-col">
            {/* Video Part */}
            <div className="flex flex-row h-full m-2">
                {/* Video Player */}
                <div className="flex-1 h-full m-4">
                    <div
                        className="border-4 border-blue-500 rounded-lg shadow-lg
                       overflow-hidden bg-gray-900 h-full"
                    >
                        <ReactPlayer
                            url={movieUrl}
                            className="react-player"
                            width="100%"
                            height="100%"
                            controls
                            playing={playing}
                            onPlay={onPlay}
                            onPause={onPause}
                        />
                    </div>
                </div>

                {/* Side Panel */}
                <div className="h-full">
                    {activePanel === "chat" && <ChatFrame setActivePanel={setActivePanel} roomId={roomId || ""}  />}
                    {activePanel === "roomDetail" && <RoomDetail roomDetail={roomInfoDefault} setActivePanel={setActivePanel} />}
                    {activePanel === "participants" && <Participants participants={participantDefault} setActivePanel={setActivePanel}/>}
                </div>
            </div>

            {/* Buttons Section */}
            <div
                className="flex justify-center items-center
                           border-zinc-600 border-1 gap-4
                           rounded-lg w-fit mx-auto p-4 mt-4 mb-2"
            >
                <div
                    className="justify-center items-center
                               border-zinc-600 border-1 rounded-lg"
                >
                    <Button
                        className="bg-black m-1"
                        onClick={() => setIsMicOn(!isMicOn)}
                    >
                        {isMicOn ? (
                            <HiOutlineMicrophone
                                className="text-white-600 scale-150
                                           transition-transform duration-300"
                            />
                        ) : (
                            <FaMicrophoneSlash
                                className="text-white-600 scale-150
                                           transition-transform duration-300"
                            />
                        )}
                    </Button>
                </div>
                <div
                    className="justify-center items-center rounded-lg
                    bg-red-500 hover:bg-red-600 p-1"
                >
                    <Button className="bg-red-500 hover:bg-red-600 group">
                        <ImPhoneHangUp
                            className="text-white-600 scale-150
                                   transition-transform duration-300
                                   group-hover:-translate-y-1"
                        />
                    </Button>
                </div>
                <div
                    className="flex gap-3 p-1 justify-center items-center
                               border-zinc-600 border-1 rounded-lg"
                >
                    <Button
                        className="bg-black"
                        onClick={() => setActivePanel(activePanel === "roomDetail" ? null : "roomDetail")}
                    >
                        <Info
                            className="text-white-600 scale-125"
                        />
                    </Button>
                    <Button
                        className="bg-black"
                        onClick={() => setActivePanel(activePanel === "participants" ? null : "participants")}
                    >
                        <Users
                            className="text-white-600 scale-125"
                        />
                    </Button>
                    <Button
                        className="bg-black"
                        onClick={() => setActivePanel(activePanel === "chat" ? null : "chat")}
                    >
                        <MessageSquareText
                            className="text-white-600 scale-125"
                        />
                    </Button>
                </div>
            </div>
        </div>
    );
}