import { Participant } from "@/types/Participants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input.tsx";
import { Avatar } from "@/components/ui/avatar";

import { RxCross2 } from "react-icons/rx";
import { Plus } from "lucide-react";
import { Search } from "lucide-react";
import React from "react";

export default function Participants(partcipants: Participant[]) {

    return (
        <div className="bg-white border-1 border-black rounded-lg
                        w-[21.25vw] h-[89.5vh] flex flex-col m-4">
            <div className="m-2 flex flex-col h-full gap-4">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-medium text-black">Participants</h1>
                    <RxCross2 className="size-8 text-black cursor-pointer
                                    hover:text-red-600 hover:scale-125 transition-all duration-300"
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

                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 transform
                                       translate-y-1/2 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-10 text-black [&::placeholder]:text-gray-400"
                    />
                </div>

                <div className="mt-3 border-1 border-gray-700 rounded-lg flex-1 overflow-auto">
                    {/*{participants.map(({avatarUrl, name, id, isHost, isMicOn }) => (*/}
                    {/*    <div className="mx-4 my-2">*/}

                    {/*    </div>*/}
                    {/*))}*/}
                </div>


            </div>

        </div>
    );
}
