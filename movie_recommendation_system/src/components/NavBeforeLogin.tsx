import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NavBeforeLogin() {
    const navigate = useNavigate();
    const handleNavigateToLogin = () => {
        navigate('/login');
    }
    return(
        <div className="absolute w-full top-0 z-50 bg-gradient-to-b from-black/80 via-black/50 to-transparent">
            <nav className='bg-black/60 flex justify-between items-center'>
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
                    <Button
                        onClick={handleNavigateToLogin}
                        className='bg-red-600 rounded-full px-6
                                   hover:bg-red-500 hover:scale-110 transition-all
                                   duration-300 hover:text-black '>
                        Sign In
                    </Button>
                </div>
            </nav> 
       </div>
    );
}
