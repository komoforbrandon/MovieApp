import { useQuery } from "@tanstack/react-query";
import {
  fetchTrendingMovies,
  fetchTrendingTvShows,
  fetchNewRelease,
  fetchSearchMovies,
  fetchSearchTvShows,
} from "../services/api";
import type { VideoProps } from "../types/type";
import HeroSection from "../components/layout/herosection";
import VideoCard from "../components/common/videoCard";
import { useSearchParams } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import Footer from "../components/layout/footer";
import MovieLoader from "../components/common/movieLoader";
import SearchDetailsCard from "../components/common/searchDetailsCard";

export default function Home() {
  const { isFavorite, toggleFavorite } = useFavorites();

  const [searchParams] = useSearchParams();
  const queryTerm = searchParams.get("query")?.trim() ?? "";
  const { data: fetchSearchMoviesData } = useQuery<VideoProps[]>({
    queryKey: ["search-movies", queryTerm],
    queryFn: () => fetchSearchMovies(queryTerm),
    enabled: !!queryTerm,
  });

  const { data: fetchSearchTvShowsData } = useQuery<VideoProps[]>({
    queryKey: ["search-tv-shows", queryTerm],
    queryFn: () => fetchSearchTvShows(queryTerm),
    enabled: !!queryTerm,
  });

  const { data: trendingMovies, isLoading: trendLoading } = useQuery<
    VideoProps[]
  >({
    queryKey: ["trending-movies"],
    queryFn: fetchTrendingMovies,
  });

  const { data: trendingTvShows, isLoading: trendingLoading } = useQuery<
    VideoProps[]
  >({
    queryKey: ["trending-tv-shows"],
    queryFn: fetchTrendingTvShows,
  });

  const { data: newRelease, isLoading: releaseLoading } = useQuery<
    VideoProps[]
  >({
    queryKey: ["new-release"],
    queryFn: fetchNewRelease,
  });

  const searchData = [...fetchSearchMoviesData || [],...fetchSearchTvShowsData || []]

  return (
    <div className="bg--(bg)">
      {queryTerm?(
        <SearchDetailsCard queryTerm={queryTerm} queryData={searchData} />
      ):
      (<div>
        <HeroSection />
        <div className="p-2 md:px-4 w-full ">
          <h1 className="text-2xl font-bold my-5">Trending Now</h1>
          {trendLoading && <MovieLoader />}
          <div className="overflow-scroll no-scrollbar">
            <div className="md:px-2 w-fit overlow-y-scroll flex gap-3">
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
        </div>

        <div className="p-2 md:px-4 w-full">
          <h1 className="text-2xl font-bold my-5">Popular Cinema Noir</h1>
          {trendingLoading && <MovieLoader />}
          <div className="overflow-scroll no-scrollbar">
            <div className="px-2 w-fit overlow-y-scroll flex flex-row gap-3">
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

        <div className="p-2 md:px-4 w-full overflow-y-scroll no-scrollbar pb-4">
          <h1 className="text-2xl font-bold my-5">New Releases</h1>
          {releaseLoading && <MovieLoader />}
          <div className="overflow-y-scroll no-scrollbar">
            <div className="px-2 w-fit overlow-y-scroll flex flex-row gap-3">
              {newRelease?.map((newrelease: VideoProps) => (
                <VideoCard
                  key={newrelease.id}
                  video={newrelease}
                  isFavorite={isFavorite(newrelease.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>)}
    </div>
  );
}
