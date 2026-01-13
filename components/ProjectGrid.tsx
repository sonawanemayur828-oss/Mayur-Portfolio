
import React, { useState } from 'react';

interface Project {
  title: string;
  desc: string;
  img: string | string[];
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
      case 'branding':
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
          }
        ];
      case 'banners':
        return [
          { title: "Zenith Apparel", desc: "Brutalist web banners for high-end fashion launch.", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1080&auto=format&fit=crop", tags: ["Fashion", "Layout", "Digital"] }
        ];
      case 'social-media':
        return [
          { title: "Vanguard Stories", desc: "Instagram immersive narrative design for creators.", img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1080&auto=format&fit=crop", tags: ["Instagram", "Stories", "Design"] }
        ];
      default:
        return [];
    }
  };

  const projects = getProjects(category);
  const displayTitle = category.replace('-', ' ').toUpperCase();

  return (
    <div className="relative z-40 pt-32 pb-24 px-6 md:px-12 animate-fadeIn max-w-7xl mx-auto">
      <div className="mb-16 flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-8 gap-6">
        <div className="space-y-2">
          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-zinc-400 dark:text-zinc-500 block">Curated Work</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-100">{displayTitle}</h2>
        </div>
        <button onClick={onBack} className="group flex items-center gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-8 py-4 rounded-full hover:bg-zinc-900 dark:hover:bg-white hover:text-white dark:hover:text-black transition-all shadow-xl">
          <span className="material-icons text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
          <span className="text-[11px] font-black uppercase tracking-widest">Back to Space</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((p, idx) => (
          <div key={idx} onClick={() => p.link && window.open(p.link, '_blank')} className={`group relative bg-white dark:bg-zinc-900 rounded-[3rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl transition-all duration-500 hover:-translate-y-4 ${p.link ? 'cursor-pointer' : ''}`}>
            <div className="aspect-[3/4] overflow-hidden bg-zinc-100 dark:bg-zinc-800 relative">
              <img src={Array.isArray(p.img) ? p.img[0] : p.img} alt={p.title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[9px] font-black uppercase tracking-wider bg-white/20 text-white px-3 py-1.5 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-10 space-y-4">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{p.title}</h3>
              <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectGrid;
