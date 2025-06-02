import { SiNetflix } from "react-icons/si";
import { FiBell, FiSearch } from 'react-icons/fi';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

import { useState } from "react";
import RoomForm from "./RoomForm";

export default function NavAfterLogin() {
    const [isRoomOpen, setIsRoomOpen] = useState(false);

    const handleCreateRoom = () => {
        setIsRoomOpen(true);
    };

    const handleCloseRoom = () => {
        setIsRoomOpen(false);
    };

    // Navigate to user profile page "/user/profile"
    const handleViewProfile = () => {
        window.location.href = "/user";
    }

    const handleSignOut = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
        toast.success("You have been signed out successfully!");
    }

    const handleHomeClick = () => {
        window.location.href = '/home';
    }

    const handleMyListClick = () => {
        window.location.href = '/my-list';
    }

    const handleBrowseMoviesClick = () => {
        window.location.href = '/search';
    }


    return (
        <div className="absolute w-full top-0 z-50 bg-gradient-to-b from-black/80 via-black/50 to-transparent">
            <nav className="bg-black/60 flex justify-between items-center p-4">
                {/* Logo and navigation button */}
                <div className="flex gap-4 items-center mr-4 ml-4">
                    <SiNetflix className="text-red-600 size-9" />
                    <Button 
                        className="bg-transparent rounded-none hover:bg-red-600 hover:rounded-b-lg"
                        onClick={handleHomeClick}
                    >
                        Home
                    </Button>
                    <Button 
                        className="bg-transparent"
                        onClick={handleMyListClick}>
                        My List
                    </Button>
                    <Button 
                        className="bg-transparent"
                        onClick={handleBrowseMoviesClick}>
                        Browse Movies
                    </Button>
                    <Button
                        onClick={handleCreateRoom}
                        className="bg-red-600 text-white hover:bg-red-700 rounded-lg">
                        Create Movie Room
                    </Button>
                </div>

                {/* Search bar, Icons and Avatar */}
                <div className="flex items-center gap-4 mr-4 ml-4">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Hinted search text"
                            className="bg-white text-black rounded-full placeholder-gray-400 px-6"
                        />
                        <FiSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg text-black" />
                    </div>

                    <FiBell className="text-white cursor-pointer size-5 hover:background-zinc-500 hover:rounded-full" />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="cursor-pointer hover:opacity-80">
                                {/* TODO: Tu fetch data len thay cho cai hinh nay */}
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-48">
                            <DropdownMenuItem onClick={handleViewProfile}>
                                View Profile
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                                className="text-red-600 font-bold" 
                                onClick={handleSignOut}>
                                Sign Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>

            {isRoomOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <RoomForm onClose={handleCloseRoom}/>
                </div>
            )}
        </div>
    );
}
