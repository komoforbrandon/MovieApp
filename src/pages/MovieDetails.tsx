import { fetchMovieDetails, fetchTvShowDetails } from "../services/api"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { useFavorites } from "../hooks/useFavorites";
import VidDetailsCard from "../components/common/vidDetailsCard";

export default function MovieDetails() {
  const { id, type } = useParams();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { data} = useQuery({
    queryKey: ["movie-details", id],
    queryFn: () => {
      if (type === "movie") {
        return fetchMovieDetails(id as string);
      } else if (type === "tv-show") {
        return fetchTvShowDetails(id as string);
      }
    }
  })

  
  return (
    <>
      <VidDetailsCard video={data || []} onToggleFavorite={toggleFavorite} isFavorite={isFavorite(data?.id as string)} />
    </>
  )
}