import { Participant } from "@/types/Participants";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { RxCross2 } from "react-icons/rx";
import { Plus } from "lucide-react";
import { Search } from "lucide-react";
import { Mic, MicOff} from "lucide-react";

export default function Participants({
    participants,
    setActivePanel
}: {
    participants: Participant[];
    setActivePanel: (panel: "chat" | "roomDetail" | "participants" | null) => void;
})  {

    return (
        <div className="bg-white border-1 border-black rounded-lg
                        w-[21.25vw] h-full flex flex-col m-4">
            <div className="m-4 flex flex-col h-full gap-4">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-medium text-black">Participants</h1>
                    <RxCross2
                        className="size-8 text-black cursor-pointer
                                   hover:text-red-600 hover:scale-125 transition-all duration-300"
                        onClick={() => setActivePanel(null)}
                    />
                </div>

                <div>
                    <Button
                        variant="outline"
                        className="text-white text-sm font-medium
                                   flex items-center rounded-full w-[50%]
                                   bg-blue-400 hover:bg-white hover:text-black"
                    >
                        <Plus />
                        <span>Invite Your Friend</span>
                    </Button>
                </div>

                <div className="flex gap-2">
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-4 text-black [&::placeholder]:text-gray-400"
                    />
                    <Button
                        variant="outline"
                        className="text-sm font-medium flex items-center
                                   text-black bg-white hover:bg-black hover:text-white"
                    >
                        <Search />
                    </Button>
                </div>

                <div className="flex justify-between mx-2">
                    <p className="text-sm font-normal text-gray-500">Participants</p>
                    <p className="text-sm font-normal text-gray-500">{participants.length}</p>
                </div>

                <div className="border-1 border-gray-700 rounded-lg ">
                    {participants.map(({avatarUrl, name, id, isHost, isMicOn }) => (
                        <div key={id} className="flex items-center justify-between px-4 py-2">
                            <div className="flex items-center">
                                <Avatar className="cursor-pointer hover:opacity-80">
                                    <AvatarImage src={avatarUrl} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col ml-2">
                                    <span className="text-sm font-medium text-black">{name}</span>
                                    <span className="text-xs text-gray-500">{isHost ? "Room Master" : "Participants"}</span>
                                </div>
                            </div>
                            {/*<div className="flex items-center gap-2 text-black">*/}
                            {/*    {isMicOn ? ( <Mic /> ) : ( <MicOff /> ) }*/}
                            {/*</div>*/}
                        </div>
                    ))}
                </div>

            </div>

        </div>
    );
}
