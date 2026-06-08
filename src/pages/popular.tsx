import VideoCard from "../components/common/videoCard";
import type { VideoProps } from "../types/type";
import { fetchNewRelease, fetchPopularMovies } from "../services/api";
import { useQuery } from "@tanstack/react-query";
import { useFavorites } from "../hooks/useFavorites";
import TvLoader from "../components/common/tvLoader";
import Footer from "../components/layout/footer";
export default function PopularTv() {
  const { isFavorite, toggleFavorite } = useFavorites();

  const { data: popular, isLoading: popularLoading } = useQuery({
    queryKey: ["popular-movies"],
    queryFn: fetchPopularMovies,
  });

  const { data: newRelease, isLoading: newReleaseLoading } = useQuery({
    queryKey: ["popular-tv-shows"],
    queryFn: fetchNewRelease,
  });

  return (
    <>
      <div className="p-2 md:px-6 md:py-4">
        <h1 className="font-bold text-lg md:text-2xl pb-6">Popular Movies</h1>
        {popularLoading && <TvLoader />}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-5">
          {popular?.map((popular: VideoProps) => (
            <VideoCard
              key={popular.id}
              video={popular}
              isFavorite={isFavorite(popular.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </div>

      <div className="p-2 md:px-6 md:py-4">
        <h1 className="font-bold text-lg md:text-2xl pb-6">New Releases</h1>
        {newReleaseLoading && <TvLoader />}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-5">
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
      <div className="pt-3">
        <Footer />
      </div>
    </>
  );
}
