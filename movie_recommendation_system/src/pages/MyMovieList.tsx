import NavAfterLogin from '@/components/NavAfterLogin'
import MovieList2 from '@/components/MovieList2'
import Footer from '@/components/Footer'

export default function MyMovieList() {
    return(
        <div className="bg-black min-h-screen text-white">
            <NavAfterLogin/>
            <div className=" text-white font-black text-4xl pt-[4.25rem] px-5">My Movies List</div>
            <MovieList2/>
            <div className=" text-white font-black text-4xl pt-5 px-5">Liked Movies</div>
            <MovieList2/>
            <Footer/>
        </div>
    )
}

