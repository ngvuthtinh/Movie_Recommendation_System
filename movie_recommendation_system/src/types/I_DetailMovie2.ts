// Types and interfaces for the movie component
export interface MovieDetail2Props {
    id?: number
    title?: string
    rating?: number
    year?: number
    duration?: string
    matchPercentage?: number
    description?: string
    genres?: string[]
    productionCompanies?: string[]
    languages?: string[]
    keywords?: string[]
  }
  
  // Default values for the movie props
  export const defaultMovieProps: Required<MovieDetail2Props> = {
    id: 2,
    title: "Interstellar",
    rating: 8.4,
    year: 2014,
    duration: "2h 49m",
    matchPercentage: 100,
    description:
      "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    genres: ["Action", "Science Fiction", "Adventure"],
    productionCompanies: ["Legendary Pictures", "Syncopy", "Warner Bros. Pictures"],
    languages: ["English", "French", "Japanese", "Swahili"],
    keywords: ["Rescue", "Mission", "Dream", "Airplane", "Paris", "France"],
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
  