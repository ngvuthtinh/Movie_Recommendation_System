import React from 'react'
import MovieListTest from '@/components/MovieListTest'
import NavAfterLogin from '@/components/NavAfterLogin'
import Footer from '@/components/Footer'
import DetailMovie_2 from '@/components/DetailMovie2'
const FilmPage: React.FC = () => {
    const Url = "https://image.tmdb.org/t/p/original/pbrkL804c8yAv3zBZR4QPEafpAR.jpg";

    return (
    <div className="bg-black p-1 min-h-screen text-white">
      <NavAfterLogin />

      {/* Main Content Wrapper */}
      <div className="max-w-screen-xl mx-auto px-4 py-12">
        {/* Movie Detail Section */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          {/* Poster */}
          <div className="w-[30rem] h-[42rem] m-5 overflow-hidden shadow-lg">
            <img
              src={Url}
              alt="Movie Poster"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Detail Section */}
          <div>
            <DetailMovie_2 />
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
export default FilmPage

