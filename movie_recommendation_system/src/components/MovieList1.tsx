import { useEffect, useState } from 'react';
import { IMovieList1 } from '../types/MovieList1.ts';
import { SiNetflix } from "react-icons/si";
import { IoMdEye } from "react-icons/io";
import { FaHeart, FaStar } from "react-icons/fa";
import RecommendationService from '../services/RecommendationService.ts';
import { getMovieURLById } from '../services/MovieLinkService.ts';
import { useNavigate } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";

type MovieList1Props = {
    typeOfRecommendation: string;
};

export default function MovieList1({ typeOfRecommendation }: MovieList1Props) {
    const URL = 'https://image.tmdb.org/t/p/original';

    const [movies, setMovies] = useState<IMovieList1[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
    const [moviePlayerURL, setMoviePlayerURL] = useState<string | null>(null);
    const [playerLoading, setPlayerLoading] = useState<boolean>(false);
    const [playerError, setPlayerError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            setError(null);
            try {
                const movieID = 1;
                const fetchedData = await RecommendationService.getMovieRecommendations(
                    movieID,
                    typeOfRecommendation || 'recommend_for_you',
                    8
                );
                setMovies(fetchedData);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch recommendations.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (localStorage.getItem('user_token')) {
            fetchMovies();
        } else {
            setLoading(false);
            setError('Please log in to see recommendations.');
        }
    }, [typeOfRecommendation]);

    const getMatchColor = (match: number): string => {
        if (match >= 80) return "text-green-400";
        if (match >= 50) return "text-yellow-400";
        if (match >= 30) return "text-orange-400";
        return "text-red-500";
    };

    const getMatchFont = (match: number): string => {
        if (match >= 90) return "font-bold";
        return "font-normal";
    };

    const getColor = (isBoolean: boolean): string => {
        return isBoolean ? "text-red-500" : "text-gray-500";
    };

    const navigate = useNavigate();

    const handleMoviePosterClick = async (movieId: number) => {
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
    };

    const handleClosePlayer = () => {
        setSelectedMovieId(null);
        setMoviePlayerURL(null);
        setPlayerError(null);
    };

    const postersProcess = movies.map((movie) => ({
        ...movie,
        release_date: movie.release_date ? movie.release_date.substring(0, 4) : '',
        vote_average: movie.vote_average !== undefined ? movie.vote_average.toFixed(1) : '0.0',
        runtime: movie.runtime !== undefined ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : '0h 0m',
        poster_path: movie.poster_path ? `${URL}${movie.poster_path}` : '',
        movie_url: movie.movie_url || '',
    }));

    if (loading) {
        return <div className="text-white text-center mt-10">Loading recommendations...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
    }

    if (postersProcess.length === 0) {
        return <div className="text-white text-center mt-10">No recommendations found.</div>;
    }

    return (
        <div className="relative">
            <div
                className="mt-8 mb-8 ml-24 mr-24
                        grid grid-cols-4 gap-16
                        bg-black"
            >
                {postersProcess.map((poster) => (
                    <div
                        key={poster.id}
                        className="item-center justify-center relative cursor-pointer"
                        onClick={() => handleMoviePosterClick(poster.id)}
                    >
                        {poster.poster_path ? (
                            <img
                                src={poster.poster_path}
                                alt={poster.title}
                                className="rounded-3xl w-full h-100 object-cover hover:scale-105 transition-transform duration-300"
                            />
                        ) : (
                            <div className="rounded-3xl w-[24rem] h-[13.5rem] bg-gray-700 flex items-center justify-center text-white text-center">
                                No Poster Available
                            </div>
                        )}

                        <div className="">
                            <div className="flex mt-4 items-center justify-between">
                                <h2 className="text-white text-xl font-bold">{poster.title}</h2>
                                <div className="flex items-center gap-2">
                                    <p className="text-yellow-300 text-xl font-bold">{poster.vote_average}</p>
                                    <FaStar className="text-yellow-300 text-xl" />
                                </div>

                            </div>

                            <div className="flex mt-2 gap-1.5 items-center">
                                <SiNetflix className="text-red-600" />
                                <p className="text-white text-sm font-normal">{poster.release_date}</p>
                                <p className="text-white text-sm font-normal">⋮</p>
                                <p className="text-white text-sm font-normal">{poster.vote_average}</p>
                                <p className="text-white text-sm font-normal">⋮</p>
                                <p className="text-white text-sm font-normal">{poster.runtime}</p>
                                <p className="text-white text-sm font-normal">⋮</p>
                                <p className={`${getMatchColor(poster.match)} text-sm ${getMatchFont(poster.match)}`}>{poster.match}% Match</p>

                            </div>

                            <div className="flex mt-2 gap-4 items-center justify-between">
                                <p className="text-white text-base font-normal">{poster.tagline}</p>
                                <div className="flex gap-4 items-center">
                                    <FaHeart className={`${getColor(poster.isLoved)} text-base font-normal size-5`} />
                                    <IoMdEye className={`${getColor(poster.isWatched)} text-base font-normal size-7`} />
                                </div>

                            </div>

                        </div>
                    </div>
                ))}
            </div>

            {selectedMovieId && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
                    <button
                            onClick={handleClosePlayer}
                            className="absolute z-1 top-5 right-10 text-white text-3xl p-2 hover:text-gray-400 hover:cursor-pointer transition-colors"
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
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                    className="absolute bottom-0 left-0 w-full h-full"
                                ></iframe>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}