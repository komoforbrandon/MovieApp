import { useQuery } from "@tanstack/react-query"
import { fetchTrendingMovies, fetchTrendingTvShows } from "../services/api"
import type { VideoProps } from "../types/type"
import VideoCard from "../components/common/videoCard";
import { useSearchParams } from "react-router-dom";

export default function Home() {
const [searchParams] = useSearchParams();
const queryTerm =  searchParams.get('query')?.trim() ?? '';
console.log('This is the search term', queryTerm);
const {data: trendingMovies} = useQuery<VideoProps>({
queryKey: ['trending-movies'],
queryFn: fetchTrendingMovies
})

const {data: trendingTvShows} = useQuery<VideoProps>({
  queryKey: ['trending-tv-shows'],
  queryFn: fetchTrendingTvShows
})

console.log('Trending movies:', trendingMovies);
console.log('Trending TV shows:', trendingTvShows);
  return (
    <div className="bg--(bg)">
      <h1>Welcome to the Home Page!</h1>
      <p>This is the home page of our React application.</p>
    </div>
  )
}