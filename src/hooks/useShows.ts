import { useState, useEffect, useCallback, useRef } from 'react';
import { getNetflixShows, getGenres, searchShows } from '../api/tmdb';
import { Show, Genre } from '../types';

export function useShows(query: string, genreId: string) {
  const [shows, setShows] = useState<Show[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isFetchingRef = useRef(false);

  // Reset page when query or genre changes
  useEffect(() => {
    setPage(1);
    setShows([]);
  }, [query, genreId]);

  // 3. Data Fetching
  useEffect(() => {
    let isActive = true;

    const fetchContent = async () => {
      setLoading(true);
      isFetchingRef.current = true;
      setError(null);
      try {
        const response = query.trim() 
          ? await searchShows(query, page) 
          : await getNetflixShows(genreId, page);
        
        if (isActive) {
          setTotalPages(response.totalPages);
          setShows((prev) => (page === 1 ? response.results : [...prev, ...response.results]));
        }
      } catch (err) {
        if (isActive) {
          console.error("Fetch error:", err);
          setError("Failed to fetch shows. Please try again later.");
        }
      } finally {
        if (isActive) {
          setLoading(false);
          isFetchingRef.current = false;
        }
      }
    };

    fetchContent();

    return () => {
      isActive = false;
    };
  }, [query, genreId, page]);

  const loadMore = useCallback(() => {
    if (!isFetchingRef.current && page < totalPages) {
      setPage((prev) => prev + 1);
    }
  }, [page, totalPages]);

  return { shows, loading, error, page, totalPages, loadMore };
}
