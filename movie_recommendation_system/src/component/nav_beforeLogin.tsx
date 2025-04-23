import React from 'react'

const NavBeforeLogin : React.FC = () => {
    return(
       <nav className='bg-black text-white flex justify-between items-center px-6 py-4'>
            <img
                src = "https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
                alt= "Netflix Logo"
                className='h-7 md:h-8 object-contain'
            />

            <div className='flex gap-4 items-center'>
                <select className='bg-white text-left text-black px-9 py-2 rounded-full'>
                    <option>English</option>
                    <option>Vietnamese</option>
                </select>
                <button className='bg-red-600 px-3 py-2 text-center rounded-full hover:bg-red-600'>
                    Sign In
                </button>
            </div>
       </nav> 
    );
}
export default NavBeforeLogin;