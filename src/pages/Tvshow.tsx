import HeroSection from "../components/layout/herosection"
import { useFavorites } from "../hooks/useFavorites"
import { useQueries } from "@tanstack/react-query";
import { fetchTvShowsByGenre } from "../services/api";
import MovieLoader from "../components/common/movieLoader";
import VideoCard from "../components/common/videoCard";
import Footer from "../components/layout/footer";
import type { VideoProps } from "../types/type";


const tvGenres = [
  { id: 10759, name: "Action & Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 10762, name: "Kids" },
  { id: 9648, name: "Mystery" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 10768, name: "War & Politics" },
  { id: 37, name: "Western" },
];

export default function Tvshow() {
   const { isFavorite, toggleFavorite } = useFavorites();
    const result = useQueries({
      queries: tvGenres.map((tvgenre) => ({
        queryKey: ["tv-shows", tvgenre.id],
        queryFn: () => fetchTvShowsByGenre(tvgenre.id),
      })),
    });
    return (
      <div className="bg--(bg)">
        <HeroSection />
        {result.map((query, index) => {
          const genre = tvGenres[index];
          return (
            <div key={genre.id}>
              <h1 className="font-bold text-lg md:text-2xl p-2 md:p-4">{genre.name}</h1>
              {query.isLoading && MovieLoader()}
              <div className="overflow-y-scroll no-scrollbar py-2">
                <div className="px-2 w-fit overlow-y-scroll flex flex-row gap-4">
                  {query.data?.map((movie: VideoProps) => (
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
          );
        })}
        <div className="pt-5">
           <Footer />
        </div>
      </div>
    );
}