import NavAfterLogin from "@/components/NavAfterLogin";
import DetailMovie_1 from "@/components/DetailMovie1";
import MovieList1 from "@/components/MovieList1"
import Footer from "@/components/Footer"
import { defaultMovieProps } from '@/types/DetailMovie1';

export default function HomePage() {
    return (
        <div className="bg-black">
            <NavAfterLogin/>

            <div className="bg-[url(https://image.tmdb.org/t/p/original/pbrkL804c8yAv3zBZR4QPEafpAR.jpg)]
                            w-full h-[48rem] bg-cover bg-center relative">
                {/*Gradient shadow*/}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
                {/*Details*/}
                <div className="absolute left-12 top-1/2 -translate-y-1/2">
                    <DetailMovie_1 {...defaultMovieProps} />
                </div>
            </div>

            <div className="mt-8">
                <h1 className="text-4xl font-bold pl-8">Trending Now</h1>
                <MovieList1 typeOfRecommendation="trending_now"/>
            </div>
            <div className="m-8">
                <h1 className="text-4xl font-bold">Top Rated</h1>
                <MovieList1 typeOfRecommendation="top_rated"/>
            </div>
            <div className="m-8">
                <h1 className="text-4xl font-bold">Recommend Movies</h1>
                <MovieList1 typeOfRecommendation="recommend_for_you"/>
            </div>
            <div className="m-8">
                <h1 className="text-4xl font-bold">New Releases</h1>
                <MovieList1 typeOfRecommendation="new_released"/>
            </div>

            <Footer />
        </div>
    );
}