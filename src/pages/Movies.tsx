import HeroSection from "../components/layout/herosection";
import type { VideoProps } from "../types/type";
import VideoCard from "../components/common/videoCard";
import Footer from "../components/layout/footer";
import { fetchMoviesByGenre } from "../services/api";
import { useQueries } from "@tanstack/react-query";
import { useFavorites } from "../hooks/useFavorites";
import MovieLoader from "../components/common/movieLoader";

const genres = [
  { genreId: 28, name: "Action" },
  { genreId: 12, name: "Adventure" },
  { genreId: 16, name: "Animation" },
  { genreId: 35, name: "Comedy" },
  { genreId: 80, name: "Crime" },
  { genreId: 99, name: "Documentary" },
  { genreId: 18, name: "Drama" },
  { genreId: 36, name: "History" },
  { genreId: 27, name: "Horror" },
  { genreId: 10402, name: "Music" },
  { genreId: 9648, name: "Mystery" },
  { genreId: 10749, name: "Romance" },
  { genreId: 878, name: "Science Fiction" },
];
export default function Movie() {
  const { isFavorite, toggleFavorite } = useFavorites();
  const result = useQueries({
    queries: genres.map((genre) => ({
      queryKey: ["movies", genre.genreId],
      queryFn: () => fetchMoviesByGenre(genre.genreId),
    })),
  });

  return (
    <div className="bg--(bg)">
      <HeroSection />
      {result.map((query, index) => {
        const genre = genres[index];
        return (
          <div key={genre.genreId}>
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
