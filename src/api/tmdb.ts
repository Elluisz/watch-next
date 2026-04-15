import axios from 'axios';
import { Show, Genre, TMDBResponse } from '../types';

const BASE_URL = '/api/tmdb';

const tmdb = axios.create({
  baseURL: BASE_URL,
});

interface PaginatedResponse {
  results: Show[];
  totalPages: number;
}

export const getNetflixShows = async (genreId?: string, page: number = 1): Promise<PaginatedResponse> => {
  const { data } = await tmdb.get<TMDBResponse<Show>>('/discover/tv', {
    params: {
      with_watch_providers: 8,
      watch_region: 'US',
      with_genres: genreId,
      page: page,
      sort_by: 'popularity.desc',
    },
  });

  // Return the object that App.tsx is now expecting
  return {
    results: data.results || [],
    totalPages: data.total_pages || 1
  };
};

let genresCachePromise: Promise<Genre[]> | null = null;

export const getGenres = async (): Promise<Genre[]> => {
  if (!genresCachePromise) {
    genresCachePromise = tmdb.get<{ genres: Genre[] }>('/genre/tv/list')
      .then(res => {
        if (!res.data || !res.data.genres) {
          console.error("Failed to load genres, received:", res.data);
          return [];
        }
        return res.data.genres;
      })
      .catch(err => {
        console.error("Error fetching genres:", err);
        return [];
      });
  }
  return genresCachePromise;
};

export const searchShows = async (query: string, page: number = 1): Promise<PaginatedResponse> => {
  const { data } = await tmdb.get<TMDBResponse<Show>>('/search/tv', {
    params: {
      query,
      page,
      language: 'en-US',
      with_watch_providers: 8,
      watch_region: 'US',
      include_adult: false
    },
  });

  return {
    results: data.results || [],
    totalPages: data.total_pages || 1
  };
};