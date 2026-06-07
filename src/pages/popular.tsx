import VideoCard from "../components/common/videoCard";
import type { VideoProps } from "../types/type";
import { fetchNewRelease } from "../services/api";
import { useQuery } from "@tanstack/react-query";
import { useFavorites } from "../hooks/useFavorites";

export default function PopularTv() {
 const {isFavorite, toggleFavorite} = useFavorites();
  const { data } = useQuery({
    queryKey: ["popular-tv-shows"],
    queryFn: fetchNewRelease,
  });

  return (
    <div className="p-2 md:px-6 md:py-4">
      <h1 className="font-bold text-lg md:text-2xl pb-6">New and </h1>
      <div className="grid grid-cols-2 md:grid-cols-5 xl:grid-cols-7 lg:grid-cols-8 gap-5">
        {data?.map((newrelease: VideoProps) => (
          <VideoCard
            key={newrelease.id}
            video={newrelease}
            isFavorite={isFavorite(newrelease.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}
