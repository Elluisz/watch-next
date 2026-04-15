import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
      tailwindcss()
    ],
    server: {
      proxy: {
        '/api/tmdb': {
          target: 'https://api.themoviedb.org/3',
          changeOrigin: true,
          rewrite: (path) => {
            const newPath = path.replace(/^\/api\/tmdb/, '');
            const separator = newPath.includes('?') ? '&' : '?';
            return `${newPath}${separator}api_key=${env.VITE_TMDB_API_KEY}`;
          }
        }
      }
    }
  }
})