
import React, { useState, useEffect } from 'react';
import { DayData, DayState } from '../types';
import { Loader } from './Loader';
import { GENERIC_MESSAGES, FIRST_TIME_MESSAGES } from '../constants';
import { X, Heart, Mail, Sparkles, Mic, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { Confetti } from './Confetti';
import { GeminiPoet } from './GeminiPoet';

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
  const [showConfetti, setShowConfetti] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setLoading(true);
      setStep(0);
      setIsClosing(false);
      setShowConfetti(false);
      setCarouselIndex(0);
      
      if (dayState === DayState.OPENED) {
         setLoadingMessage(GENERIC_MESSAGES[Math.floor(Math.random() * GENERIC_MESSAGES.length)]);
      } else {
         setLoadingMessage(FIRST_TIME_MESSAGES.loading);
      }

      const timer = setTimeout(() => {
        setLoading(false);
        if (dayState === DayState.UNLOCKED) setShowConfetti(true);
      }, 2000);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, dayState]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(day.emoji), 300);
  };

  if (!isOpen) return null;
  if (loading) return <Loader message={loadingMessage} />;

  const renderRevealEmoji = () => {
    if (typeof day.emoji === 'string') {
        return <span className="text-5xl select-none" style={{ color: 'transparent', textShadow: '0 0 0 var(--love-600)' }}>{day.emoji}</span>;
    }
    return <div className="w-12 h-12 text-love-600 fill-current">{day.emoji}</div>;
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isClosing ? 'animate-fade-out' : 'animate-fade-in-up'}`}>
      <div className="absolute inset-0 bg-love-900/40 backdrop-blur-sm" onClick={handleClose}></div>

      <div className="custom-modal-card relative w-full max-w-sm bg-love-50 rounded-3xl shadow-2xl overflow-hidden border-2 border-love-100 flex flex-col max-h-[90vh]">
        {showConfetti && <Confetti primaryColor="var(--love-500)" count={100} />}

        <div className={`h-24 bg-gradient-to-b from-love-400 to-love-600 relative shrink-0 z-20 transition-all duration-500 ${step === 1 ? '-mt-24 opacity-0' : 'opacity-100'}`}>
             <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-love-50 rounded-full flex items-center justify-center border-4 border-love-50 z-10 shadow-sm">
                 <div className="bg-love-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-love-500 fill-love-500 animate-pulse" />
                 </div>
             </div>
             <button onClick={handleClose} className="absolute top-3 right-3 p-1 rounded-full bg-white/20 text-white hover:bg-white/40"><X className="w-5 h-5" /></button>
        </div>

        <div className="flex-1 overflow-hidden relative"> 
          <div className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]" style={{ transform: `translateX(-${step * 100}%)` }}>
              
              {/* SLIDE 1 */}
              <div className="w-full h-full flex-shrink-0 overflow-y-auto pt-10 px-6">
                   <div className="flex flex-col items-center text-center">
                       <div className="w-full h-56 rounded-2xl flex items-center justify-center mb-4 relative">
                          <img src={day.view1.gifUrl} alt="Sticker" className="w-full h-full object-contain drop-shadow-xl" />
                       </div>
                       <div className="bg-white/80 p-4 rounded-2xl border border-love-100 shadow-sm mb-8">
                          <p className="font-handwriting text-2xl text-love-800 leading-relaxed italic">"{day.view1.citeText}"</p>
                       </div>
                       <button onClick={() => setStep(1)} className="relative group w-20 h-20 bg-white border-4 border-love-200 rounded-full flex items-center justify-center shadow-xl transform transition-transform hover:scale-110 active:scale-95 mb-10">
                          {renderRevealEmoji()}
                          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-love-600 font-bold font-handwriting text-xl whitespace-nowrap animate-bounce">Open Me!</span>
                       </button>
                   </div>
              </div>

              {/* SLIDE 2 */}
              <div className="w-full h-full flex-shrink-0 overflow-y-auto bg-love-50 relative p-6">
                 <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-start">
                        <h2 className="font-handwriting text-3xl text-love-800">My Dearest,</h2>
                        <div className="w-12 h-12 border-2 border-love-200 rounded-full flex items-center justify-center opacity-40 rotate-12">
                            <span className="text-[8px] font-bold text-love-800 uppercase text-center">{day.date}<br/>L-POST</span>
                        </div>
                    </div>

                    {/* Image Carousel */}
                    <div className="relative group">
                        <div className="overflow-hidden rounded-2xl border-4 border-white shadow-lg relative aspect-[4/5] bg-love-100">
                             {day.view2.images.map((img, idx) => (
                                 <img 
                                    key={idx} 
                                    src={img} 
                                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${idx === carouselIndex ? 'opacity-100' : 'opacity-0'}`} 
                                    alt="Memory" 
                                 />
                             ))}
                             {/* Carousel Controls */}
                             {day.view2.images.length > 1 && (
                                 <div className="absolute bottom-2 right-2 flex gap-1">
                                     {day.view2.images.map((_, i) => (
                                         <div key={i} className={`h-1.5 w-1.5 rounded-full ${i === carouselIndex ? 'bg-white w-4' : 'bg-white/40'} transition-all`} />
                                     ))}
                                 </div>
                             )}
                        </div>
                        {day.view2.images.length > 1 && (
                            <>
                                <button onClick={() => setCarouselIndex(p => (p - 1 + day.view2.images.length) % day.view2.images.length)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-1 rounded-full backdrop-blur-sm"><ChevronLeft className="text-white" /></button>
                                <button onClick={() => setCarouselIndex(p => (p + 1) % day.view2.images.length)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-1 rounded-full backdrop-blur-sm"><ChevronRight className="text-white" /></button>
                            </>
                        )}
                    </div>

                    {/* AI Reflection Section */}
                    <GeminiPoet theme={day.view2.aiPromptTheme} />

                    <p className="font-serif text-lg leading-relaxed text-love-900/90 italic">{day.view2.text}</p>

                    {/* Love Challenge */}
                    {day.view2.challenge && (
                        <div className="bg-love-600 p-4 rounded-2xl text-white shadow-md relative overflow-hidden group">
                            <Sparkles className="absolute -top-1 -right-1 opacity-20 group-hover:rotate-45 transition-transform" />
                            <h4 className="font-bold text-xs uppercase tracking-widest mb-1 opacity-80">Today's Mission</h4>
                            <p className="text-sm font-medium">{day.view2.challenge}</p>
                        </div>
                    )}

                    <div className="flex flex-col items-center gap-4 py-6">
                        <button onClick={handleClose} className="flex items-center gap-2 px-8 py-3 bg-love-600 text-white rounded-full shadow-lg font-bold hover:bg-love-700 active:scale-95 transition-all">
                            <Mail className="w-4 h-4" /> Keep in Heart
                        </button>
                        <p className="font-handwriting text-2xl text-love-600">Yours Forever,</p>
                    </div>
                 </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};
