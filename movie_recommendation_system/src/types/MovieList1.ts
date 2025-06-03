export interface IMovieList1 {
    id: number;
    title: string;
    release_date?: string;
    poster_path?: string;
    vote_average?: number;
    runtime?: number;
    vote_count?: number;
    overview?: string;
    original_language?: string;
    popularity?: number;
    backdrop_path?: string;
    tagline?: string;
    match: number; 
    isWatched: boolean; 
    isLoved: boolean;
    movie_url?: string; // URL to watch the movie
}