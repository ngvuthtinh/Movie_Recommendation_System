import React, { useState } from "react";
import { Message } from "@/types/Messages";

import { RxCross2 } from "react-icons/rx";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { GoPaperAirplane } from "react-icons/go";

export default function ChatFrame() {
    const [isChatMode, setIsChatMode] = useState(true);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");

    const handleSend = () => {
        if (!inputValue.trim()) return;
        const newMsg: Message = {
            user: "You",
            time: new Date().toLocaleTimeString(),
            text: inputValue.trim(),
        };
        setMessages(prev => [...prev, newMsg]);
        setInputValue("");
    };
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSend();
    };
    return (
        <div className="bg-white border-1 border-black rounded-lg
                        w-[21.25vw] h-full flex flex-col m-4">
            <div className="m-2 flex flex-col h-full">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-medium text-black">Chat Room</h1>
                    <RxCross2 className="size-8 text-black cursor-pointer
                                    hover:text-red-600 hover:scale-125 transition-all duration-300"
                    />
                </div>

                <div className="flex items-center mt-3">
                    <Switch id="chat-mode"
                            onClick={() => setIsChatMode(!isChatMode)} checked={isChatMode}
                    />
                    <Label htmlFor="chat-mode"
                           className={`ml-2 text-sm font-normal 
                                ${isChatMode ? 'text-black' : 'text-gray-500'}`}>
                        Allow participants can send the messages
                    </Label>
                </div>

                <div className="mt-3 border-1 border-gray-700 rounded-lg flex-1 overflow-auto">
                    {messages.map(({user, time, text }) => (
                        <div className="mx-4 my-2">
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>{user}</span>
                                <span>{time}</span>
                            </div>
                            <div className="text-black">{text}</div>
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
                        onKeyDown={handleKeyDown}
                    />
                    <GoPaperAirplane
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black
                                   size-6 cursor-pointer hover:text-blue-600
                                   hover:scale-125 transition-all duration-300"
                        onClick={handleSend}
                    />
                </div>

            </div>

        </div>
    );
}
