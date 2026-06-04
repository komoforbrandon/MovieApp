import type { VideoCardProps } from "../../types/type";
import { Link } from "react-router-dom";
import { BookmarkPlusIcon } from "lucide-react";

export default function VideoCard({
 video,
 isFavorite=false,
 onToggleFavorite,   
}: VideoCardProps) {
const ImgUrl = `https://image.tmdb.org/t/p/w500${video.poster_path}`
  return (
    <Link to={`/movie/${video.id}`} className="flex flex-col gap-2">
      <div className="relative">
        <img
          src={ImgUrl}
          alt={video.title}
          className="w-full h-48 object-cover rounded-md"
        />
        <div className="absolute top-2 right-2">
          <button onClick={() => onToggleFavorite(video)}>
            <BookmarkPlusIcon
              className={`w-6 h-6 text-white ${
                isFavorite ? "fill-red-500" : ""
              }`}
            />
          </button>
        </div>
      </div>
      <h2 className="text-lg font-semibold">{video.title}</h2>
      <p className="text-sm text-gray-500">{video.release_date}</p>
    </Link>
  );
}