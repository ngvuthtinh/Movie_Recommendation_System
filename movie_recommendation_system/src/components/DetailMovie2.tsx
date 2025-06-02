import { Play, BookmarkPlus, ThumbsUp, Star } from "lucide-react"
import { MovieDetail2Props } from "../types/DetailMovie2"
import { SiNetflix } from "react-icons/si";

const InfoRow = ({ label, items, maxItems = 5 }: { label: string; items: string[]; maxItems?: number }) => (
    <div className="grid grid-cols-[200px_1fr]">
      <div className="text-gray-500 font-normal">{label}</div>
      <div className="text-white">{items.slice(0, maxItems).join(", ")}</div>
    </div>
);

export default function DetailMovie_2(props: MovieDetail2Props) {
    if (!props) {
        return <div className="text-center text-white">Loading...</div>;
    }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded overflow-hidden">
      {/* Main content area */}
      <div className="bg-black p-6 text-white">
        {/* Movie title and rating */}
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-5xl font-bold">{props.title}</h1>
          <div className="flex items-center gap-1 ml-4">
            <span className="text-2xl text-yellow-400 font-bold">{props.rating}</span>
            <Star size={24} fill="#FACC15" color="#FACC15" />
          </div>
        </div>

        {/* Movie metadata row */}
        <div className="flex items-center gap-2 mb-4 text-sm">
          <SiNetflix className="text-red-600" size={20} />
          <span>{props.rating}</span>
          <span className="mx-1 text-gray-500">:</span>
          <span>{props.year}</span>
          <span className="mx-1 text-gray-500">:</span>
          <span>{props.duration}</span>
          {/*TODO: them6 cái percentage chỗ này, tao comment ben6 types nua*/}
          {/*<span className="mx-1 text-gray-500">:</span>*/}
          {/*<span className="text-green-400">{props.matchPercentage}% Match</span>*/}
        </div>

        {/* Movie description */}
        <p className="mb-5 text-base leading-relaxed">{props.description}</p>

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
            <InfoRow label="Genres:" items={props.genres} />
            <InfoRow label="Production Companies:" items={props.productionCompanies} />
            <InfoRow label="Languages:" items={props.languages} />
            <InfoRow label="Keywords:" items={props.keywords} />
        </div>
      </div>
    </div>
  )
}
