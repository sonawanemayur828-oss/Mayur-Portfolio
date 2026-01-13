
import React from 'react';

interface FooterProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onManifestoClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode, onToggleTheme, onManifestoClick }) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 p-6 flex justify-between items-end w-full">
      <div className="glass-panel bg-gray-100/80 dark:bg-zinc-900/80 border border-gray-200 dark:border-zinc-800 rounded-full p-1 flex items-center shadow-lg transition-colors duration-300">
        <button 
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${isDarkMode ? 'text-white bg-zinc-700' : 'text-zinc-500 hover:text-black'}`}
          onClick={() => !isDarkMode && onToggleTheme()}
        >
          Dark
        </button>
        <button 
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${!isDarkMode ? 'text-black bg-white shadow-sm' : 'text-zinc-500 hover:text-white'}`}
          onClick={() => isDarkMode && onToggleTheme()}
        >
          Light
        </button>
      </div>

      <div 
        className="flex items-center space-x-3 group cursor-pointer"
        onClick={onManifestoClick}
      >
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors uppercase tracking-widest">
          Manifesto
        </span>
        <div className="w-10 h-10 rounded-full bg-white dark:bg-white text-black flex items-center justify-center shadow-lg transform group-hover:translate-y-1 transition-transform duration-300">
          <span className="material-icons text-sm">keyboard_arrow_down</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
