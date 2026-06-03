import { createContext, useContext } from "react";
import type { VideoProps } from "../types/type";

type FavoritesContextValue = {
  favorites: VideoProps[];
  isFavorite: (videokey: string) => boolean;
  toggleFavorite: (video: VideoProps) => void;
};

export const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined
);
export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }

  return context;
}