
import React from 'react';

const Hero: React.FC = () => {
  const firstName = "MAYUR".split("");
  const lastName = "SONAWANE".split("");

  return (
    <main className="relative z-20 flex flex-col items-center justify-center h-full w-full px-6 pointer-events-none">
      <style>{`
        @keyframes letterFadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
            filter: blur(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }
        .letter-anim {
          display: inline-block;
          opacity: 0;
          animation: letterFadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>

      <div className="relative text-center group flex flex-col items-center">
        {/* Central glow focus */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-indigo-500/5 dark:bg-zinc-100/5 blur-[120px] -z-10 rounded-full"></div>
        
        <div className="mb-6 opacity-0 animate-[fadeIn_1s_ease-out_forwards_0.2s]">
          <span className="text-[10px] md:text-xs tracking-[0.6em] uppercase text-zinc-500 dark:text-zinc-400 font-black">Design & Innovation</span>
        </div>
        
        <div className="relative flex flex-col items-center">
          <div className="flex flex-col items-center space-y-2">
            {/* First Name */}
            <h1 className="text-[14vw] md:text-[10vw] leading-[0.8] font-black tracking-tighter text-zinc-900 dark:text-zinc-100 select-none uppercase flex">
              {firstName.map((char, i) => (
                <span 
                  key={i} 
                  className="letter-anim"
                  style={{ animationDelay: `${0.1 * i}s` }}
                >
                  {char}
                </span>
              ))}
            </h1>

            {/* Last Name */}
            <h1 className="text-[14vw] md:text-[10vw] leading-[0.8] font-black tracking-tighter text-stroke dark:text-stroke text-zinc-300/30 dark:text-zinc-800/40 select-none uppercase flex">
              {lastName.map((char, i) => (
                <span 
                  key={i} 
                  className="letter-anim"
                  style={{ animationDelay: `${0.5 + (0.08 * i)}s` }}
                >
                  {char}
                </span>
              ))}
            </h1>
          </div>
          
          {/* Sub-header added below name */}
          <div className="mt-8 opacity-0 animate-[fadeIn_1.5s_ease-out_forwards_1.8s]">
            <span className="text-[4vw] md:text-[1.8vw] font-black tracking-[1.2em] uppercase text-zinc-900/10 dark:text-zinc-100/10 select-none">
              Creative Manager
            </span>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-8 opacity-0 animate-[fadeIn_1s_ease-out_forwards_2.2s] pointer-events-auto">
          <div className="inline-flex items-center space-x-3 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-2xl px-8 py-3 rounded-full border border-zinc-200/50 dark:border-zinc-800/50 shadow-xl transition-all hover:scale-105 cursor-pointer group">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 tracking-[0.2em] uppercase text-[10px]">Open for Innovation</span>
          </div>
          
          <p className="max-w-xs text-center text-zinc-400 dark:text-zinc-500 text-[11px] font-medium leading-relaxed uppercase tracking-widest px-4">
            Curating digital experiences through strategic management & creative vision.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Hero;
