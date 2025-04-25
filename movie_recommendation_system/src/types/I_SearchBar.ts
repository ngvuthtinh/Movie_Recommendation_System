// Types and interfaces for the search bar component
export interface SearchBarProps {
    searchQuery?: string
    selectedGenre?: string
    selectedYear?: string
    isAdultContentEnabled?: boolean
    onSearchQueryChange?: (query: string) => void
    onGenreChange?: (genre: string) => void
    onYearChange?: (year: string) => void
    onAdultContentToggle?: (enabled: boolean) => void
    onSearch?: () => void
  }
  
  // Default values for the search bar props
  export const defaultSearchBarProps: Required<SearchBarProps> = {
    searchQuery: "",
    selectedGenre: "",
    selectedYear: "",
    isAdultContentEnabled: false,
    onSearchQueryChange: () => {},
    onGenreChange: () => {},
    onYearChange: () => {},
    onAdultContentToggle: () => {},
    onSearch: () => {},
  }
  
  // List of available genres
  export const availableGenres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mystery",
    "Romance",
    "Science Fiction",
    "TV Movie",
    "Thriller",
    "War",
    "Western",
  ]
  
  // Generate years from current year back to 1900
  export const generateYearOptions = (): string[] => {
    const currentYear = new Date().getFullYear()
    const years: string[] = []
  
    for (let year = currentYear; year >= 1900; year--) {
      years.push(year.toString())
    }
  
    return years
  }
  