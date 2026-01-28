
import React, { useState } from 'react';
import { Heart, X } from 'lucide-react';
import { REASONS_I_LOVE_YOU } from '../constants';

export const LoveJar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentReason, setCurrentReason] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const pullReason = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const randomIndex = Math.floor(Math.random() * REASONS_I_LOVE_YOU.length);
    setCurrentReason(REASONS_I_LOVE_YOU[randomIndex]);
    setIsOpen(true);
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <>
      {/* Floating Jar Button */}
      <button 
        onClick={pullReason}
        className="fixed bottom-4 left-4 z-[60] w-14 h-14 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl flex items-center justify-center border-2 border-love-100 group active:scale-90 transition-transform"
      >
        <div className="relative">
          <svg viewBox="0 0 100 120" className="w-10 h-10 fill-love-50 overflow-visible stroke-love-200" strokeWidth="2">
             <path d="M 20 20 L 80 20 Q 90 20, 90 30 L 90 100 Q 90 115, 75 115 L 25 115 Q 10 115, 10 100 L 10 30 Q 10 20, 20 20 Z" fill="white" />
             <path d="M 25 10 L 75 10 L 75 22 L 25 22 Z" fill="var(--love-400)" />
             <Heart className="w-30 h-30 text-love-500 fill-love-200" style={{ transform: 'translate(30px, 45px) scale(1.5)' }} />
          </svg>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-love-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold animate-bounce">
            ?
          </div>
        </div>
      </button>

      {/* Pop-up Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fade-in">
          <div className="absolute inset-0 bg-love-900/60 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          
          <div className="relative bg-white rounded-3xl p-8 shadow-2xl max-w-xs w-full text-center border-4 border-love-100 animate-fade-in-up">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-love-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                <Heart className="text-white w-10 h-10 fill-white animate-pulse" />
            </div>
            
            <h3 className="font-handwriting text-3xl text-love-700 mb-4 mt-6">Reason #{(Math.floor(Math.random() * 365)) + 1}</h3>
            
            <div className="min-h-[80px] flex items-center justify-center">
              <p className="text-xl font-serif text-love-900 italic leading-relaxed">
                "{currentReason}"
              </p>
            </div>

            <button 
              onClick={() => setIsOpen(false)}
              className="mt-8 w-full py-3 bg-love-600 text-white rounded-xl font-bold hover:bg-love-700 shadow-md transition-colors"
            >
              I love you too!
            </button>
            
            <button 
              onClick={pullReason}
              className="mt-3 text-love-400 text-sm font-bold flex items-center justify-center gap-1 hover:text-love-600"
            >
              Give me another? <Heart size={12} fill="currentColor" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
