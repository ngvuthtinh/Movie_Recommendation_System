import { Play, BookmarkPlus, ThumbsUp } from "lucide-react";
import { MovieDetailProps, defaultMovieProps } from '../types/I_DetailMovie1';

export default function DetailMovie_1(props: Partial<MovieDetailProps>) {
  // Merge provided props with default props
  const { id, title, rating, year, duration, matchPercentage, description, genres } = {
    ...defaultMovieProps,
    ...props,
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded overflow-hidden">
      {/* Main content area */}
      <div className="bg-slate-600 p-6 text-white">
        {/* Movie title */}
        <h1 className="text-4xl font-bold mb-3">{title}</h1>

        {/* Movie metadata row */}
        <div className="flex items-center gap-2 mb-4 text-sm">
          <span className="text-red-600 font-bold">N</span>
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
          <button className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-medium">
            <Play size={16} className="fill-white" />
            WATCH NOW
          </button>

          <button className="border border-gray-400 p-2 rounded">
            <BookmarkPlus size={20} />
          </button>

          <button className="border border-gray-400 p-2 rounded">
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