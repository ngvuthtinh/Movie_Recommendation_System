import ReactPlayer from "react-player";
import { useState } from "react";

import { Button} from "@/components/ui/button.tsx";

import { ImPhoneHangUp } from "react-icons/im";
import { HiOutlineMicrophone } from "react-icons/hi";
import { FaMicrophoneSlash } from "react-icons/fa6";
import { Info, Users, MessageSquareText } from "lucide-react";

export default function WatchTogetherPage() {
    const [isMicOn, setIsMicOn] = useState(true);
    return (
        <div className="bg-black h-screen flex flex-col">
            {/* Video Player */}
            <div className="flex-1">
                <ReactPlayer
                    url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    className="react-player"
                    width="100%"
                    height="100%"
                    controls
                    playing
                />
            </div>

            {/* Buttons Section */}
            <div
                className="flex justify-center items-center
                           border-zinc-600 border-1 gap-4
                           rounded-lg w-fit mx-auto p-4"
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
                    <Button className="bg-black">
                        <Info
                            className="text-white-600 scale-125"
                        />
                    </Button>
                    <Button className="bg-black">
                        <Users
                            className="text-white-600 scale-125"
                        />
                    </Button>
                    <Button className="bg-black">
                        <MessageSquareText
                            className="text-white-600 scale-125"
                        />
                    </Button>
                </div>
            </div>
        </div>
    );
}