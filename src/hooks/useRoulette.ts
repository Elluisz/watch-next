import { useState, useRef, useCallback } from 'react';
import { getNetflixShows } from '../api/tmdb';
import { Show } from '../types';

export function useRoulette() {
  const [bucket, setBucket] = useState<Show[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);



  const spin = useCallback(async (): Promise<Show | null> => {
    setLoading(true);
    setError(null);

    try {
      let currentBucket = [...bucket];

      // If bucket is empty, fill it with a random page of Netflix shows!
      // TMDB has up to 500 pages, but to stay on quality shows we limit to random page 1-100
      if (currentBucket.length === 0) {
        const randomPage = Math.floor(Math.random() * 100) + 1;
        const response = await getNetflixShows(undefined, randomPage);
        currentBucket = response.results;
      }

      if (currentBucket.length === 0) {
        setLoading(false);
        return null;
      }

      // Pop a random show from the bucket
      const randomIndex = Math.floor(Math.random() * currentBucket.length);
      const selectedShow = currentBucket[randomIndex];

      // Remove the selected show from the bucket so we don't pick it again soon
      const newBucket = [...currentBucket];
      newBucket.splice(randomIndex, 1);
      
      setBucket(newBucket);
      setLoading(false);

      return selectedShow;
    } catch (err) {
      console.error("Failed to fetch random shows:", err);
      setError("Failed to fetch shows. Please try again.");
      setLoading(false);
      return null;
    }
  }, [bucket]);

  return {
    spin,
    loading,
    error,
    bucketSize: bucket.length
  };
}
