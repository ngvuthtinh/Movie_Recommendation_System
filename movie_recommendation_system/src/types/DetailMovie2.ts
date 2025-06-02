// Types and interfaces for the movie component
export interface MovieDetail2Props {
    id: number
    title: string
    rating: number
    year: number
    duration: string
    // matchPercentage: number
    description: string
    genres: string[]
    productionCompanies: string[]
    languages: string[]
    keywords: string[]
    backdropPath: string
}

// Utility functions related to movies
export const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
}
  
export const calculateMatchPercentage = (userPreferences: string[], movieGenres: string[]): number => {
    if (!userPreferences.length) return 0
  
    const matchingGenres = movieGenres.filter((genre) => userPreferences.includes(genre))
  
    return Math.round((matchingGenres.length / userPreferences.length) * 100)
}

export const convertToMovieDetail2Props = (data): MovieDetail2Props => {
    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    return {
        id: data.id,
        title: data.title,
        productionCompanies: data.companies?.map(company => company.company_name) || [],
        languages: data.languages?.map(lang => capitalize(lang.language)) || [],
        keywords: data.keywords?.map(keyword => capitalize(keyword.word)) || [],
        genres: data.genres?.map(genre => capitalize(genre.genre_name)) || [],
        description: data.overview,
        year: parseInt(data.release_date?.substring(0, 4)),
        duration: formatDuration(data.runtime),
        rating: Number(data.vote_average?.toFixed(1)),
        backdropPath: data.backdrop_path
    }
}
  