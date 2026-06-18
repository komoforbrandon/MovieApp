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
  adult?: boolean;
  id: string;
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
  created_by?: Array<{ id: number; credit_id: string; name: string; profile_path: string | null }>;
  production_companies?: Array<{ id: number; logo_path: string | null; name: string; origin_country: string }>;
  spoken_language?: Array<{ english_name: string; iso_639_1: string; name: string }>;
    last_episode_to_air?: {
    name:string,
    runtime: number, 
  }
  runtime?: number;
  language?: string[]
  genres?: Genre[];
};

export type VideoCardProps = {
 video: VideoProps;
 isFavorite: boolean;
 onToggleFavorite: (video: VideoProps) => void;
}

export type SavedMediaItem = VideoProps & {
  mediaType: MediaType;
};
