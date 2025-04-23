import { useState } from "react";
import { UserDetails } from "@/types/user-details";
import {Img} from "react-image";
import { LuPencil } from "react-icons/lu";
import { ChangeAvatar } from "@/components/ChangeAvatar";
import { Input } from "@/components/ui/input";

export default function ProfileUser(userDetails : UserDetails) {
    const [showChangeAvatar, setShowChangeAvatar] = useState(false);
    const [isEditingName, setEditingName] = useState(false);
    const [nameInput, setNameInput] = useState(userDetails.displayName);

    const hanldeChangeName = () => {
        setEditingName(false); 
    }
    
    return (
        <div className="text-white p-6 rounded-2xl w-full max-w-sm space-y-4 shadow-lg bg-[#161616]">
            <div className="relative">
                <Img 
                    src={userDetails.avatarUrl} 
                    alt="avatar" 
                    className="rounded-md object-cover w-full h-48" 
                    loader={<div className="text-gray-500 p-4">Loading...</div>}
                    unloader={<div className="text-gray-500 p-4">Error loading image</div>}
                />
                <button 
                    className="absolute top-2 right-2 bg-black/40 hover:bg-gray-800 text-white p-1 rounded-full transform transition duration-200 ease-in-out hover:scale-105"
                    onClick={() => setShowChangeAvatar(true)}
                >
                    <LuPencil size={20} />
                </button>
            </div>

            {showChangeAvatar && (
                <ChangeAvatar userDetails={userDetails} onClose={() => setShowChangeAvatar(false)} />
            )}

            <div className="relative text-lg font-bold">
                {isEditingName ? (
                    <Input
                        autoFocus
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        onBlur={hanldeChangeName}
                        onKeyDown={(e) => {if (e.key === "Enter") hanldeChangeName()}}
                    ></Input>
                ) : (
                    <>
                        {nameInput}
                        <button 
                            className="absolute right-2 bg-black/40 hover:bg-gray-800 text-white p-1 rounded-full transform transition duration-200 ease-in-out hover:scale-105"
                            onClick={() => {setEditingName(true)}}
                        >
                            <LuPencil size={20} />
                        </button>
                    </>
                )}
            </div>

            <p className="text-md text-gray-400">
                Created since {new Date(userDetails.createdDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
            </p>

            <div className="text-md pr-3 text-white">
                <div className="flex justify-between"> 
                    {/* flex justify-between: cho len 1 hang xong can 2 phan tu ra 2 ben (between la khoang trong) */}
                    <p>List</p>
                    <p>{userDetails.moviesInList}</p>
                </div>
            </div>

            <p className="text-md text-gray-400">Viewing Activites</p>

            <div className="text-md pr-3 text-white">
                <div className="flex justify-between">
                    <p>Watched</p>
                    <p>{userDetails.moviesWatched}</p>
                </div>
            </div>
        </div>

    ) 
}