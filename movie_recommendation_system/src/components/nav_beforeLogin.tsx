import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const NavBeforeLogin : React.FC = () => {
    return(
       <nav className='bg-black text-white flex justify-between items-center'>
           <div className='flex gap-4 items-center m-4'>
               <img
                   src = "https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
                   alt= "Netflix Logo"
                   className='h-9 object-contain'
               />
           </div>

           <div className='flex gap-8 items-center m-4'>
               <Select>
                   <SelectTrigger className="w-[180px] bg-white text-black
                                            rounded-full px-6">
                       <SelectValue placeholder="Select language" />
                   </SelectTrigger>
                   <SelectContent>
                       <SelectGroup>
                           <SelectLabel>Language</SelectLabel>
                           <SelectItem value="english">English</SelectItem>
                           <SelectItem value="vietnamese">Vietnamese</SelectItem>
                       </SelectGroup>
                   </SelectContent>
               </Select>
                <Button className='bg-red-600 rounded-full px-6
                                hover:bg-red-500 hover:scale-110 transition-all
                                duration-300 hover:text-black '>
                     Sign In
                </Button>
           </div>

       </nav> 
    );
}
export default NavBeforeLogin;