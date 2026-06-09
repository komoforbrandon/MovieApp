import type { VideoProps } from "../../types/type";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {fetchTrendingMovies,fetchTrendingTvShows} from "../../services/api"
import { InfoIcon, Play } from "lucide-react";
export default function HeroSection() {
  const {data: trendingMovies} = useQuery<VideoProps[]>({
    queryKey: ['trending-movies'],
    queryFn: fetchTrendingMovies
  })
  const {data: trendingTvShows} = useQuery<VideoProps[]>({
    queryKey: ['trending-tv-shows'],
    queryFn: fetchTrendingTvShows
  })

  const movies = useMemo(()=>{
    return [...(trendingMovies || []), ...(trendingTvShows || [])]
  },[trendingMovies,trendingTvShows]) 

  const [videoIndex, setVideoIndex] = useState(0);
  const location = useLocation();
  const videos = useMemo(() => {
    if (location.pathname.startsWith("/movies")) {
      return movies.filter((video: VideoProps) => video.media_type === "movie");
    } else if (location.pathname.startsWith("/tv-shows")) {
      return movies.filter((video: VideoProps) => video.media_type === "tv");
    } else {
      return movies || [];
    }
  }, [location.pathname, movies]);

  useEffect(() => {
    if (!videos.length) return;
    const interval = setInterval(() => {
      setVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [videos]);

  const currentVideo = videos[videoIndex];

  if (!currentVideo) return null;

  return (
    <div className="relative h-[50vh] md:h-[70vh] lg:h-[92vh]">
      <img
        src={`https://image.tmdb.org/t/p/w1280${currentVideo.backdrop_path}`}
        alt={currentVideo.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 bg-black/50 w-full h-full backdrop-blur-950/8 md:h-[70vh] lg:h-[92vh] lg:w-full z-30" />
      <div className="absolute bottom-11  left-5 transform md:left-7 z-40">
        <div className="flex mr-2 items-center">
           <span className="text-white bg-red-500 px-2 py-1 text-md font-medium mr-2 uppercase">{currentVideo.media_type=='movie'?'Movie':'Series'}</span>
            <span className="text-red-200 md:text-2xl font-bold uppercase">  cinema noir originals</span>
          </div>      
        <h1 className="text-3xl font-bold text-white mb-3 md:text-6xl lg:text-8xl md:w-[85%] md:my-5 uppercase">
          {currentVideo.title || currentVideo.name}
        </h1>
        <p className="hidden md:block text-lg leading-8 md:text-xl md:w-3/4 lg:w-1/2 text-red-100 mb-8">{currentVideo.overview}</p>
        <p className="md:hidden leading-5 text-red-100 mb-3">{currentVideo.overview.slice(0, 110)}</p>
        <div className="flex justify-start">
          <Link
            to={`/${(currentVideo.title?'movie':'tv-show') as string}/${currentVideo.id}`}
            className="bg-white text-black md:text-lg px-4 py-2 md:py-3 rounded-md flex items-center gap-2"
          >
            <Play className="w-6 h-6" fill="default" size={25}/>
            <span>Watch Now</span>
          </Link>
          <Link
            to={`/${(currentVideo.title?'movie':'tv-show') as string}/${currentVideo.id}`}
            className="bg-gray-800/70 text-white md:text-lg px-4 py-2 md:py-3 rounded-md flex items-center gap-2 ml-4"
          >
            <InfoIcon className="w-7 h-7"/>
            <span>More Info</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
