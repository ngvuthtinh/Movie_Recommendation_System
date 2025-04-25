import { Play, BookmarkPlus, ThumbsUp, Star } from "lucide-react"
import { type MovieDetail2Props, defaultMovieProps } from "../types/I_DetailMovie2"
import { SiNetflix } from "react-icons/si";
export default function DetailMovie_2(props: MovieDetail2Props) {
  // Merge provided props with default props
  const {
    id,
    title,
    rating,
    year,
    duration,
    matchPercentage,
    description,
    genres,
    productionCompanies,
    languages,
    keywords,
  } = {
    ...defaultMovieProps,
    ...props,
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded overflow-hidden">
      {/* Main content area */}
      <div className="bg-black p-6 text-white">
        {/* Movie title and rating */}
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-5xl font-bold">{title}</h1>
          <div className="flex items-center gap-1 ml-4">
            <span className="text-2xl text-yellow-400 font-bold">{rating}</span>
            <Star size={24} fill="#FACC15" color="#FACC15" />
          </div>
        </div>

        {/* Movie metadata row */}
        <div className="flex items-center gap-2 mb-4 text-sm">
          <SiNetflix className="text-red-600" size={20} />
          <span>{rating}</span>
          <span className="mx-1 text-gray-500">:</span>
          <span>{year}</span>
          <span className="mx-1 text-gray-500">:</span>
          <span>{duration}</span>
          <span className="mx-1 text-gray-500">:</span>
          <span className="text-green-400">{matchPercentage}% Match</span>
        </div>

        {/* Movie description */}
        <p className="mb-5 text-base leading-relaxed">{description}</p>

        {/* Action buttons */}
        <div className="flex items-center gap-3 mb-6">
          <button className="bg-red-600 text-white px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium">
            <Play size={18} className="fill-white" />
            WATCH NOW
          </button>

          <button className="border border-gray-600 p-2.5 rounded-full">
            <BookmarkPlus size={20} />
          </button>

          <button className="border border-gray-600 p-2.5 rounded-full">
            <ThumbsUp size={20} />
          </button>
        </div>

        {/* Additional information - Styled to match the image exactly */}
        <div className="space-y-2 text-base">
          <div className="grid grid-cols-[200px_1fr]">
            <div className="text-gray-500 font-normal">Production Companies</div>
            <div className="text-white">{productionCompanies.join(", ")}</div>
          </div>

          <div className="grid grid-cols-[200px_1fr]">
            <div className="text-gray-500 font-normal">Language</div>
            <div className="text-white">{languages.join(", ")}</div>
          </div>

          <div className="grid grid-cols-[200px_1fr]">
            <div className="text-gray-500 font-normal">Genre</div>
            <div className="text-white">{genres.join(", ")}</div>
          </div>

          <div className="grid grid-cols-[200px_1fr]">
            <div className="text-gray-500 font-normal">Keywords</div>
            <div className="text-white">{keywords.join(", ")}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
