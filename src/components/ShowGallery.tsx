import React from 'react';
import ShowCard from './ShowCard';
import { Show } from '../types';

interface ShowGalleryProps {
  shows: Show[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
}

const ShowGallery: React.FC<ShowGalleryProps> = ({ shows, loading, error, page, totalPages }) => {
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-10">
        {shows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* End of List State */}
      {!loading && shows.length > 0 && page >= totalPages && (
        <div className="text-center py-16 opacity-50">
          <div className="h-px bg-zinc-800 w-full mb-8" />
          <p className="text-zinc-400">That's all the titles we found for this category.</p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="text-center py-20">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      )}

      {/* Empty Search State */}
      {!loading && !error && shows.length === 0 && (
        <div className="text-center py-20">
          <p className="text-zinc-500 text-lg italic">No results matched your search.</p>
        </div>
      )}
    </>
  );
};

export default ShowGallery;
