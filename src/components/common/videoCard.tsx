import type { VideoCardProps } from "../../types/type";
import { Link } from "react-router-dom";
import { BookmarkPlusIcon, Star } from "lucide-react";
import failImg from "../../assets/loadfail.png";

export default function VideoCard({
  video,
  isFavorite = false,
  onToggleFavorite,
}: VideoCardProps) {
  const ImgUrl = video.poster_path
    ? `https://image.tmdb.org/t/p/w500${video.poster_path}`
    : failImg;
  return (
    <Link to={`/${(video.title?'movie':'tv-show') as string}/${video.id}`} className="group flex flex-col gap-2 ">
      <div className="relative z-0 w-37 md:w-46 h-full overflow-hidden rounded-sm">
        <img
          src={ImgUrl}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-[1.2]"
        />
        <button
          className="hidden cursor-copy group-hover:block absolute top-1 right-1 z-10 rounded-lg  p-1 shadow-sm  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite(video);
          }}
          type="button"
        >
          <BookmarkPlusIcon
            color={`${isFavorite ? "red" : "white"}`}
            fill={`${isFavorite ? "red" : "none"}`}
          />
        </button>
        <div className="hidden px-2 group-hover:block group-hover:opacity-100 group-hover:transition-opacity absolute bottom-0 z-10 w-full bg-black/5 shadow-md text-left">
          <h2 className="text-sm font-semibold">{video.title || video.name}</h2>
          <p className="flex items-center gap-1 text-sm text-gray-200">
            <span className="text-red-200">
              {new Date(video.release_date).getFullYear() ||
                new Date(video.first_air_date).getFullYear()}
            </span>{" "}
            <span className="font-extrabold text-red-300">.</span>
            <Star size={16} color="gold" fill="gold" />{" "}
            {Number(video.vote_average).toFixed(1)}
          </p>
        </div>
      </div>
    </Link>
  );
}
