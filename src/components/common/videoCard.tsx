import type { VideoCardProps } from "../../types/type";
import { Link } from "react-router-dom";
import { BookmarkPlusIcon, Star } from "lucide-react";
import failImg from "../../assets/loadfail.png";
import { motion } from "framer-motion";

export default function VideoCard({
  video,
  isFavorite = false,
  onToggleFavorite,
}: VideoCardProps) {
  const ImgUrl = video.poster_path
    ? `https://image.tmdb.org/t/p/w500${video.poster_path}`
    : failImg;

  const hoverVariants = {
    hidden: { opacity: 0, pointerEvents: "none" },
    visible: { opacity: 1, pointerEvents: "auto" },
  };

  return (
    <Link to={`/${(video.title ? "movie" : "tv-show") as string}/${video.id}`} className="flex flex-col gap-2">
      <motion.div
        className="relative z-0 w-39 md:w-46 h-full overflow-hidden rounded-sm"
        initial="hidden"
        animate="hidden"
        whileHover="visible"
        whileTap="visible"
        transition={{duration:0.25, ease:'easeOut'}}
      >
        <img
          src={ImgUrl}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-[1.3]"
        />
        <motion.button
          variants={hoverVariants}
          className="cursor-copy absolute top-1 right-1 z-10 rounded-lg p-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
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
        </motion.button>
        <motion.div
          variants={hoverVariants}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="px-2 absolute bottom-0 z-10 w-full bg-black/10 shadow-lg text-left"
        >
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
        </motion.div>
      </motion.div>
    </Link>
  );
}
