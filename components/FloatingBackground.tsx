
import React, { useState, useEffect, useRef } from 'react';

interface LiquidBubbleProps {
  id: string;
  initialX: number;
  initialY: number;
  size: string;
  duration: number;
  delay: number;
  label: string;
  isSpecial?: boolean;
  onBurst: (id: string) => void;
  orbitRadius: number;
  orbitSpeed: number;
  index: number;
}

const LiquidBubble: React.FC<LiquidBubbleProps> = ({ 
  id, initialX, initialY, size, duration, delay, label, isSpecial, onBurst, orbitRadius, orbitSpeed, index
}) => {
  const [status, setStatus] = useState<'floating' | 'rupturing' | 'gone'>('floating');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const lifeSpan = 15000 + Math.random() * 20000;
    const timer = setTimeout(() => {
      setStatus('rupturing');
      if (audioRef.current) {
        audioRef.current.volume = 0.02;
        audioRef.current.play().catch(() => {});
      }
      setTimeout(() => {
        setStatus('gone');
        onBurst(id);
      }, 1500);
    }, lifeSpan);

    return () => clearTimeout(timer);
  }, [id, onBurst]);

  if (status === 'gone') return null;

  return (
    <div 
      className="absolute pointer-events-none group"
      style={{
        left: `${initialX}%`,
        top: `${initialY}%`,
        width: size,
        height: size,
        animation: `
          bubblePopIn 1.2s cubic-bezier(0.34, 1.7, 0.64, 1) forwards, 
          revolve ${orbitSpeed}s linear infinite,
          drift ${duration}s ease-in-out infinite alternate
        `,
        animationDelay: `${index * 0.15}s, -${delay}s, -${delay}s`,
        '--orbit-radius': `${orbitRadius}px`,
        opacity: 0, 
      } as any}
    >
      <audio ref={audioRef} src="https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3" />
      
      <div className={`relative w-full h-full flex items-center justify-center rounded-full border border-white/20 dark:border-zinc-700/40 backdrop-blur-md shadow-2xl transition-all duration-1000 
        ${status === 'rupturing' ? 'scale-[1.6] opacity-0 blur-xl animate-fadeOut' : 'opacity-80 scale-100'} 
        ${isSpecial ? 'bg-indigo-500/10' : 'bg-white/5'}`}>
        
        <span className={`font-black uppercase tracking-[0.2em] text-zinc-400 text-[8px] md:text-[9px] text-center px-2 leading-tight transition-opacity duration-700 group-hover:text-white ${isSpecial ? 'text-indigo-300' : ''}`} style={{ opacity: status === 'rupturing' ? 0 : 1 }}>
          {label}
        </span>

        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-40"></div>
        
        {status === 'rupturing' && (
          <>
            <div className="absolute inset-0 animate-ripple border border-indigo-400/30 rounded-full"></div>
            {[...Array(6)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full animate-particleBurst"
                style={{
                  top: '50%',
                  left: '50%',
                  '--tx': `${(Math.random() - 0.5) * 180}px`,
                  '--ty': `${(Math.random() - 0.5) * 180}px`,
                } as any}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

const FloatingBackground: React.FC<{ onCategorySelect?: (cat: string) => void; isDimmed?: boolean; }> = ({ isDimmed }) => {
  const initialData = [
    { label: "Visual Design", size: "4.8rem", x: 25, y: 25, duration: 18, delay: 0, orbitRadius: 70, orbitSpeed: 40, isSpecial: true },
    { label: "Motion", size: "4.2rem", x: 70, y: 20, duration: 22, delay: 5, orbitRadius: 80, orbitSpeed: 45 },
    { label: "CGI", size: "4rem", x: 45, y: 15, duration: 20, delay: 2, orbitRadius: 50, orbitSpeed: 35 },
    { label: "AI", size: "4.4rem", x: 15, y: 60, duration: 24, delay: 8, orbitRadius: 90, orbitSpeed: 50, isSpecial: true },
    { label: "Adobe Photoshop", size: "5.2rem", x: 75, y: 55, duration: 28, delay: 12, orbitRadius: 75, orbitSpeed: 55 },
    { label: "Illustrator", size: "5rem", x: 35, y: 75, duration: 26, delay: 15, orbitRadius: 100, orbitSpeed: 42 },
    { label: "After Effects", size: "5.4rem", x: 60, y: 78, duration: 24, delay: 18, orbitRadius: 110, orbitSpeed: 48, isSpecial: true },
    { label: "Indesign", size: "4.6rem", x: 55, y: 40, duration: 22, delay: 10, orbitRadius: 60, orbitSpeed: 38 },
  ];

  const [bubbles, setBubbles] = useState(() => 
    initialData.map((b, i) => ({
      ...b,
      id: `bub-${i}-${Math.random().toString(36).substr(2, 5)}`
    }))
  );

  const handleBurst = (id: string) => {
    setBubbles(prev => {
      const target = prev.find(b => b.id === id);
      if (!target) return prev;
      const respawned = {
        ...target,
        id: `bub-${Math.random().toString(36).substr(2, 5)}`,
        x: target.x + (Math.random() - 0.5) * 5,
        y: target.y + (Math.random() - 0.5) * 5,
        delay: Math.random() * 20
      };
      return [...prev.filter(b => b.id !== id), respawned];
    });
  };

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505] transition-all duration-[2000ms] ${isDimmed ? 'opacity-10 blur-3xl scale-110' : 'opacity-100'}`}>
      <style>{`
        @keyframes bubblePopIn {
          0% { transform: scale(0) rotate(-15deg); opacity: 0; filter: blur(5px); }
          50% { transform: scale(1.1) rotate(5deg); opacity: 0.8; filter: blur(2px); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; filter: blur(0px); }
        }
        @keyframes fadeOut {
          0% { opacity: 0.8; filter: blur(0); }
          100% { opacity: 0; filter: blur(20px); transform: scale(1.5); }
        }
        @keyframes revolve {
          from { transform: rotate(0deg) translateX(var(--orbit-radius)) rotate(0deg); }
          to { transform: rotate(360deg) translateX(var(--orbit-radius)) rotate(-360deg); }
        }
        @keyframes drift {
          0% { margin-top: 0px; margin-left: 0px; }
          100% { margin-top: 15px; margin-left: 10px; }
        }
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 0.6; }
          100% { transform: scale(3.5); opacity: 0; }
        }
        @keyframes particleBurst {
          0% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
        }
        .animate-fadeOut { animation: fadeOut 1.5s ease-out forwards; }
        .animate-ripple { animation: ripple 1.4s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; }
        .animate-particleBurst { animation: particleBurst 0.9s ease-out forwards; }
      `}</style>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.03)_0%,transparent_70%)]"></div>
      {bubbles.map((bubble, idx) => (
        <LiquidBubble key={bubble.id} {...bubble} index={idx} initialX={bubble.x} initialY={bubble.y} onBurst={handleBurst} />
      ))}
    </div>
  );
};

export default FloatingBackground;
