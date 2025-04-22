import { I_MovieList1 } from '../types/I_MovieList1.ts';
import { SiNetflix } from "react-icons/si";
import { IoMdEye } from "react-icons/io";
import { FaHeart, FaStar } from "react-icons/fa";

export default function MovieList_1() {
    const url = 'https://image.tmdb.org/t/p/original';
    // Function to get the color based on the match percentage
    const getMatchColor = (match: number): string => {
        if (match >= 80) return "text-green-400"; // Excellent match
        if (match >= 50) return "text-yellow-400"; // Average match
        if (match >= 30) return "text-orange-400"; // Below average
        return "text-red-500"; // Poor match
    };

    // Function to get the font based on the match percentage
    const getMatchFont = (match: number): string => {
        if (match >= 90) return "font-bold"; // Excellent match
        return "font-normal"; // Poor match
    };

    // Function to get the color based on the watched status
    const getColor = (isBoolean: boolean): string => {
        return isBoolean ? "text-red-500" : "text-gray-500"; // Change color based on watched status
    };


    const posters: I_MovieList1[] = [
        {
            id: 27205,
            title: 'Inception',
            release_date: '2010-07-15',
            poster_path: '/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg',
            vote_average: 8.364,
            runtime: 148,
            tagline: 'Your mind is the scene of the crime.',
            match: 90, // Placeholder value
            isWatched: false, // Placeholder value
            isLoved: false, // Placeholder value
        },
        {
            id: 157336,
            title: 'Interstellar',
            release_date: '2014-11-05',
            poster_path: '/pbrkL804c8yAv3zBZR4QPEafpAR.jpg',
            vote_average: 8.417,
            runtime: 169,
            tagline: 'Mankind was born on Earth. It was never meant to die here.',
            match: 80,
            isWatched: true,
            isLoved: true,
        },
        {
            id: 155,
            title: 'The Dark Knight',
            release_date: '2008-07-16',
            poster_path: '/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg',
            vote_average: 8.512,
            runtime: 152,
            tagline: 'Welcome to a world without rules.',
            match: 70,
            isWatched: true,
            isLoved: false,
        },
        {
            id: 19995,
            title: 'Avatar',
            release_date: '2009-12-15',
            poster_path: '/vL5LR6WdxWPjLPFRLe133jXWsh5.jpg',
            vote_average: 7.573,
            runtime: 162,
            tagline: 'Enter the world of Pandora.',
            match: 50,
            isWatched: false,
            isLoved: true,
        },
    ];
    const postersProcess = posters.map((poster) => ({
        ...poster,
        release_date: poster.release_date.substring(0, 4),
        vote_average: poster.vote_average.toFixed(1),
        runtime: `${Math.floor(poster.runtime / 60)}h ${poster.runtime % 60}m`,
        poster_path: `${url}${poster.poster_path}`,
    }));
    return (
        <div
            className="mt-8 mb-8 ml-24 mr-24
                    grid grid-cols-4 gap-16
                    bg-black">
            {postersProcess.map((poster) => (
                <div key={poster.id} className="item-center justify-center relative">
                    <img
                        src={poster.poster_path}
                        alt={poster.title}
                        className="rounded-3xl w-[24rem] h-[13.5rem]
                        hover:scale-110 transition-all duration-300"
                    />
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
    );
}