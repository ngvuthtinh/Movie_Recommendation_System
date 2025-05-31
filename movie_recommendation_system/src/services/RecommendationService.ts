import axios from 'axios';
import { IMovieList1 } from '../types/MovieList1'; 

const API_BASE_URL = 'http://127.0.0.1:8000'; 

const getAuthToken = (): string | null => { 
    const token = localStorage.getItem('token'); 
    if (!token) {
        return null; 
    }
    return token;
};

const mapMovieOutToIMovieList1 = (movieOut: any): IMovieList1 => {
    return {
        id: movieOut.id,
        title: movieOut.title,
        release_date: movieOut.release_date || '',
        poster_path: movieOut.poster_path || '',
        vote_average: movieOut.vote_average || 0,
        runtime: movieOut.runtime || 0,
        tagline: movieOut.tagline || '',

        vote_count: movieOut.vote_count,
        overview: movieOut.overview,
        original_language: movieOut.original_language,
        popularity: movieOut.popularity,
        backdrop_path: movieOut.backdrop_path,

        // Randomly generated fields from 0 to 100
        match: Math.floor(Math.random() * 101),
        isWatched: movieOut.is_watched || false,
        isLoved: movieOut.is_loved || false,
    };
};

const RecommendationService = {
    getMovieRecommendations: async (
        movieId: number,
        recommendationType: string='recommend_for_you',
        n: number = 10
    ): Promise<IMovieList1[]> => {
        try {
            const token = getAuthToken();
            if (!token) {
                throw new Error('No authentication token found. Please log in.');
            }

            const response = await axios.get<any[]>(
                `${API_BASE_URL}/recommendation/movie/${movieId}`,
                {
                    params: {
                        recommendation_type: recommendationType,
                        n: n,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.map(mapMovieOutToIMovieList1);
        } catch (error) {
            console.error('Error fetching movie recommendations:', error);
            throw error;
        }
    },

    getUserRecommendations: async (
        recommendationType: string='recommend_for_you',
        n: number = 10,
        historySize: number = 10
    ): Promise<IMovieList1[]> => {
        try {
            const token = getAuthToken();
            if (!token) {
                throw new Error('No authentication token found. Please log in.');
            }

            const response = await axios.get<any[]>( 
                `${API_BASE_URL}/recommendation/user`,
                {
                    params: {
                        recommendation_type: recommendationType,
                        n: n,
                        history_size: historySize,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.map(mapMovieOutToIMovieList1);
        } catch (error) {
            console.error('Error fetching user recommendations:', error);
            throw error;
        }
    },
};

export default RecommendationService;