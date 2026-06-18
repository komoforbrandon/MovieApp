const apiKey = import.meta.env.VITE_TMD_API_KEY;
const apiBaseUrl = "https://api.themoviedb.org/3";

export const fetchTrendingMovies = async () => {
   const response = await fetch(`${apiBaseUrl}/trending/movie/week?api_key=${apiKey}`);
   const data = await response.json();
   return data.results;
}

export const fetchTrendingTvShows = async () => {
   const response = await fetch(`${apiBaseUrl}/trending/tv/week?api_key=${apiKey}`);
   const data = await response.json();
   return data.results;
}

export const fetchNewRelease = async () => {
  const response = await fetch(`${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`);
  const data = await response.json();
  return data.results;
}

export const fetchPopularMovies = async () => {
  const response = await fetch(`${apiBaseUrl}/movie/popular?api_key=${apiKey}&page=2`);
  const data = await response.json();
  return data.results;
}

export const fetchMoviesByGenre = async (genreId: number) => {
  const response = await fetch(`${apiBaseUrl}/discover/movie?api_key=${apiKey}&with_genres=${genreId}&sort_by=popularity.desc`);
  const data = await response.json();
  return data.results;
}

export const fetchTvShowsByGenre = async (genreId: number) => {
  const response = await fetch(`${apiBaseUrl}/discover/tv?api_key=${apiKey}&with_genres=${genreId}&sort_by=popularity.desc`);
  const data = await response.json();
  return data.results;
}

export const fetchSearchMovies = async (query: string) => {
  const response = await fetch(`${apiBaseUrl}/search/movie?api_key=${apiKey}&query=${query}`);
  const data = await response.json();
  return data.results;
}

export const fetchSearchTvShows = async (query: string) => {
  const response = await fetch(`${apiBaseUrl}/search/tv?api_key=${apiKey}&query=${query}`);
  const data = await response.json();
  return data.results;
}

export const fetchMovieDetails = async (movieId: string) => {
  const response = await fetch(`${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`);
  const data = await response.json();
  return data;
}

export const fetchTvShowDetails = async (tvShowId: string) => {
  const response = await fetch(`${apiBaseUrl}/tv/${tvShowId}?api_key=${apiKey}`);
  const data = await response.json();
  return data;
}

export const fetchSimilarMovies = async (movieId: string) => {
  const response = await fetch(`${apiBaseUrl}/movie/${movieId}/similar?api_key=${apiKey}`);
  const data = await response.json();
  return data.results;
}

export const fetchSimilarTvShows = async (tvShowId: string) => {
  const response = await fetch(`${apiBaseUrl}/tv/${tvShowId}/similar?api_key=${apiKey}`);
  const data = await response.json();
  return data.results;
}