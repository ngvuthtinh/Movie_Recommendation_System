import React from 'react'
import MovieList2 from './movie_list_2'
import NavAfterLogin from './nav_afterLogin'
import Footer from './footer'

const MyMovieList: React.FC = () => {
    return(
        <div className="bg-black min-h-screen text-white">
            <NavAfterLogin/>
            <div className=" text-white font-black text-4xl m-5 leading-10">My Movies List</div>
            <MovieList2/>
            <div className=" text-white font-black text-4xl m-5 leading-10">Liked Movies</div>
            <MovieList2/>
            <Footer/>
        </div>
    )
}
export default MyMovieList

