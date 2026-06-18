import {
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { VideoProps } from "../types/type";
import { FavoritesContext } from "./useFavorites";
const FAVORITES_STORAGE_KEY = "watch-list-key";



function readStoredFavorites() {
  if (typeof window === "undefined") {
    return [];
  }

  const storedFavorites = window.localStorage.getItem(FAVORITES_STORAGE_KEY);

  if (!storedFavorites) {
    return [];
  }

  try {
    return JSON.parse(storedFavorites) as VideoProps[];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<VideoProps[]>(readStoredFavorites);

  useEffect(() => {
    window.localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(favorites)
    );
  }, [favorites]);

  const value = useMemo(
    () => ({
      favorites,
      isFavorite: (videokey: string) =>
        favorites.some((video) => video.id=== videokey),
      toggleFavorite: (video: VideoProps) => {
        setFavorites((currentFavorites) =>
          currentFavorites.some((favorite) => favorite.id === video.id)
            ? currentFavorites.filter(
                (favorite) => favorite.id !== video.id
              )
            : [...currentFavorites, video]
        );
      },
    }),
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

