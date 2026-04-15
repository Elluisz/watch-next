import { useSearchParams } from 'react-router-dom';
import ShowGallery from './ShowGallery';
import { useEffect, useState } from 'react';
import { getGenres } from '../api/tmdb';
import { Show, Genre } from '../types';

interface Props {
  shows: Show[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  loadMore: () => void;
}

export default function HomeGallery({ shows, loading, error, page, totalPages, loadMore }: Props) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const genreId = searchParams.get('genre') || '';

  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    getGenres().then(setGenres);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 600;
      if (isBottom && !loading) {
        loadMore();
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore, loading]);

  const getHeaderTitle = () => {
    if (query) return `Results for "${query}"`;
    if (genreId) {
      const genre = genres.find(g => g.id.toString() === genreId);
      return genre ? genre.name : 'Category Results';
    }
    return 'Trending on Netflix';
  };

  return (
    <>
      <header className="mb-8 flex items-baseline justify-between">
        <h2 className="text-2xl md:text-3xl font-bold">
          {getHeaderTitle()}
        </h2>
      </header>

      <ShowGallery 
        shows={shows} 
        loading={loading} 
        error={error} 
        page={page} 
        totalPages={totalPages} 
      />
    </>
  );
}
