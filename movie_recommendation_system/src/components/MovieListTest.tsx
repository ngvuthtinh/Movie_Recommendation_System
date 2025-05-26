import { IMovieList1 } from "@/types/MovieList1";
import { SiNetflix } from "react-icons/si";
import { IoMdEye } from "react-icons/io";
import { FaHeart, FaStar } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useRef } from "react";


export default function MovieListTest() {
    const URL = 'https://image.tmdb.org/t/p/original';
    // Function to get the color based on the match percentage
    const getMatchColor = (match: number): string => {
        if (match >= 80) return "text-green-400"; // Excellent match
        if (match >= 50) return "text-yellow-400"; // Average match
        if (match >= 30) return "text-orange-400"; // Low
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

    const posters: IMovieList1[] = [
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
        {
            id: 24428,
            title: 'The Avengers',
            release_date: '2012-04-25',
            poster_path: '/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg',
            vote_average: 7.71,
            runtime: 143,
            tagline: 'When an unexpected enemy emerges and threatens global safety and security',
            match: 60,
            isWatched: false,
            isLoved: true,
        },
        {
            id: 293660,
            title: 'Deadpool',
            release_date: '2016-02-09',
            poster_path: '/en971MEXui9diirXlogOrPKmsEn.jpg',
            vote_average: 7.606,
            runtime: 108,
            tagline: 'The origin story of former Special Forces operative turned mercenary Wade Wilson',
            match: 70,
            isWatched: false,
            isLoved: true,
        },
        {
            id: 299536,
            title: 'Avengers: Infinity War',
            release_date: '2018-04-25',
            poster_path: '/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg',
            vote_average: 8.255,
            runtime: 149,
            tagline: 'As the Avengers and their allies have continued to protect the world',
            match: 70,
            isWatched: false,
            isLoved: true,
        },
        {
            id: 550,
            title: 'Fight Club',
            release_date: '1999-10-15',
            poster_path: '/hZkgoQYus5vegHoetLkCJzb17zJ.jpg',
            vote_average: 8.438,
            runtime: 139,
            tagline: 'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into',
            match: 70,
            isWatched: false,
            isLoved: true,
        },
    ];
    const postersProcess = posters.map((poster) => ({
        ...poster,
        release_date: poster.release_date.substring(0, 4),
        vote_average: poster.vote_average.toFixed(1),
        runtime: `${Math.floor(poster.runtime / 60)}h ${poster.runtime % 60}m`,
        poster_path: `${URL}${poster.poster_path}`,
    }));
  
const scrollRef = useRef<HTMLDivElement>(null);

const scrollRight = () => {
  if (scrollRef.current) scrollRef.current.scrollLeft += 20 * 16 + 24; // 20rem + ~1.5rem gap
};

const scrollLeft = () => {
  if (scrollRef.current) scrollRef.current.scrollLeft -= 20 * 16 + 24;
};

  
return (
  <div className="relative w-full py-8 bg-black">
    {/* Left Arrow */}
    <button
      onClick={scrollLeft}
      className="absolute -left-10 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/60 hover:bg-black rounded-full shadow-lg"
    >
      <IoIosArrowBack size={28} className="text-white" />
    </button>

    {/* Scrollable Movie Row */}
    <div className="relative w-full overflow-hidden px-4">
    <div
      ref={scrollRef}
      className="flex overflow-x-auto scroll-smooth gap-6 no-scrollbar"
      style={{ scrollBehavior: 'smooth' }}
    >
      {postersProcess.map((poster) => (
        <div
          key={poster.id}
          className="
            flex-shrink-0
            basis-[95%] sm:basis-[60%] md:basis-[45%]
            lg:basis-[30%] xl:basis-[25%] 2xl:basis-[20%]
            transition-transform duration-300"
        >
          <img
            src={poster.poster_path}
            alt={poster.title}
            className= "w-full h-[13rem] rounded-2xl"
          />
          <div>
            <div className="flex mt-4 items-center justify-between">
              <h2 className="text-white text-xl font-bold">{poster.title}</h2>
              <div className="flex items-center gap-2">
                <p className="text-yellow-300 text-xl font-bold">{poster.vote_average}</p>
                <FaStar className="text-yellow-300 text-xl" />
              </div>
            </div>

            <div className="flex mt-2 gap-1.5 items-center">
              <SiNetflix className="text-red-600" />
              <p className="text-white text-sm">{poster.release_date}</p>
              <p className="text-white text-sm">⋮</p>
              <p className="text-white text-sm">{poster.vote_average}</p>
              <p className="text-white text-sm">⋮</p>
              <p className="text-white text-sm">{poster.runtime}</p>
              <p className="text-white text-sm">⋮</p>
              <p className={`${getMatchColor(poster.match)} ${getMatchFont(poster.match)} text-sm`}>
                {poster.match}% Match
              </p>
            </div>

            <div className="flex mt-2 gap-4 items-center justify-between">
              <p className="text-white text-base">{poster.tagline}</p>
              <div className="flex gap-4 items-center">
                <FaHeart className={`${getColor(poster.isLoved)} size-5`} />
                <IoMdEye className={`${getColor(poster.isWatched)} size-7`} />
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>

    {/* Right Arrow */}
    <button
      onClick={scrollRight}
      className="absolute -right-10 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/60 hover:bg-black rounded-full shadow-lg"
    >
      <IoIosArrowForward size={28} className="text-white" />
    </button>

    {/* Style to hide scrollbars */}
    <style>
      {`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}
    </style>
  </div>
);

}