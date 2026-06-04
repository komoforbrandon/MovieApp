export type MediaType = "movie" | "tv";

export type SearchProps = {
  OnSearch: (query: string) => void;
  initialValue?: string;
};

export type Genre = {
  id: number;
  name: string;
}

export type VideoProps = {
  id: string | number;
  title?: string;
  overview: string;
  release_date: string;
  first_air_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  genre_ids: number[];
  name?: string;
  media_type: MediaType;
  original_language: string;
};

export type VideoCardProps = {
 video: VideoProps;
 isFavorite: boolean;
 onToggleFavorite: (video: VideoProps) => void;
}

export type SavedMediaItem = VideoProps & {
  mediaType: MediaType;
};

export type MediaDetails = VideoProps & {
  genres?: Genre[];
  tagline?: string;
  status?: string;
  homepage?: string;
  runtime?: number; // For movies
  number_of_seasons?: number; // For TV shows
  number_of_episodes?: number[]; // For TV shows
  spoken_languages?: { english_name: string }[]; // For movies and TV shows
  production_countries?: { name: string }[]; // For movies and TV shows
};

export type MovieDetailsCardProps = {
  item: MediaDetails | null;
  mediaType: MediaType;
  onClose: () => void;
};
