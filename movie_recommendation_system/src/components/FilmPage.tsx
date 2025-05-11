import React from 'react'
import MovieList1 from './movie_list_1'
import NavAfterLogin from './nav_afterLogin'
import Footer from './footer'
import DetailMovie_2 from './DetailMovie_2'

const FilmPage: React.FC = () => {
    const Url = "https://image.tmdb.org/t/p/original/pbrkL804c8yAv3zBZR4QPEafpAR.jpg";

    return(
        
        <div className="bg-black min-h-screen text-white">
            <NavAfterLogin/>
            <div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 p-10">
                <div className="w-[30rem] h-[40rem] mr-5 mt-20 ml-15 mb-20 overflow-hidden shadow-lg">
                    <img
                        src={Url}
                        alt="Movie Poster"
                        className="w-full h-full object-cover"
                    />
                </div>
                <DetailMovie_2/>
                </div>
            </div>    
            <div className=" text-white font-black text-4xl m-5 leading-10">For You</div>
            <MovieList1/>
            <div className=" text-white font-black text-4xl m-5 leading-10">Recommended Movies</div>
            <MovieList1/>
            <Footer/>
        </div>
    )
}
export default FilmPage

