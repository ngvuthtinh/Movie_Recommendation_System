import MovieListTest from '@/components/MovieListTest'
import NavAfterLogin from '@/components/NavAfterLogin'
import Footer from '@/components/Footer'
import DetailMovie_2 from '@/components/DetailMovie2'
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getMovieDetail} from '@/services/MovieDetailService';
import {convertToMovieDetail2Props, MovieDetail2Props} from '@/types/DetailMovie2';

export default function FilmPage ()  {
    const Url = "https://image.tmdb.org/t/p/original";
    const [movie, setMovie] = useState<MovieDetail2Props | null>(null);
    const { id } = useParams();

    useEffect(() => {
      const fetchMovieDetail = async () => {
        try {
          if (!id) return;
          const data = await getMovieDetail(Number(id));
          console.log("API Response:", data);
          const movieData = convertToMovieDetail2Props(data);
          console.log("Converted movie data:", movieData);
          setMovie(movieData);
        } catch (error) {
          console.error("Error fetching movie:", error);
        }
      };

      fetchMovieDetail();
    }, [id]);

    const backdrop = movie ? `${Url}${movie.backdropPath}` : '';
    console.log("Backdrop URL:", backdrop);
    return (
    <div className="bg-black p-1 min-h-screen text-white">
      <NavAfterLogin />

      {/* Main Content Wrapper */}
      <div className="max-w-screen-xl mx-auto px-4 py-12">
        {/* Movie Detail Section */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          {/* Poster */}
          <div className="w-[30rem] h-[42rem] m-5 overflow-hidden shadow-lg">
            <img src={backdrop}
              alt="Movie Poster"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Detail Section */}
          <div>
            {movie && <DetailMovie_2 {...movie} />}
          </div>
        </div>

        {/* For You Section */}
        <div className="mt-16 text-white font-black text-3xl md:text-4xl mb-4">
          For You
        </div>
        <MovieListTest />

        {/* Recommended Section */}
        <div className="mt-20 text-white font-black text-3xl md:text-4xl mb-4">
          Recommended Movies
        </div>
        <MovieListTest />
      </div>

      <Footer />
    </div>
  );
}

