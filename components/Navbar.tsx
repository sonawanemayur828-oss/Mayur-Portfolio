
import React from 'react';

interface NavbarProps {
  onCategorySelect: (cat: string) => void;
  onHomeClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCategorySelect, onHomeClick }) => {
  const navItems = [
    { label: 'Rich Media', id: 'rich-media' },
    { label: 'Banners', id: 'banners' },
    { label: 'Timb', id: 'timb' },
    { label: 'Social', id: 'social-media' },
    { label: 'Wallpapers', id: 'wallpapers' },
    { label: 'Marketing', id: 'marketing' },
  ];

  return (
    <nav className="fixed top-6 left-0 right-0 z-[60] flex justify-center w-full px-4">
      <div className="glass-panel bg-white/70 dark:bg-zinc-900/60 border border-gray-200/50 dark:border-zinc-800/50 rounded-full px-2 py-1.5 flex items-center shadow-lg transition-all duration-300">
        <button 
          onClick={onHomeClick}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 transition-transform active:scale-90"
        >
          <span className="material-icons text-[18px]">home</span>
        </button>
        
        <div className="hidden lg:flex items-center space-x-1 px-4 text-[11px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onCategorySelect(item.id)}
              className="px-3 py-2 rounded-full hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2 ml-2">
          <button className="px-5 py-2 text-[10px] font-black uppercase tracking-widest text-white dark:text-black bg-zinc-900 dark:bg-white rounded-full hover:opacity-90 transition-opacity shadow-sm">
            Connect
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
