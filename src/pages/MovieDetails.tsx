import { fetchMovieDetails, fetchTvShowDetails } from "../services/api"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { useFavorites } from "../hooks/useFavorites";
import VidDetailsCard from "../components/common/vidDetailsCard";
import { motion } from "framer-motion";

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
    <motion.div
    initial={{opacity:0, scale:0.98}} 
    animate={{opacity:1, scale:1}}
    exit={{ opacity: 0, scale: 0.98 }}
    >
      <VidDetailsCard video={data || []} onToggleFavorite={toggleFavorite} isFavorite={isFavorite(data?.id as string)} />
    </motion.div>
  )
}