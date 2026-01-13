
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import FloatingBackground from './components/FloatingBackground';
import ManifestoModal from './components/ManifestoModal';
import ProjectGrid from './components/ProjectGrid';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isManifestoOpen, setIsManifestoOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    if (activeCategory) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [activeCategory]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`relative w-full min-h-screen transition-colors duration-700 ${activeCategory ? 'overflow-y-auto' : 'h-screen overflow-hidden'}`}>
      <FloatingBackground 
        onCategorySelect={(cat) => setActiveCategory(cat)} 
        isDimmed={!!activeCategory} 
      />
      
      <Navbar onCategorySelect={(cat) => setActiveCategory(cat)} onHomeClick={() => setActiveCategory(null)} />

      {activeCategory ? (
        <ProjectGrid category={activeCategory} onBack={() => setActiveCategory(null)} />
      ) : (
        <Hero />
      )}

      <Footer 
        isDarkMode={isDarkMode} 
        onToggleTheme={toggleTheme} 
        onManifestoClick={() => setIsManifestoOpen(true)}
      />

      {isManifestoOpen && (
        <ManifestoModal onClose={() => setIsManifestoOpen(false)} />
      )}
    </div>
  );
};

export default App;
