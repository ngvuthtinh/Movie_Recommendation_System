import { useState } from "react";
import { toast } from "sonner";

import { RoomInfo } from "@/types/RoomInfo";
import { Button } from "@/components/ui/button";

import { Copy } from "lucide-react"
import { Eye, EyeOff } from "lucide-react";
import { RxCross2 } from "react-icons/rx";

export default function RoomDetail({
    roomDetail,
    setActivePanel,
}: {
    roomDetail: RoomInfo;
    setActivePanel: (panel: "chat" | "roomDetail" | "participants" | null) => void;
}) {
    const [showPassword, setShowPassword] = useState(false);

    const copyToClipboard = async (text: string, type: string) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success(`${type} copied to clipboard`);
        } catch (err) {
            toast.error("Failed to copy to clipboard");
        }
    };

    return (
        <div className="bg-white border-1 border-black rounded-lg
                        w-[21.25vw] h-full flex flex-col m-4">
            <div className="m-4 flex flex-col h-full gap-4">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-medium text-black">Room Detail</h1>
                    <RxCross2
                        className="size-8 text-black cursor-pointer
                                   hover:text-red-600 hover:scale-125 transition-all duration-300"
                        onClick={() => setActivePanel(null)}
                    />
                </div>

                <div>
                    <h1 className="text-lg font-bold text-black">Room Name</h1>
                    <p className="text-black font-normal text-base mt-2">
                        {roomDetail.roomName}
                    </p>
                    <Button
                        variant="outline"
                        className="w-full bg-blue-400 text-white flex items-center justify-start
                                   text-left hover:bg-white hover:text-black mt-2"
                        onClick={() => copyToClipboard(roomDetail.roomName, "Room Name")}
                    >
                        <Copy className="mr-2" />
                        <span className="flex-1 text-left">Copy Room Name</span>
                    </Button>
                </div>

                <div>
                    <h1 className="text-lg font-bold text-black">Room Password</h1>
                    <div className="flex items-center justify-between mt-2">
                        <p className="text-black font-normal text-base">
                            {showPassword
                                ? roomDetail.roomPassword
                                : roomDetail.roomPassword.replace(/./g, "*")
                            }
                        </p>
                        <Button
                            className="flex items-center justify-center
                                        bg-white text-black hover:bg-black hover:text-white"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff /> : <Eye />}
                        </Button>
                    </div>

                    <Button
                        variant="outline"
                        className="bg-blue-400 text-white hover:bg-white hover:text-black
                                   flex items-center justify-start text-left mt-2"
                        onClick={() => copyToClipboard(roomDetail.roomPassword, "Room Password")}
                    >
                        <Copy />
                        <span className="flex-1 text-left">Copy Password</span>
                    </Button>
                </div>

            </div>

        </div>
    );
}
