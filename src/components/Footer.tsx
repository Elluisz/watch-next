import { FolderGit2, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full py-8 mt-auto border-t border-zinc-800/50 text-zinc-500 text-sm flex flex-col sm:flex-row items-center justify-center gap-4 bg-black/50 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <span>Developed by</span>
        <span className="text-zinc-300 font-medium tracking-wide">Juan Torrez</span>
      </div>

      <span className="hidden sm:inline text-zinc-700">|</span>

      <div className="flex items-center gap-4">
        {/* Replace the href with your actual portfolio link */}
        <a
          href="https://www.juanluist.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-white transition-colors duration-300 group"
        >
          <Globe size={16} className="group-hover:text-blue-400 transition-colors" />
          <span>Check out my website!</span>
        </a>
        <a
          href="https://github.com/Elluisz/watch-next"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-white transition-colors duration-300 group"
        >
          <FolderGit2 size={16} className="group-hover:text-purple-400 transition-colors" />
          <span>GitHub</span>
        </a>
      </div>
    </footer>
  );
}
