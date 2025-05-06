import Footer from "@/components/footer";
import SearchBar from "@/components/SearchBar";
import NavAfterLogin from "@/components/nav_afterLogin";
import MovieList1 from "@/components/movie_list_1";
export default function SearchPage() {
    return (
        <div className="bg-black min-h-screen">
            <div className="relative z-10 w-full top-0">
                <NavAfterLogin />
            </div>

            <div className="relative z-5 w-full ">
                <SearchBar />
            </div>
            
            <div className="relative w-full mt-8">
                <MovieList1 />
            </div>

            <div className="relative w-full mt-8">
                <MovieList1 />
            </div>

            <div className="relative w-full mt-8">
                <Footer/>
            </div>
            
        </div>
    )
}