import { Routes, Route, useSearchParams } from 'react-router-dom';
import Navbar from './components/NavBar';
import HomeGallery from './components/HomeGallery';
import RouletteScreen from './components/RouletteScreen';
import About from './components/About';
import Footer from './components/Footer';
import { useShows } from './hooks/useShows';
import { useRoulette } from './hooks/useRoulette';

function App() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const genreId = searchParams.get('genre') || '';

  // Lifted state! These stay alive even when pages change
  const galleryState = useShows(query, genreId);
  const rouletteState = useRoulette();
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      <Navbar />

      <main className="px-4 md:px-12 py-8 flex-grow">
        <Routes>
          <Route path="/" element={<RouletteScreen spin={rouletteState.spin} loading={rouletteState.loading} />} />
          <Route path="/explore" element={<HomeGallery {...galleryState} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;