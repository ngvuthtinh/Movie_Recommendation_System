import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import NavAfterLogin from "@/components/NavAfterLogin";
import MovieList1 from "@/components/MovieList1";
export default function SearchPage() {
    return (
        <div className="bg-black min-h-screen text-white">
            <NavAfterLogin />
            <div className="bg-black min-h-screen pt-[4.25rem]">
                <div className="z-5 w-full">
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
        </div>
    )
}