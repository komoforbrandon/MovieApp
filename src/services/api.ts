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
