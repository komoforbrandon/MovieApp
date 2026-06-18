import { useFavorites } from "../hooks/useFavorites"
import type { VideoProps } from "../types/type";
import VideoCard from "../components/common/videoCard";
import { useNavigate } from "react-router-dom";
export default function Watchlist() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  const favoriteTv = favorites.filter((video: VideoProps) => video.name);
  const favoriteMovies = favorites.filter((video: VideoProps) => video.title);
  return (
    <div className="">
      <div className="p-2 md:p-4 space-y-3">
        <h1 className="font-bold text-xl md:text-4xl pb-3"><span className="border-b-2 border-red-500">My </span>List</h1>
        <p className="text-red-200 uppercase pb-3 md:pb-5">{favorites.length} titles saved</p>
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
      <div className="p-2 md:p-4 text-center">
        <h1 className="font-bold text-xl md:text-3xl">Want to see more?</h1>
        <p className="text-red-200 py-6 line-clamp-2 leading-6">Explore the latest trending titles and add them to your list <br/> to watch whenever you want.</p>
        <button className="bg-red-500 text-white py-3 px-4 rounded-md hover:bg-red-600 uppercase"
        onClick={()=>navigate('/movie')}
        >Explore trending</button>
      </div>
    </div>
  )
}