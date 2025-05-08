import { useState, useEffect } from "react";
import { ChangeAvatarProps } from "@/types/avatar-props";
import { Button } from "@/components/ui/button"
import { Img } from "react-image";

export function ChangeAvatar ({ userDetails, onClose }: ChangeAvatarProps) {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
    }, [])

    return (
        <div className={`h-screen fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-200 ${animate ? "opacity-100" : "opacity-0"}`}>
            {/* 
                fixed inset-0 z-50: modal sẽ chiếm toàn bộ màn hình và nổi lên trên cùng.
                bg-black/60 backdrop-blur-sm: tạo hiệu ứng mờ nền như Instagram.
                flex items-center justify-center: căn giữa modal theo chiều ngang và dọc.
                
            */}
            <div className={`pt-4 rounded-md bg-[#161616] shadow-md w-full max-w-sm transition-all duration-200 ${animate ? "scale-100" : "scale-90"}`}>
                <div className="flex justify-center mb-4">
                    <Img
                        src={userDetails.avatarUrl}
                        alt="avatar"
                        className="rounded-full object-cover h-20 w-20"
                        loader={<div className="text-gray-500 p-4">Loading...</div>}
                        unloader={<div className="text-gray-500 p-4">Error loading image</div>}
                    />
                </div>
                
                <div className="flex justify-center">
                    <h2 className="text-lg font-bold">Change your profile photo</h2>
                </div>

                <div className="pt-4">
                    <Button className="border-t border-zinc-700 text-white px-4 w-full h-12 hover:bg-zinc-700 transition duration-200 rounded-none text-blue-500">
                        Upload New Photo
                    </Button>
                    <Button className="border-t border-b border-zinc-700 text-white px-4 w-full h-12 hover:bg-zinc-700 transition duration-200 rounded-none text-red-500">
                        Remove Current Photo
                    </Button>
                    <Button 
                        className="text-white px-4 w-full h-12 hover:bg-zinc-700 transition duration-200 rounded-t-none"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    )
}
