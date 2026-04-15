import { useState, useEffect, useRef } from 'react';
import { Show, Genre } from '../types';
import ShowCard from './ShowCard';
import { getGenres } from '../api/tmdb';

interface Props {
  spin: () => Promise<Show | null>;
  loading: boolean;
}

const DUMMY_TITLES = [
  "Stranger Things", "Squid Game", "Bridgerton", "The Witcher",
  "Black Mirror", "Ozark", "The Crown", "Narcos",
  "Money Heist", "Dark", "Peaky Blinders", "Better Call Saul",
  "Breaking Bad", "The Office", "Seinfeld", "Friends"
];

export default function RouletteScreen({ spin, loading }: Props) {
  const [phase, setPhase] = useState<'IDLE' | 'SPINNING_GENRE' | 'SPINNING_SHOW' | 'REVEAL'>('IDLE');

  const [genres, setGenres] = useState<Genre[]>([]);
  const [displayedText, setDisplayedText] = useState('Ready to Spin?');
  const [finalShow, setFinalShow] = useState<Show | null>(null);

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    getGenres().then(setGenres);
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, []);

  const handleSpin = async () => {
    if (loading || phase === 'SPINNING_GENRE' || phase === 'SPINNING_SHOW') return;

    setFinalShow(null);
    setPhase('SPINNING_GENRE');

    // Animate Genres
    intervalRef.current = setInterval(() => {
      if (genres.length > 0) {
        const randomGenre = genres[Math.floor(Math.random() * genres.length)].name;
        setDisplayedText(randomGenre);
      } else {
        setDisplayedText("Loading Genres...");
      }
    }, 100);

    // Fetch the result
    const result = await spin();

    if (!result) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplayedText('Error. Try again.');
      setPhase('IDLE');
      return;
    }

    // Wait at least 1.5 seconds on the genre animation to build suspense
    setTimeout(() => {
      const actualGenreId = result.genre_ids?.[0];
      const actualGenreName = genres.find(g => g.id === actualGenreId)?.name || 'Netflix Original';

      setDisplayedText(`Selected: ${actualGenreName}`);
      setPhase('SPINNING_SHOW');

      if (intervalRef.current) clearInterval(intervalRef.current);

      // Animate Show Titles
      intervalRef.current = setInterval(() => {
        const randomTitle = DUMMY_TITLES[Math.floor(Math.random() * DUMMY_TITLES.length)];
        setDisplayedText(randomTitle);
      }, 80);

      // Wait 1.5 seconds on the title animation
      setTimeout(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayedText(result.name);
        setFinalShow(result);
        setPhase('REVEAL');
      }, 1500);

    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-md mx-auto space-y-8 p-4">

      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400 mb-2">
          Roulette
        </h2>
        <p className="text-zinc-400 text-sm">This is a random Netlflix show picker. Don't know what to watch? Let fate decide.</p>
      </div>

      {/* The Slot Machine Display */}
      <div className={`w-full h-32 flex items-center justify-center rounded-xl border-2 transition-all duration-300
        ${phase === 'REVEAL' ? 'border-green-500 bg-green-500/10' :
          phase !== 'IDLE' ? 'border-red-500 bg-red-500/10 animate-pulse' :
            'border-zinc-700 bg-zinc-800'}`
      }>
        <span className="text-2xl md:text-3xl font-bold text-white text-center px-4 tracking-wide">
          {displayedText}
        </span>
      </div>

      {/* The Result Card */}
      <div className={`w-full transition-all duration-700 transform 
        ${phase === 'REVEAL' ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none absolute'}`
      }>
        {finalShow && (
          <div className="w-2/3 mx-auto">
            <ShowCard show={finalShow} />
          </div>
        )}
      </div>

      {/* Spin Button */}
      <button
        onClick={handleSpin}
        disabled={phase === 'SPINNING_GENRE' || phase === 'SPINNING_SHOW'}
        className={`w-full md:w-auto px-12 py-4 rounded-full font-bold text-lg text-white shadow-xl transition-all
          ${phase === 'SPINNING_GENRE' || phase === 'SPINNING_SHOW'
            ? 'bg-zinc-600 cursor-not-allowed opacity-50'
            : 'bg-red-600 hover:bg-red-500 hover:scale-105 active:scale-95 shadow-red-600/30'}`
        }
      >
        {phase === 'IDLE' ? 'SPIN NOW' : phase === 'REVEAL' ? 'SPIN AGAIN' : 'SPINNING...'}
      </button>

    </div>
  );
}
