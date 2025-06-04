import { Play, BookmarkPlus, ThumbsUp, Star } from "lucide-react"
import { MovieDetail2Props } from "../types/DetailMovie2"
import { SiNetflix } from "react-icons/si";
import { useState } from "react";
import { getMovieURLById } from "../services/MovieLinkService";
import { IoMdClose } from "react-icons/io";

const InfoRow = ({ label, items, maxItems = 5 }: { label: string; items: string[]; maxItems?: number }) => (
    <div className="grid grid-cols-[200px_1fr]">
      <div className="text-gray-500 font-normal">{label}</div>
      <div className="text-white">{items.slice(0, maxItems).join(", ")}</div>
    </div>
);

export default function DetailMovie_2(props: MovieDetail2Props) {
    if (!props) {
        return <div className="text-center text-white">Loading...</div>;
    }

    const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
    const [moviePlayerURL, setMoviePlayerURL] = useState<string | null>(null);
    const [playerLoading, setPlayerLoading] = useState<boolean>(false);
    const [playerError, setPlayerError] = useState<string | null>(null);

    const handleDisplayMoviePlayer = async (movieId: number) => {
        // Trong DetailMovie_2, luôn hiển thị player khi click.
        // Logic đóng nếu click lại cùng phim không cần thiết ở đây vì đây là trang detail của 1 phim.
        // Tuy nhiên, nếu bạn muốn click lại nút Watch Now để đóng, có thể giữ lại.
        // Tôi sẽ giữ lại logic này để nhất quán với MovieList1.
        if (selectedMovieId === movieId && moviePlayerURL) {
            setSelectedMovieId(null);
            setMoviePlayerURL(null);
            setPlayerError(null);
            return;
        }

        setSelectedMovieId(movieId);
        setPlayerLoading(true);
        setPlayerError(null);
        setMoviePlayerURL(null);

        try {
            const data = await getMovieURLById(movieId);

            if (data && data.link) {
                console.log("Movie URL fetched:", data.link);
                setMoviePlayerURL(data.link);
            } else {
                setPlayerError("Movie URL not found in response.");
            }
        } catch (err: any) {
            console.error("Error fetching movie URL:", err);
            setPlayerError(err.message || "Failed to fetch movie URL.");
        } finally {
            setPlayerLoading(false);
        }
    }

    const handleClosePlayer = () => {
        setSelectedMovieId(null);
        setMoviePlayerURL(null);
        setPlayerError(null);
    };

    return (
        <div className="max-w-2xl mx-auto bg-white rounded overflow-hidden">
            <div className="bg-black p-6 text-white">
                <div className="flex justify-between items-center mb-3">
                    <h1 className="text-5xl font-bold">{props.title}</h1>
                    <div className="flex items-center gap-1 ml-4">
                        <span className="text-2xl text-yellow-400 font-bold">{props.rating}</span>
                        <Star size={24} fill="#FACC15" color="#FACC15" />
                    </div>
                </div>

                <div className="flex items-center gap-2 mb-4 text-sm">
                    <SiNetflix className="text-red-600" size={20} />
                    <span>{props.rating}</span>
                    <span className="mx-1 text-gray-500">:</span>
                    <span>{props.year}</span>
                    <span className="mx-1 text-gray-500">:</span>
                    <span>{props.duration}</span>
                    <span className="mx-1 text-gray-500">:</span>
                    <span className="text-green-400">{props.matchPercentage}% Match</span>
                </div>

                <p className="mb-5 text-base leading-relaxed">{props.description}</p>

                <div className="flex items-center gap-3 mb-6">
                    <button
                        className="bg-red-600 text-white px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium hover:bg-red-900 transition-colors"
                        onClick={() => handleDisplayMoviePlayer(props.id)}
                    >
                        <Play size={18} className="fill-white" />
                        WATCH NOW
                    </button>

                    <button className="border border-gray-600 p-2.5 rounded-full hover:bg-gray-700">
                        <BookmarkPlus size={20} />
                    </button>

                    <button className="border border-gray-600 p-2.5 rounded-full hover:bg-gray-700">
                        <ThumbsUp size={20} />
                    </button>
                </div>

                <div className="space-y-2 text-base">
                    <InfoRow label="Genres:" items={props.genres} />
                    <InfoRow label="Production Companies:" items={props.productionCompanies} />
                    <InfoRow label="Languages:" items={props.languages} />
                    <InfoRow label="Keywords:" items={props.keywords} />
                </div>
            </div>

            {/* Movie Player Overlay - Chỉ hiển thị khi selectedMovieId có giá trị */}
            {selectedMovieId && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
                    <button
                        onClick={handleClosePlayer}
                        className="absolute top-2 right-2 text-white text-3xl p-2 hover:text-gray-400 hover:cursor-pointer transition-colors"
                        aria-label="Close player"
                    >
                        <IoMdClose />
                    </button>
                    
                    <div className="relative p-4 bg-gray-900 rounded-lg shadow-lg max-w-5xl w-full mx-auto">
                        {playerLoading && <p className="text-white text-center py-10">Loading movie player...</p>}
                        {playerError && <p className="text-red-500 text-center py-10">Error: {playerError}</p>}
                        {moviePlayerURL && !playerLoading && !playerError && (
                            <div className="relative" style={{ paddingTop: '56.25%' }}>
                                <iframe
                                    src={moviePlayerURL}
                                    title="Movie Player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                    className="absolute top-0 left-0 w-full h-full"
                                ></iframe>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}