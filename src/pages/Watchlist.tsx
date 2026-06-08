import { useFavorites } from "../hooks/useFavorites"
import type { VideoProps } from "../types/type";
import VideoCard from "../components/common/videoCard";
import Footer from "../components/layout/footer";
export default function Watchlist() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  console.log('favorites', favorites)
  const favoriteTv = favorites.filter((video: VideoProps) => video.name);
  const favoriteMovies = favorites.filter((video: VideoProps) => video.title);
  return (
    <div className="">
      <div className="p-2 md:p-4 space-y-3">
        <h1 className="font-bold text-xl md:text-2xl pb-3">Saved Movies</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-5">
          {favoriteMovies.map((movie: VideoProps) => (
            <VideoCard
              key={movie.id}
              video={movie}
              isFavorite={isFavorite(movie.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </div>
      <div className="p-2 md:p-4 space-y-3">
        <h1 className="font-bold text-xl md:text-2xl pb-3">Saved TV Shows</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-5">
          {favoriteTv.map((tv: VideoProps) => (
            <VideoCard
              key={tv.id}
              video={tv}
              isFavorite={isFavorite(tv.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}