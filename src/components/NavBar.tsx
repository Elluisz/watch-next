import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Genre } from '../types';
import { getGenres } from '../api/tmdb';

const Navbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const queryParam = searchParams.get('q') || '';
  const genreParam = searchParams.get('genre') || '';

  const [inputValue, setInputValue] = useState(queryParam);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    getGenres().then(setGenres);
  }, []);

  // Debounce the URL update
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== queryParam) {
        if (inputValue) {
          navigate(`/explore?q=${inputValue}`);
        } else {
          // Keep genre if it exists
          navigate(genreParam ? `/explore?genre=${genreParam}` : '/explore');
        }
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [inputValue, queryParam, genreParam, navigate]);

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const g = e.target.value;
    setInputValue(''); // Reset search when genre changes
    if (g) {
      navigate(`/explore?genre=${g}`);
    } else {
      navigate('/explore');
    }
  };

  return (
    <nav className="sticky top-0 z-50 px-4 md:px-12 py-4 bg-black/90 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/">
            <h1 className="text-2xl font-black text-red-600 tracking-tighter hover:text-red-500 transition-colors">Watch Next</h1>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 ml-4 text-sm font-semibold tracking-wide">
            <Link
              to="/"
              className={`transition-colors ${pathname === '/' ? 'text-white' : 'text-zinc-400 hover:text-zinc-300'}`}
            >
              Random Show Picker
            </Link>
            <Link
              to="/explore"
              className={`transition-colors ${pathname === '/explore' ? 'text-white' : 'text-zinc-400 hover:text-zinc-300'}`}
            >
              Explore All Shows
            </Link>
            <Link
              to="/about"
              className={`transition-colors ${pathname === '/about' ? 'text-white' : 'text-zinc-400 hover:text-zinc-300'}`}
            >
              About
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          {/* Search Input */}
          <div className="relative group hidden sm:block">
            <input
              type="text"
              placeholder="Titles, people, genres"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="bg-zinc-900/50 border border-zinc-700 text-white text-sm px-4 py-1.5 pl-10 rounded-sm focus:outline-none focus:ring-1 focus:ring-zinc-400 w-64 transition-all"
            />
            <svg className="w-4 h-4 absolute left-3 top-2.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>

          <select
            value={genreParam}
            onChange={handleGenreChange}
            className="bg-transparent text-zinc-300 text-sm hover:text-white cursor-pointer outline-none"
          >
            <option value="">All Categories</option>
            {genres.map(genre => (
              <option key={genre.id} value={genre.id.toString()} className="bg-zinc-900">{genre.name}</option>
            ))}
          </select>

          {/* Mobile Toggle Button */}
          <button
            className="lg:hidden text-zinc-300 hover:text-white transition-colors ml-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 pt-4 border-t border-zinc-800 flex flex-col gap-4 pb-2 animate-in slide-in-from-top-4 duration-200">
          {/* Mobile Search Input */}
          <div className="relative group block sm:hidden mb-2">
            <input
              type="text"
              placeholder="Search shows..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="bg-zinc-900/50 border border-zinc-700 text-white text-sm px-4 py-2 pl-10 rounded-sm focus:outline-none focus:ring-1 focus:ring-zinc-400 w-full transition-all"
            />
            <svg className="w-4 h-4 absolute left-3 top-3 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>

          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-lg font-semibold transition-colors ${pathname === '/' ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            Random Show Picker
          </Link>
          <Link
            to="/explore"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-lg font-semibold transition-colors ${pathname === '/explore' ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            Explore All Shows
          </Link>
          <Link
            to="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-lg font-semibold transition-colors ${pathname === '/about' ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            About
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;