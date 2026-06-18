import type { VideoProps, VideoCardProps } from "../../types/type";
import { Link } from "react-router-dom";
import { Play, PlusIcon,X, ThumbsUp, Tv , ArrowLeft} from "lucide-react";
import { useState } from "react";
import { fetchSimilarMovies, fetchSimilarTvShows } from "../../services/api";
import { useQuery } from "@tanstack/react-query";
import VideoCard from "./videoCard";
import MovieLoader from "./movieLoader";
import Footer from "../layout/footer";
import loadfail from "../../assets/loadfail.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function VidDetailsCard({
  video,
  isFavorite = false,
  onToggleFavorite,
}: VideoCardProps) {
 const [likeColor, setLikeColor] = useState(false);
 const navigate = useNavigate();
 const { data, isLoading } = useQuery({
    queryKey: ["similar-movies", video.id],
    queryFn: () => {
      if (video.title) {
        return fetchSimilarMovies(video.id as string);
      } else if (video.name) {
        return fetchSimilarTvShows(video.id as string);
      }else{
        return
      }
    },
 })

const Imgsrc = video.poster_path
    ? `https://image.tmdb.org/t/p/w500${video.poster_path}`
    : loadfail;

  return (
    <motion.div
    initial={{opacity:0, scale:0.90}} 
    animate={{opacity:1, scale:1}}
    exit={{ opacity: 0, scale: 0.90 }}
    transition={{ duration: 0.25, ease: 'easeOut' }}
    className="space-y-3">
      <div className="relative h-[53vh] md:h-[70vh] lg:h-[92vh]">
        <img
          src={Imgsrc}
          alt={video.title || video.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute z-45 top-2 left-3 md:left-5 md:top-4 rounded cursor-pointer bg-linear-to-r from-red-600 to-pink-300 text-white py-2 px-2 flex items-center gap-2 bg-linear-to-"
        onClick={()=>navigate(-1)}
        >
          <ArrowLeft color="white" size={20} className="cursor-pointer" />
           <span>Back</span>
        </div> 
        <div className="absolute top-0 bg-black/50 w-full h-full backdrop-blur-950/8 md:h-[70vh] lg:h-[92vh] lg:w-full z-30" />
        <div className="absolute bottom-4 md:bottom-11  left-3 transform md:left-7 z-40">
          <h1 className="text-3xl font-bold md:font-extrabold text-white my-2 md:text-6xl lg:text-8xl md:w-[85%] md:my-5 uppercase">
            {video.title || video.name}
          </h1>
          <div className="flex flex-wrap items-center gap-1 md:gap-5">
            <span className="text-green-700">98% Match</span>
            <span className="text-white bg-gray-700/80 py-1 px-2">{new Date(video.release_date || video.first_air_date || "").getFullYear()}</span>
            <span className="text-white">PG-{video.adult ? "18" : "13"}</span>
            <span className="text-red-200">{video.runtime ? Math.floor(video.runtime / 60) : (video.last_episode_to_air?.runtime ? Math.floor(video.last_episode_to_air.runtime / 60) : "N/A")}h {video.runtime ? video.runtime % 60 : (video.last_episode_to_air?.runtime ? video.last_episode_to_air.runtime % 60 : "N/A")}m</span>
            <span className="text-white flex gap-1 items-center"><Tv className="w-5 h-5" />4K Ultra HD</span>
          </div>
          <p className="hidden md:block text-lg leading-8 md:text-xl md:w-3/4 lg:w-1/2 text-red-100 mb-8">
            {video?.overview}
          </p>
          <p className="md:hidden leading-5 text-red-100 mb-3">
            {video?.overview?.slice(0, 100)}
          </p>
          <div className="flex flex-wrap items-center gap-2 md:gap-5">
            <div className="flex items-center gap-2">
                <span className="text-red-200 uppercase">Director: </span>
                <span className="text-white">{video.created_by?.[0]?.name ?? video.production_companies?.[0]?.name ?? "N/A"}</span>
            </div>
            <span className="hidden md:blocktext-red-300/30">|</span>
            <div className="flex items-center gap-2">
                <span className="text-red-200 uppercase">Genres:</span>
                <span className="text-white">{video.genres?.map((genre) => genre.name).join(", ") ?? "N/A"}</span>
            </div>
          </div>
          <div className="flex flex-wrap py-1 justify-start gap-y-3 space-x-1 md:space-x-3">
            <Link
              to={`#`}
              className=" bg-linear-to-r from-red-600 to-pink-300 text-white md:text-lg px-3 md:px-4 py-2 md:py-3 rounded-md flex items-center gap-2"
            >
              <Play className="w-5 h-5" fill="white" size={25} />
              <span>Watch Now</span>
            </Link>
            <Link
              to={`#`}
              className="bg-gray-800/70 text-white md:text-lg px-3 md:px-4 py-2 md:py-3 rounded-md flex items-center gap-2 ml-2 md:ml-4"
              onClick={(e)=>{
                e.preventDefault()
                e.stopPropagation()
                onToggleFavorite(video)
              }}
            >
              {isFavorite?(<X className="w-5 h-5" /> ):( <PlusIcon className="w-5 h-5" />)}
              <span>{isFavorite ? "Remove" : "My"} List</span>
            </Link>

            <div className="border flex items-center p-2 rounded-sm border-gray-600/30 md:py-2 md:px-4">
              <ThumbsUp
                className="w-6 h-6"
                fill={`${likeColor ? "red" : "none"}`}
                color={`${likeColor ? "red" : "white"}`}
                onClick={() => {
                  setLikeColor(!likeColor);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="py-2 px-2 md:px-4 md:py-4">
        <h1 className="font-bold text-xl md:text-4xl pb-6"><span className="border-b-2 border-red-500">Similar</span> Movies</h1>
        {isLoading && <MovieLoader />}
       <div className="overflow-scroll no-scrollbar">
        <div className="md:px-2 w-fit overlow-y-scroll flex gap-4">
          {data?.map((movie: VideoProps) => (
            <VideoCard
              key={movie.id}
              video={movie}
              isFavorite={false}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
        </div>
      </div>
      <div className="">
        <Footer />
      </div>
    </motion.div>
  );
}
