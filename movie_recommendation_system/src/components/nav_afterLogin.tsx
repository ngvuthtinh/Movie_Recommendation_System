import React from 'react'
import { SiNetflix } from "react-icons/si";
import { FiBell, FiSearch } from 'react-icons/fi';
import { Button } from "@/components/ui/button";

const NavAfterLogin : React.FC = () => {
    // Handle draw rectangle

    return(
        <nav className="bg-black text-white flex justify-between items-center">
            {/* Logo and navigation button */}
            <div className="flex gap-4 items-center m-4">
                <SiNetflix className="text-red-600 size-8" />

                <Button className="bg-transparent rounded-none hover:bg-red-600 hover:rounded-b-lg">
                    Home
                </Button>

                <Button className="bg-transparent">
                    My List
                </Button>

                <Button className="bg-transparent">
                    Browse Movies
                </Button>
            </div>


            {/* Search bar, Icons and Avatar */}
            <button className='flex items-center gap-4'>
            <div className="relative">
                    <input
                        type="text"
                        placeholder="Hinted search text"
                        className="bg-zinc-800 pl-4 pr-10 py-1 rounded-full text-white placeholder-gray-400"
                    />
                    <FiSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-lg pointer-events-none" />
            </div>
            <FiBell className='text-white text-lg cursor-pointer'/>
                <img
                    src="https://i.pravatar.cc/32"
                    className='rounded-full w-8 h-8 object-cover'
                    alt="Use Avatar"
                    />
            </button>
        </nav>
    );
}
export default NavAfterLogin