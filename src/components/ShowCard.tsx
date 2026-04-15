import { Show } from '../types';

interface Props {
  show: Show;
}

const ShowCard = ({ show }: Props) => {
  // TMDB gives us just the path, we need the full URL
  const imageUrl = show.poster_path
    ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div className="group relative aspect-[2/3] w-full overflow-hidden rounded-md bg-zinc-800 shadow-lg">
      <img
        src={imageUrl}
        alt={show.name}
        loading="lazy" // Improves performance as you scroll
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="font-bold text-white text-sm mb-1">{show.name}</h3>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-green-400 font-bold text-xs">
            ⭐ {show.vote_average.toFixed(1)}/10
          </span>
          <span className="text-zinc-400 text-xs">
            {show.first_air_date?.split('-')[0]}
          </span>
        </div>
        <p className="text-[10px] text-zinc-300 line-clamp-3">
          {show.overview}
        </p>
      </div>
    </div>
  );
};

export default ShowCard;