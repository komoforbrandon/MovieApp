import { useFavorites } from "../hooks/useFavorites"
import type { VideoProps } from "../types/type";
export default function Watchlist() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  const favData = favorites;
  return (
    <>
      <h1>Watchlist Page</h1>
      <p>This page will display a list of movies and TV shows that the user has added to their watchlist.</p>
      <p>{JSON.stringify(favData)}</p>
    </>
  )
}