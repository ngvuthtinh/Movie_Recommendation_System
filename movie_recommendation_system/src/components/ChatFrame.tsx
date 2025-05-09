import { useState } from "react";

import { RxCross2 } from "react-icons/rx";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { GoPaperAirplane } from "react-icons/go";

export default function ChatFrame() {
    const [isChatMode, setIsChatMode] = useState(true);

    return (
        <div className="bg-white border-1 border-black rounded-lg
                        w-[21.25vw] h-[89.5vh] flex flex-col m-4">
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

                </div>

                <div className="mt-3 flex items-center">
                    <Input type="text" placeholder="Send your message"
                           className="rounded-full w-full p-2 text-black
                            [&::placeholder]:pl-1"
                    />
                    <GoPaperAirplane className="ml-2 font-black text-black
                            size-6 cursor-pointer hover:text-blue-600
                            hover:scale-125 transition-all duration-300"/>
                </div>

            </div>

        </div>
    );
}
