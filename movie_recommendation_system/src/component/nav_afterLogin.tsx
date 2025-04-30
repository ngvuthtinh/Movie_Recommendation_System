import React from 'react'
import { SiNetflix } from "react-icons/si";
import { FiBell, FiSearch } from 'react-icons/fi';

interface NavAfterLoginProps {
    // Add props here if needed in the future
  }

const NavAfterLogin : React.FC = (props: NavAfterLoginProps) => {
    return(
        <nav className="bg-black text-white flex justify-between items-center px-6 py-4">
            {/*Logo and navigation button*/}
            <button className="flex gap-6 items-center">
                <button className='text-3xl text-red-600 font-bold'>
                    <SiNetflix/>
                </button>
                <button className='bg-red-600 px-3 py-1 rounded hover:bg-red-600'>
                    Home
                </button>
                <button>My List</button>
                <button>Browse Movies</button>
            </button>
            {/*Search bar, Icons and Avatar*/}
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