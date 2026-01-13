
import React, { useState } from 'react';

interface Project {
  title: string;
  desc: string;
  img: string | string[]; // Can be a single image or an array for carousel
  tags: string[];
  link?: string;
}

interface ProjectGridProps {
  category: string;
  onBack: () => void;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ category, onBack }) => {
  const [carouselIndices, setCarouselIndices] = useState<Record<number, number>>({});

  const getProjects = (cat: string): Project[] => {
    switch(cat) {
      case 'timb':
        return [
          { 
            title: "Hair Essentials", 
            desc: "The core ritual. Comprehensive hair care range featuring plant-based keratin, protein shampoo and nourishing conditioners.", 
            img: [
              "https://r.jina.ai/i/61f2249e088147d394e505cc334586f3", 
              "https://r.jina.ai/i/357870ea45374e20986685718a385417", 
              "https://r.jina.ai/i/e0064560946d43528b1897c88b9015c9", 
              "https://r.jina.ai/i/381735e58129486bb78891df01053cf3"  
            ], 
            tags: ["Branding", "Carousel", "Ritual"] 
          },
          { 
            title: "New Year Glow", 
            desc: "Campaign visuals for the seasonal skin transformation collection.", 
            img: "https://r.jina.ai/i/524bc7e4c93f443588924b1239f8602b", 
            tags: ["Campaign", "Glow", "Social"] 
          },
          { 
            title: "Nature's Goodness", 
            desc: "Pure self-care manifesto highlighting toxin-free ingredients.", 
            img: "https://r.jina.ai/i/917a151b745446059b02a76f23512b7a", 
            tags: ["Philosophy", "Organic", "Design"] 
          },
          { 
            title: "Family Care", 
            desc: "Calendula body butter perfect for deep hydration for all ages.", 
            img: "https://r.jina.ai/i/ef0363228d6c46a6839a957813a07675", 
            tags: ["Hydration", "Natural", "Skin"] 
          }
        ];
      case 'rich-media':
        return [
          { 
            title: "Hocco", 
            desc: "Immersive engagement experience featuring interactive animations and gamified elements.", 
            img: "https://res.cloudinary.com/dfpw3illt/image/upload/v1768285625/Hocco_ewjnlw.jpg", 
            tags: ["Game", "Animation", "Engagement"],
            link: "https://demo.adgebra.in/custom/demos/adg_spark/Hocco.html"
          },
          { 
            title: "Nerolac Spark", 
            desc: "Digital color experience with interactive paint flows.", 
            img: "https://res.cloudinary.com/dfpw3illt/image/upload/v1768285943/Nerolac_r3qzot.jpg", 
            tags: ["Color", "Interactive", "Web"],
            link: "https://demo.adgebra.in/custom/demos/adg_spark/Nerolac_New.html"
          },
          { 
            title: "Dream Leap", 
            desc: "Interactive 3D storytelling through mobile immersion.", 
            img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1080&auto=format&fit=crop", 
            tags: ["Interactive", "3D", "Storytelling"],
            link: "https://demo.adgebra.in/custom/demos/adg_spark/Hocco.html"
          }
        ];
      case 'banners':
        return [
          { 
            title: "Zenith Apparel", 
            desc: "Brutalist web banners for high-end fashion launch.", 
            img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1080&auto=format&fit=crop", 
            tags: ["Fashion", "Layout", "Digital"] 
          },
          { 
            title: "Architectural Grid", 
            desc: "Display ads for sustainable living concepts and urban design.", 
            img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1080&auto=format&fit=crop", 
            tags: ["Sustainable", "Ads", "Grid"] 
          },
          { 
            title: "Neon Pulse", 
            desc: "Vibrant E-commerce sale campaigns for tech and lifestyle.", 
            img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1080&auto=format&fit=crop", 
            tags: ["E-comm", "Vibrant", "Retail"] 
          }
        ];
      case 'social-media':
        return [
          { 
            title: "Vanguard Stories", 
            desc: "Instagram immersive narrative design for creators.", 
            img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1080&auto=format&fit=crop", 
            tags: ["Instagram", "Stories", "Design"] 
          },
          { 
            title: "Content Flux", 
            desc: "Dynamic social feed branding for the digital age.", 
            img: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1080&auto=format&fit=crop", 
            tags: ["Social", "Branding", "Motion"] 
          }
        ];
      case 'wallpapers':
        return [
          { 
            title: "Obsidian Peak", 
            desc: "4K abstract render for workspace setup.", 
            img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1080&auto=format&fit=crop", 
            tags: ["4K", "Abstract", "Desktop"] 
          },
          { 
            title: "Ether Flow", 
            desc: "Soft-gradient textures for mobile devices.", 
            img: "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1080&auto=format&fit=crop", 
            tags: ["Gradient", "Texture", "Mobile"] 
          }
        ];
      case 'marketing':
        return [
          { 
            title: "Growth Strategy", 
            desc: "Data-driven marketing visuals for tech startups.", 
            img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1080&auto=format&fit=crop", 
            tags: ["Strategy", "Growth", "Analytics"] 
          },
          { 
            title: "Brand Identity", 
            desc: "Full-scale marketing collateral for global brands.", 
            img: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1080&auto=format&fit=crop", 
            tags: ["Identity", "Marketing", "Collateral"] 
          }
        ];
      default:
        return [];
    }
  };

  const projects = getProjects(category);
  const displayTitle = category.replace('-', ' ').toUpperCase();

  const nextSlide = (e: React.MouseEvent, idx: number, max: number) => {
    e.stopPropagation();
    setCarouselIndices(prev => ({
      ...prev,
      [idx]: (prev[idx] === undefined ? 0 : prev[idx] + 1) % max
    }));
  };

  const prevSlide = (e: React.MouseEvent, idx: number, max: number) => {
    e.stopPropagation();
    setCarouselIndices(prev => ({
      ...prev,
      [idx]: (prev[idx] === undefined ? 0 : prev[idx] - 1 + max) % max
    }));
  };

  const handleProjectClick = (link?: string) => {
    if (link) {
      window.open(link, '_blank');
    }
  };

  return (
    <div className="relative z-40 pt-32 pb-24 px-6 md:px-12 animate-fadeIn max-w-7xl mx-auto">
      <div className="mb-16 flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-8 gap-6">
        <div className="space-y-2">
          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-zinc-400 dark:text-zinc-500 block">Curated Work</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-100">{displayTitle}</h2>
        </div>
        <button 
          onClick={onBack}
          className="group self-start md:self-center flex items-center gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-8 py-4 rounded-full hover:bg-zinc-900 dark:hover:bg-white hover:text-white dark:hover:text-black transition-all shadow-xl"
        >
          <span className="material-icons text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
          <span className="text-[11px] font-black uppercase tracking-widest">Back to Space</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((p, idx) => {
          const isCarousel = Array.isArray(p.img);
          const currentIdx = carouselIndices[idx] || 0;
          const currentImg = isCarousel ? p.img[currentIdx] : p.img;

          return (
            <div 
              key={idx} 
              onClick={() => handleProjectClick(p.link)}
              className={`group relative bg-white dark:bg-zinc-900 rounded-[3rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:border-indigo-500/30 hover:shadow-[0_40px_80px_-15px_rgba(79,70,229,0.2)] ${p.link ? 'cursor-pointer' : ''}`}
            >
              <div className="aspect-[3/4] overflow-hidden bg-zinc-100 dark:bg-zinc-800 relative">
                {isCarousel && (
                  <>
                    <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between px-4 pointer-events-none">
                      <button 
                        onClick={(e) => prevSlide(e, idx, p.img.length)}
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/40 transition-colors pointer-events-auto"
                      >
                        <span className="material-icons">chevron_left</span>
                      </button>
                      <button 
                        onClick={(e) => nextSlide(e, idx, p.img.length)}
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/40 transition-colors pointer-events-auto"
                      >
                        <span className="material-icons">chevron_right</span>
                      </button>
                    </div>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                      {(p.img as string[]).map((_, dotIdx) => (
                        <div 
                          key={dotIdx} 
                          className={`h-1 rounded-full transition-all duration-300 ${dotIdx === currentIdx ? 'w-4 bg-white' : 'w-1 bg-white/40'}`}
                        />
                      ))}
                    </div>
                  </>
                )}

                <img 
                  src={currentImg as string} 
                  alt={p.title} 
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110" 
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10 backdrop-blur-[2px]">
                  <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {p.tags.map((tag, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="text-[9px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0"
                          style={{ transitionDelay: `${0.1 + (tIdx * 0.1)}s` }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-zinc-900 shadow-2xl transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 delay-300">
                      <span className="material-icons text-2xl">{p.link ? 'open_in_new' : isCarousel ? 'swipe' : 'arrow_forward'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-10 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {p.title}
                    </h3>
                    <div className="h-1 w-0 group-hover:w-full bg-indigo-500 transition-all duration-500 rounded-full"></div>
                  </div>
                  <span className="material-icons text-zinc-300 dark:text-zinc-700 group-hover:text-indigo-500 transition-colors">{p.link ? 'open_in_new' : 'north_east'}</span>
                </div>
                <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                  {p.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectGrid;
