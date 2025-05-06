import NavAfterLogin from "@/components/nav_afterLogin";
import DetailMovie_1 from "@/components/DetailMovie_1";
import MovieList1 from "@/components/movie_list_1"
import Footer from "@/components/footer"
import { defaultMovieProps } from '@/types/I_DetailMovie1';


export default function HomePage() {
    return (
        <div className="bg-black">
            <div className="bg-[url(https://image.tmdb.org/t/p/original/pbrkL804c8yAv3zBZR4QPEafpAR.jpg)]
                            w-full h-[48rem] bg-cover bg-center relative">
                {/*Gradient shadow*/}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
                {/*Navigation*/}
                <div className="absolute w-full top-0 z-10 ">
                    <NavAfterLogin />
                </div>
                {/*Details*/}
                <div className="absolute left-12 top-1/2 -translate-y-1/2">
                    <DetailMovie_1 {...defaultMovieProps} />
                </div>
            </div>

            <div className="m-8">
                <h1 className="text-4xl font-bold">Trending Now</h1>
                <MovieList1 />
            </div>
            <div className="m-8">
                <h1 className="text-4xl font-bold">Top Rated</h1>
                <MovieList1 />
            </div>
            <div className="m-8">
                <h1 className="text-4xl font-bold">Recommend Movies</h1>
                <MovieList1 />
            </div>
            <div className="m-8">
                <h1 className="text-4xl font-bold">New Releases</h1>
                <MovieList1 />
            </div>

            <Footer />
        </div>
    );
}