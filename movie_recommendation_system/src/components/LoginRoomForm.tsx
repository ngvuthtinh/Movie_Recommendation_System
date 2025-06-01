import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { WatchRoomLogin } from "@/types/WatchRoom.ts";
import {RxCross2} from "react-icons/rx";

export default function LoginRoomForm({
    setRoomForm,
}: {
    setRoomForm: (panel: "create" | "login" | null) => void;
}) {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<WatchRoomLogin>();

    const onSubmit = async (data: WatchRoomLogin): Promise<void> => {
        // Handle form submission logic here
        // For example, you can call an API to log in to the room
        console.log("Form submitted", data);
        setRoomForm(null)
    };

    return (
        <div className="w-full max-w-[500px] p-9 bg-black/70 rounded-xl shadow-lg">
            <div className="flex items-center justify-center">
                <Card className="w-full max-w-md rounded-2xl shadow-md">
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="flex justify-between">
                                <h1 className="text-2xl font-bold text-black">Join in Room</h1>
                                <RxCross2
                                    className="size-8 text-black cursor-pointer
                                   hover:text-red-600 hover:scale-125 transition-all duration-300"
                                    onClick={() => setRoomForm(null)}
                                />
                            </div>

                            <p className="text-gray-500">Enter your credentials to join the room</p>

                            <div className="space-y-2">
                                <Label htmlFor="room_name">Watch Room Name</Label>
                                <Input
                                    id="room_name"
                                    type="text"
                                    placeholder="Enter Watch Room Name"
                                    {...register("roomName", { required: true })}
                                />
                                {errors.roomName && (
                                    <span className="text-sm text-red-500">Watch Room Name is required</span>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    {...register("password", { required: true })}
                                />
                                {errors.password && (
                                    <span className="text-sm text-red-500">Password is required</span>
                                )}
                            </div>

                            <Button type="submit" className="w-full bg-red-700 hover:bg-red-900">Join Room</Button>
                            <p className="text-center text-sm text-gray-500">
                                Don't have a room yet?{" "}
                                <span
                                    onClick={() => setRoomForm("create")}
                                    className="text-blue-600 underline cursor-pointer hover:text-blue-800"
                                >
                                    Create room
                                </span>
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}