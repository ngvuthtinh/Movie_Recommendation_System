import React from 'react';
import NavAfterLogin from './nav_afterLogin';
import Footer from './footer';
import DetailMovie_2 from './DetailMovie_2';
import MovieListTest from './movie_list_test';

const FilmPage: React.FC = () => {
  const Url = "https://image.tmdb.org/t/p/original/pbrkL804c8yAv3zBZR4QPEafpAR.jpg";

  return (
    <div className="bg-black p-2 py-2 min-h-screen text-white">
      <NavAfterLogin />

      {/* Main Content Wrapper */}
      <div className="max-w-screen-xl mx-auto px-4 py-10">
        {/* Movie Detail Section */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          {/* Poster */}
          <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[40%] max-w-[450px] aspect-[2/3] overflow-hidden shadow-lg">
            <img
              src={Url}
              alt="Movie Poster"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Detail Section */}
          <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[50%]">
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
};

export default FilmPage;
