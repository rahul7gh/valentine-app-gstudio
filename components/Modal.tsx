import React, { useState, useEffect } from 'react';
import { DayData, DayState } from '../types';
import { Loader } from './Loader';
import { GENERIC_MESSAGES, FIRST_TIME_MESSAGES } from '../constants';
import { X, Heart, Mail } from 'lucide-react';

interface ModalProps {
  day: DayData;
  isOpen: boolean;
  onClose: (emoji: string | React.ReactNode) => void;
  dayState: DayState;
}

export const Modal: React.FC<ModalProps> = ({ day, isOpen, onClose, dayState }) => {
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0); 
  const [loadingMessage, setLoadingMessage] = useState("");
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      
      setLoading(true);
      setStep(0);
      setIsClosing(false);
      
      if (dayState === DayState.OPENED) {
         const randomMsg = GENERIC_MESSAGES[Math.floor(Math.random() * GENERIC_MESSAGES.length)];
         setLoadingMessage(randomMsg);
      } else {
         setLoadingMessage(FIRST_TIME_MESSAGES.loading);
      }

      const timer = setTimeout(() => {
        setLoading(false);
      }, 2500);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'unset';
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, dayState]);

  const handleClose = () => {
    setIsClosing(true);
    // Wait for fade-out animation before unmounting
    setTimeout(() => {
      onClose(day.emoji);
    }, 300);
  };

  if (!isOpen) return null;

  if (loading) {
    return <Loader message={loadingMessage} />;
  }

  const renderRevealEmoji = () => {
    if (typeof day.emoji === 'string') {
        return (
            <span className="text-5xl select-none" style={{ color: 'transparent', textShadow: '0 0 0 var(--love-600)' }}>
                {day.emoji}
            </span>
        );
    } else {
        return (
            <div className="w-12 h-12 text-love-600 fill-current">
                {day.emoji}
            </div>
        );
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isClosing ? 'animate-fade-out' : 'animate-fade-in-up'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-love-900/40 backdrop-blur-sm transition-opacity duration-500"
        onClick={handleClose}
      ></div>

      {/* Modal Card */}
      <div className="custom-modal-card relative w-full max-w-sm bg-love-50 rounded-3xl shadow-2xl overflow-hidden border-2 border-love-100 flex flex-col max-h-[90vh]">
        
        {/* Header Decor (Slide 1) */}
        <div className={`h-24 bg-gradient-to-b from-love-400 to-love-600 relative shrink-0 z-20 transition-all duration-500 ${step === 1 ? '-mt-24 opacity-0' : 'opacity-100'}`}>
             {/* Decorative Circles */}
             <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white to-transparent"></div>
             
             {/* Icon Badge */}
             <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-love-50 rounded-full flex items-center justify-center border-4 border-love-50 z-10 shadow-sm">
                 <div className="bg-love-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-love-500 fill-love-500 animate-pulse" />
                 </div>
             </div>
             
             {/* Close button */}
             <button 
                onClick={handleClose}
                className="absolute top-3 right-3 p-1 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors z-20"
             >
                <X className="w-5 h-5" />
             </button>
        </div>

        {/* Content Container (Sliding) */}
        <div className="flex-1 overflow-hidden relative"> 
          <div 
              className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]" 
              style={{ transform: `translateX(-${step * 100}%)` }}
          >
              {/* --- SLIDE 1: Sticker, Cite & Emoji Trigger --- */}
              <div className="w-full h-full flex-shrink-0 overflow-y-auto overscroll-contain pt-10">
                   <div className="min-h-full p-6 flex flex-col items-center text-center">
                       {/* Sticker Container */}
                       <div className="w-full h-56 rounded-2xl flex items-center justify-center mb-4 relative flex-shrink-0">
                          <img 
                             src={day.view1.gifUrl} 
                             alt="Sticker" 
                             className="w-full h-full object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300" 
                          />
                       </div>
                       
                       {/* Quote Card */}
                       <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-love-100 shadow-sm mb-4 w-full transform rotate-1 hover:rotate-0 transition-transform duration-300">
                          <p className="font-handwriting text-2xl text-love-800 leading-relaxed drop-shadow-sm">
                            "{day.view1.citeText}"
                          </p>
                       </div>

                       {/* Emoji Interaction Button */}
                       <div className="mt-auto py-2 mb-2 w-full flex justify-center">
                          <button 
                            onClick={() => setStep(1)} 
                            className="relative group cursor-pointer outline-none touch-manipulation"
                            aria-label="Open Surprise"
                          >
                              {/* Pulsing effects */}
                              <div className="absolute inset-0 bg-love-500 rounded-full animate-ping opacity-20 duration-1000"></div>
                              <div className="absolute -inset-2 bg-love-300 rounded-full opacity-30 animate-pulse"></div>
                              
                              {/* Button Itself */}
                              <div className="relative w-20 h-20 bg-white border-4 border-love-200 rounded-full flex items-center justify-center shadow-xl transform transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
                                 {renderRevealEmoji()}
                              </div>

                              {/* Hint */}
                              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-love-600 font-bold font-handwriting text-xl whitespace-nowrap animate-bounce">
                                Tap to Open!
                              </span>
                          </button>
                       </div>
                   </div>
              </div>

              {/* --- SLIDE 2: Love Letter View --- */}
              <div className="w-full h-full flex-shrink-0 overflow-y-auto overscroll-contain bg-love-50 relative transition-colors duration-500">
                 <div className="min-h-full flex flex-col p-8 pb-10">
                    
                    {/* Paper Texture Overlay (Theme Adaptive) */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, var(--love-200) 0, var(--love-200) 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px' }}></div>
                    
                    {/* Postal Stamp Decoration */}
                    <div className="absolute top-5 right-5 w-16 h-16 border-2 border-love-300 rounded-full flex items-center justify-center opacity-60 rotate-12 pointer-events-none select-none">
                       <div className="text-[10px] text-center font-bold text-love-800 leading-none uppercase">
                          {day.date}<br/>Love<br/>Post
                       </div>
                    </div>
                    
                    {/* Header */}
                    <div className="mb-6 relative z-10">
                        <h2 className="font-handwriting text-3xl text-love-800">My Dearest,</h2>
                    </div>

                    {/* Image Attachment (Taped Photo Style) */}
                    <div className="relative self-center mb-8 rotate-[-2deg] z-10 transform hover:scale-105 transition-transform duration-500">
                        {/* Washi Tape */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-love-200/50 backdrop-blur-sm rotate-1 shadow-sm"></div>
                        <img 
                           src={day.view2.image} 
                           alt="Memory" 
                           className="w-56 rounded-lg border-4 border-white shadow-lg"
                        />
                    </div>

                    {/* Letter Body */}
                    <div className="flex-1 z-10">
                        <p className="font-serif text-lg leading-loose text-love-900/90 italic drop-shadow-sm">
                           {day.view2.text}
                        </p>
                    </div>

                    {/* Footer Signature */}
                    <div className="mt-8 self-end z-10">
                        <p className="font-handwriting text-2xl text-love-600">Yours Forever,</p>
                    </div>

                    {/* Action Button - High Contrast Fix */}
                    <button 
                        onClick={handleClose}
                        className="mt-10 mx-auto flex items-center gap-2 px-6 py-3 bg-love-600 hover:bg-love-700 text-white rounded-full shadow-lg shadow-love-900/20 transform active:scale-95 transition-all group z-20 border-2 border-transparent hover:border-love-300"
                    >
                        <Mail className="w-4 h-4" />
                        <span className="font-bold text-sm tracking-wide">Keep in Heart</span>
                    </button>

                 </div>
              </div>
          </div>
        </div>

      </div>
    </div>
  );
};