import React, { useState } from "react";
import { useChat } from "@/hooks/UseChat";
import { RxCross2 } from "react-icons/rx";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { GoPaperAirplane } from "react-icons/go";

interface ChatFrameProps {
    setActivePanel: (panel: "chat" | "roomDetail" | "participants" | null) => void;
    roomId: string;
}

export default function ChatFrame({ setActivePanel, roomId }: ChatFrameProps) {
    const [isChatMode, setIsChatMode] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const { messages, sendMessage } = useChat(roomId);

    const handleSend = () => {
        if (!inputValue.trim()) return;
        sendMessage(inputValue.trim());
        setInputValue("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent the default action of the Enter key
            handleSend();
        }
    };

    return (
        <div className="bg-white border-1 border-black rounded-lg w-[21.25vw] h-full flex flex-col m-4">
            <div className="m-4 flex flex-col h-full">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-medium text-black">Chat Room</h1>
                    <RxCross2
                        className="size-8 text-black cursor-pointer hover:text-red-600 hover:scale-125 transition-all duration-300"
                        onClick={() => {
                            setActivePanel(null);
                        }}
                    />
                </div>

                <div className="flex items-center mt-3">
                    <Switch
                        id="chat-mode"
                        onClick={() => setIsChatMode(!isChatMode)}
                        checked={isChatMode}
                    />
                    <Label
                        htmlFor="chat-mode"
                        className={`ml-2 text-sm font-normal ${
                            isChatMode ? 'text-black' : 'text-gray-500'
                        }`}
                    >
                        Allow participants can send the messages
                    </Label>
                </div>

                <div className="mt-3 border-1 border-gray-700 rounded-lg flex-1 overflow-auto">
                    {messages.map((msg, index) => (
                        <div key={index} className="mx-4 my-2">
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>{msg.user.display_name}</span>
                                <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                            </div>
                            <div className="text-black">{msg.content}</div>
                        </div>
                    ))}
                </div>

                <div className="relative w-full mt-3">
                    <Input
                        type="text"
                        placeholder="Send your message"
                        className="rounded-full w-full pr-10 pl-4 text-black [&::placeholder]:pl-1"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        onKeyUp={handleKeyDown}
                        disabled={!isChatMode}
                    />
                    <GoPaperAirplane
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black size-6 cursor-pointer hover:text-blue-600 hover:scale-125 transition-all duration-300"
                        onClick={handleSend}
                    />
                </div>
            </div>
        </div>
    );
}