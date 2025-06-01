import {Card, CardContent} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {WatchRoomRegister} from "@/types/WatchRoom.ts";
import {useForm} from "react-hook-form";
import {RxCross2} from "react-icons/rx";
import { SearchMovies } from "@/services/SearchMovieService.ts";
import {MovieSearchTitle} from "@/types/Movie.ts";
import { useState, useEffect, useRef } from "react";

export default function RegisterRoomForm({
   setRoomForm,
}: {
   setRoomForm: (panel: "create" | "login" | null) => void;
}) {
    const {
        register,
        handleSubmit,
        watch, // Used for confirm password validation
        setValue,
        formState: { errors }
    } = useForm<WatchRoomRegister>();

    const password = watch("password"); // Watch the password field for confirm password validation

    const onSubmit = async (data: WatchRoomRegister): Promise<void> => {
        // Handle form submission logic here
        // For example, you can call an API to register the room
        console.log("Form submitted");

        console.log(data);
        //setRoomForm(null);
    }

    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState<MovieSearchTitle[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<MovieSearchTitle | null>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchTerm) {
                try {
                    const movies = await SearchMovies(searchTerm);
                    setSuggestions(movies);
                    setShowSuggestions(true);
                } catch (error) {
                    console.error('Failed to fetch movies:', error);
                    setSuggestions([]);
                }
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        };

        const debounceTimer = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchTerm]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMovieSelect = (movie: MovieSearchTitle) => {
        console.log("Selected Movie:", movie); // Add this to debug
        setSelectedMovie(movie);
        setValue('movieId', movie.id);
        setSearchTerm(movie.title);
        setShowSuggestions(false);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (!value) {
            setSelectedMovie(null);
            setValue('movieId', 0); // Clear the movieId when search is empty
            console.log('Cleared movie selection');
        }
    };

    return (
        <div className="w-full max-w-[500px] p-9 bg-black/70 rounded-xl shadow-lg">
            <div className="flex items-center justify-center">
                <Card className="w-full max-w-md rounded-2xl shadow-md">
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="flex justify-between">
                                <h1 className="text-2xl font-bold text-black">Create Room</h1>
                                <RxCross2
                                    className="size-8 text-black cursor-pointer
                                   hover:text-red-600 hover:scale-125 transition-all duration-300"
                                    onClick={() => setRoomForm(null)}
                                />
                            </div>

                            <p className="text-gray-500">Enter your information to create an account</p>

                            <div className="space-y-2">
                                <Label htmlFor="room_name">Watch Room Name</Label>
                                <Input
                                    id="room_name"
                                    type="text"
                                    placeholder="Enter Watch Room Name"
                                    {...register("roomName", { required: true })}
                                />
                                {errors.roomName && (
                                    <span className="text-sm text-red-500">Watch Room Name cannot be empty</span>
                                )}
                            </div>

                            <div className="space-y-2 relative" ref={suggestionsRef}>
                                <Label htmlFor="movie_search">Movie Name</Label>
                                <Input
                                    id="movie_search"
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    placeholder="Search for a movie..."
                                />
                                <input
                                    type="hidden"
                                    {...register("movieId", { required: true })}
                                />
                                {showSuggestions && suggestions.length > 0 && (
                                    <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
                                        {suggestions.map((movie) => (
                                            <div
                                                key={movie.id}
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                onClick={() => handleMovieSelect(movie)}
                                            >
                                                {movie.title}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {errors.movieId && (
                                    <span className="text-sm text-red-500">Please select a movie</span>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    {...register("password", { required: true })}
                                />
                                {errors.password && (
                                    <span className="text-sm text-red-500">Password cannot be leave empty</span>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirm_password">Confirm Password</Label>
                                <Input
                                    id="confirm_password"
                                    type="password"
                                    {...register("confirmPassword", {
                                        validate: (value) => value === password || "Passwords do not match, please try again"
                                    })}
                                />
                                {errors.confirmPassword && (
                                    <span className="text-sm text-red-500">{errors.confirmPassword.message}</span>
                                )}
                            </div>

                            <Button type="submit" className="w-full bg-red-700 hover:bg-red-900">Sign Up</Button>
                            <p className="text-center text-sm text-gray-500">
                                Already have a room?{" "}
                                <span
                                    onClick={() => setRoomForm("login")}
                                    className="text-blue-600 underline cursor-pointer hover:text-blue-800"
                                >
                                    Join Room
                                </span>
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}