import { Play, BookmarkPlus, ThumbsUp } from "lucide-react";
import { MovieDetailProps, defaultMovieProps } from '../types/DetailMovie1';
import { SiNetflix } from "react-icons/si";
export default function DetailMovie_1(props: Partial<MovieDetailProps>) {
  // Merge provided props with default props
  const { id, title, rating, year, duration, matchPercentage, description, genres } = {
    ...defaultMovieProps,
    ...props,
  };

  return (
    <div className="max-w-lg mx-auto rounded overflow-hidden">
      {/* Main content area */}
      <div className="bg-transparent p-6 text-white">
        {/* Movie title */}
        <h1 className="text-4xl font-bold mb-3">{title}</h1>
        {/* Movie metadata row */}
        <div className="flex items-center gap-2 mb-4 text-sm">
          <SiNetflix className="text-red-600" size={20} />
          <span>{rating}</span>
          <span className="mx-1">·</span>
          <span>{year}</span>
          <span className="mx-1">·</span>
          <span>{duration}</span>
          <span className="mx-1">·</span>
          <span className="text-green-400">{matchPercentage}% Match</span>
        </div>

        {/* Movie description */}
        <p className="mb-4 text-sm leading-relaxed">{description}</p>

        {/* Action buttons */}
        <div className="flex items-center gap-3 mb-4">
          <button className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-medium hover:bg-red-900">
            <Play size={16} className="fill-white" />
            WATCH NOW
          </button>

          <button className="border border-gray-400 p-2 rounded hover:bg-gray-700 transition-colors">
            <BookmarkPlus size={20} />
          </button>

          <button className="border border-gray-400 p-2 rounded hover:bg-gray-700 transition-colors">
            <ThumbsUp size={20} />
          </button>
        </div>

        {/* Genre tags */}
        <div className="text-xs text-gray-300">
          {genres.map((genre, index) => (
            <span key={index}>
              {genre}
              {index < genres.length - 1 && <span className="mx-1">·</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}