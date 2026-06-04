import { useQuery } from "@tanstack/react-query"
import { fetchTrendingMovies, fetchTrendingTvShows } from "../services/api"
import type { VideoProps } from "../types/type"
import HeroSection from "../components/layout/herosection"
import VideoCard from "../components/common/videoCard";
import { useSearchParams } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";

export default function Home() {
const {isFavorite, toggleFavorite} = useFavorites();

const [searchParams] = useSearchParams();
const queryTerm =  searchParams.get('query')?.trim() ?? '';
console.log('This is the search term', queryTerm);

const {data: trendingMovies} = useQuery<VideoProps[]>({
queryKey: ['trending-movies'],
queryFn: fetchTrendingMovies
})

const {data: trendingTvShows} = useQuery<VideoProps[]>({
  queryKey: ['trending-tv-shows'],
  queryFn: fetchTrendingTvShows
})

console.log('Trending movies:', trendingMovies);
console.log('Trending TV shows:', trendingTvShows);
  return (
    <div className="bg--(bg)">
      <HeroSection />
     <div className="my-8 flex w-full overflow-y-scroll no-scrollbar">
      <div className="flex w-fit gap-6">
        {trendingMovies?.map((movie: VideoProps) => (
          <VideoCard 
          key={movie.id} 
          video={movie}
          isFavorite={isFavorite(movie.id)}
          onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
     </div>

     <div className="my-8 flex w-full overflow-y-scroll no-scrollbar">
      <div className="w-fit overlow-y-scroll flex flex-row gap-4">
          {trendingTvShows?.map((tvshow: VideoProps) => (
          <VideoCard 
          key={tvshow.id} 
          video={tvshow} 
          isFavorite={isFavorite(tvshow.id)}
          onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
     </div>
    </div>
  )
}