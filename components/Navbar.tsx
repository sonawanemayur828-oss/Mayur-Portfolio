
import React, { useState, useRef, useEffect } from 'react';

interface NavbarProps {
  onCategorySelect: (cat: string) => void;
  onHomeClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCategorySelect, onHomeClick }) => {
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: 'Rich Media', id: 'rich-media' },
    { label: 'Banners', id: 'banners' },
    { label: 'Branding', id: 'branding' },
    { label: 'Social', id: 'social-media' },
    { label: 'Wallpapers', id: 'wallpapers' },
    { label: 'Marketing', id: 'marketing' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsConnectOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

        <div className="relative flex items-center ml-2" ref={dropdownRef}>
          <button 
            onClick={() => setIsConnectOpen(!isConnectOpen)}
            className="px-5 py-2 text-[10px] font-black uppercase tracking-widest text-white dark:text-black bg-zinc-900 dark:bg-white rounded-full hover:opacity-90 transition-opacity shadow-sm flex items-center gap-2"
          >
            Connect
            <span className={`material-icons text-[14px] transition-transform duration-300 ${isConnectOpen ? 'rotate-180' : ''}`}>expand_more</span>
          </button>

          {isConnectOpen && (
            <div className="absolute top-full mt-3 right-0 w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-2 animate-fadeIn overflow-hidden">
              <a 
                href="mailto:sonawnemayur828@gmail.com"
                className="flex items-center gap-3 p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-zinc-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-all">
                  <span className="material-icons text-sm">mail</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-wider text-zinc-400">Gmail</span>
                  <span className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200 truncate">sonawnemayur828@gmail.com</span>
                </div>
              </a>

              <a 
                href="tel:+919561787649"
                className="flex items-center gap-3 p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-zinc-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-all">
                  <span className="material-icons text-sm">phone</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-wider text-zinc-400">Mobile</span>
                  <span className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200">+91 9561787649</span>
                </div>
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
