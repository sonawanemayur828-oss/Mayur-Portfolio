
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface ManifestoModalProps {
  onClose: () => void;
}

const ManifestoModal: React.FC<ManifestoModalProps> = ({ onClose }) => {
  const [manifesto, setManifesto] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const generateManifesto = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: "Write a short, poetic, 3-sentence designer manifesto for Mayur Sonawane, a Creative Manager. Focus on the intersection of strategic management, brutalist aesthetics, and digital innovation. No titles, just the content.",
          config: {
            temperature: 0.9,
            maxOutputTokens: 150,
          }
        });
        setManifesto(response.text || 'Management is the art of invisible structures; design is the soul that fills them.');
      } catch (error) {
        setManifesto('True design management is about finding harmony between the rigorous logic of a grid and the chaotic beauty of human emotion.');
      } finally {
        setLoading(false);
      }
    };

    generateManifesto();
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xl transition-opacity duration-500"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10 overflow-hidden group">
        <div className="absolute top-0 right-0 p-6">
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          >
            <span className="material-icons text-lg">close</span>
          </button>
        </div>

        <div className="space-y-6">
          <div className="text-xs tracking-[0.3em] uppercase text-zinc-400 dark:text-zinc-500 font-bold">
            The Manifesto of Mayur Sonawane
          </div>
          
          {loading ? (
            <div className="space-y-4 py-8">
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-full w-full animate-pulse"></div>
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-full w-5/6 animate-pulse"></div>
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-full w-4/6 animate-pulse"></div>
            </div>
          ) : (
            <p className="text-2xl md:text-3xl font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed animate-fadeIn">
              "{manifesto}"
            </p>
          )}

          <div className="pt-8 flex items-center gap-4">
             <div className="w-12 h-[1px] bg-zinc-300 dark:bg-zinc-700"></div>
             <span className="text-xs italic text-zinc-500">Curated by Intelligence</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManifestoModal;
