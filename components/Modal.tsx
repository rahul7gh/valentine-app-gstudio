
import React, { useState, useEffect, useRef } from 'react';
import { DayData, DayState } from '../types';
import { Loader } from './Loader';
import { X, Heart, Mail, Sparkles, ChevronLeft, ChevronRight, Upload, Send, Paperclip, Image as ImageIcon, Flag } from 'lucide-react';
import { Confetti } from './Confetti';
import { GeminiPoet } from './GeminiPoet';

interface ModalProps {
  day: DayData;
  isOpen: boolean;
  onClose: (emoji: string | React.ReactNode) => void;
  dayState: DayState;
}

// Robust video component to handle auto-play reliably on mobile
const AutoPlayVideo = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(error => {
        console.log("Autoplay failed:", error);
      });
    }
  }, [src]);

  return (
    <video 
      ref={videoRef}
      key={src} // Force remount if src changes
      src={src} 
      className="w-full h-full object-contain drop-shadow-2xl rounded-2xl" 
      autoPlay 
      loop 
      muted 
      playsInline
      preload="auto"
    />
  );
};

export const Modal: React.FC<ModalProps> = ({ day, isOpen, onClose, dayState }) => {
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0); 
  const [loadingMessage, setLoadingMessage] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [revealSticker, setRevealSticker] = useState(false);
  
  // Mission File State
  const [missionFile, setMissionFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize and handle loading phase
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setLoading(true);
      setStep(0);
      setIsClosing(false);
      setShowConfetti(false);
      setCarouselIndex(0);
      setRevealSticker(false);
      setMissionFile(null);
      
      // Use the day-specific creative message for the initial load
      setLoadingMessage(day.loadingMessage);

      // Simulate unwrapping delay
      const timer = setTimeout(() => {
        setLoading(false);
        if (dayState === DayState.UNLOCKED) setShowConfetti(true);
      }, 2500);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, dayState, day.loadingMessage]);

  // Handle the "Sticker Reveal" separately once loading is done
  useEffect(() => {
    if (!loading && isOpen && step === 0) {
      const timer = setTimeout(() => {
        setRevealSticker(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [loading, isOpen, step]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(day.emoji), 300);
  };
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setMissionFile(e.target.files[0]);
    }
  };

  const handleSendMission = () => {
    if (!missionFile) return;
    
    const subject = encodeURIComponent(`Mission Update: ${day.dayName} 💖`);
    const body = encodeURIComponent(`Hi Dudu,\n\nI completed today's mission: "${day.view2.challenge}"\n\nI'm attaching the picture to this email!,\nYour Bubu`);
    
    // User feedback
    alert("Opening your email app... Please attach the file you selected to send it to me! 💌");
    
    window.location.href = `mailto:rahulpohare41@gmail.com?subject=${subject}&body=${body}`;
  };

  if (!isOpen) return null;
  
  if (loading) {
     return <Loader message={loadingMessage} emoji={day.emoji} />;
  }

  const renderRevealEmoji = () => {
    if (typeof day.emoji === 'string') {
        return <span className="text-5xl select-none" style={{ color: 'transparent', textShadow: '0 0 0 var(--love-600)' }}>{day.emoji}</span>;
    }
    return <div className="w-12 h-12 text-love-600 fill-current">{day.emoji}</div>;
  };

  // Helper to determine if the media is a video
  const isVideo = day.view1.gifUrl.toLowerCase().endsWith('.mp4');

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isClosing ? 'animate-fade-out' : 'animate-fade-in-up'}`}>
      <div className="absolute inset-0 bg-love-900/40 backdrop-blur-sm" onClick={handleClose}></div>

      {/* Changed to fixed height (h-[80vh]) to ensure scrolling always works regardless of content size */}
      <div className="custom-modal-card relative w-full max-w-sm bg-love-50 rounded-3xl shadow-2xl overflow-hidden border-2 border-love-100 flex flex-col h-[80vh]">
        {showConfetti && <Confetti primaryColor="var(--love-500)" count={100} />}

        {/* Modal Header */}
        <div className={`h-24 bg-gradient-to-b from-love-400 to-love-600 relative shrink-0 z-20 transition-all duration-500 ${step === 1 ? '-mt-24 opacity-0' : 'opacity-100'}`}>
             <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-love-50 rounded-full flex items-center justify-center border-4 border-love-50 z-10 shadow-sm">
                 <div className="bg-love-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-love-500 fill-love-500 animate-pulse" />
                 </div>
             </div>
             <button onClick={handleClose} className="absolute top-3 right-3 p-1 rounded-full bg-love-200/20 text-white hover:bg-love-200/40"><X className="w-5 h-5" /></button>
        </div>

        <div className="flex-1 overflow-hidden relative min-h-0"> 
          <div className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]" style={{ transform: `translateX(-${step * 100}%)` }}>
              
              {/* SLIDE 1: GIF/Video & Reveal */}
              <div className="w-full h-full flex-shrink-0 overflow-y-auto pt-10 px-6 pb-12 overscroll-contain">
                   <div className="flex flex-col items-center text-center pb-8">
                       <div className={`w-full h-64 sm:h-80 rounded-2xl flex items-center justify-center mb-4 relative transition-all duration-1000 ease-out ${revealSticker ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-8'}`}>
                          {isVideo ? (
                            <AutoPlayVideo src={day.view1.gifUrl} />
                          ) : (
                            <img 
                              src={day.view1.gifUrl} 
                              alt="Sticker" 
                              loading="eager"
                              className="w-full h-full object-contain drop-shadow-2xl" 
                            />
                          )}
                       </div>
                       
                       <div className={`bg-love-100/90 p-5 rounded-2xl border-2 border-love-200 shadow-lg mb-8 transition-all duration-1000 delay-300 ease-out ${revealSticker ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                          <p className="font-handwriting text-2xl text-love-800 leading-relaxed italic">"{day.view1.citeText}"</p>
                       </div>
                       
                       <button 
                        onClick={() => setStep(1)} 
                        className={`relative group w-20 h-20 bg-love-200 border-4 border-love-300 rounded-full flex items-center justify-center shadow-xl transform transition-all duration-1000 delay-500 ease-out hover:scale-110 active:scale-95 mb-10 ${revealSticker ? 'opacity-100 scale-100' : 'opacity-0 scale-50 rotate-[-45deg]'}`}
                       >
                          {renderRevealEmoji()}
                          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-love-600 font-bold font-handwriting text-xl whitespace-nowrap animate-bounce">Open Me!</span>
                       </button>
                   </div>
              </div>

              {/* SLIDE 2: Content & AI Poem */}
              <div className="w-full h-full flex-shrink-0 overflow-y-auto bg-love-50 relative p-6 pb-20 overscroll-contain">
                 <div className="flex flex-col gap-6 pb-8">
                    <div className="flex justify-between items-start">
                        <h2 className="font-handwriting text-3xl text-love-800">My Dearest,</h2>
                        <div className="w-12 h-12 border-2 border-love-200 rounded-full flex items-center justify-center opacity-40 rotate-12">
                            <span className="text-[8px] font-bold text-love-800 uppercase text-center">{day.date}<br/>L-POST</span>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="overflow-hidden rounded-2xl border-4 border-love-200 shadow-lg relative aspect-[4/5] bg-love-100">
                             {day.view2.images.map((img, idx) => (
                                 <img 
                                    key={idx} 
                                    src={img} 
                                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${idx === carouselIndex ? 'opacity-100' : 'opacity-0'}`} 
                                    alt="Memory" 
                                 />
                             ))}
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

                    <GeminiPoet theme={day.view2.aiPromptTheme} />

                    <p className="font-serif text-lg leading-relaxed text-love-900/90 italic">{day.view2.text}</p>

                    {day.view2.challenge && (
                        <div className="relative overflow-hidden rounded-3xl border-2 border-love-200 bg-gradient-to-br from-white via-love-50 to-love-100 shadow-xl shadow-love-100/50 p-6 transition-all hover:scale-[1.01] hover:shadow-2xl">
                            {/* Decorative Background Elements */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-love-200/30 rounded-full blur-2xl pointer-events-none"></div>
                            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-love-300/20 rounded-full blur-xl pointer-events-none"></div>

                            {/* Header Badge */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-love-100 border border-love-200 shadow-sm">
                                    <Sparkles className="w-3 h-3 text-love-600 animate-pulse" />
                                    <span className="text-[10px] font-bold tracking-widest uppercase text-love-700">Daily Mission</span>
                                </div>
                                <div className="p-2 bg-white rounded-full shadow-sm border border-love-100">
                                    <Flag className="w-4 h-4 text-love-500" />
                                </div>
                            </div>

                            {/* Mission Text */}
                            <div className="relative z-10 mb-6 text-center">
                                <p className="font-serif text-lg leading-relaxed text-love-900 font-medium italic">
                                    "{day.view2.challenge}"
                                </p>
                            </div>

                            {/* Interaction Area */}
                            <div className="relative z-10 flex flex-col gap-3">
                                <input 
                                    type="file" 
                                    ref={fileInputRef}
                                    onChange={handleFileSelect}
                                    className="hidden"
                                    accept="image/*,audio/*,video/*"
                                />
                                
                                {!missionFile ? (
                                    <button 
                                        onClick={() => fileInputRef.current?.click()}
                                        className="group relative w-full h-24 border-2 border-dashed border-love-300 bg-white/50 hover:bg-white rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:border-love-500 hover:shadow-md"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-love-100 group-hover:bg-love-200 flex items-center justify-center transition-colors">
                                            <Upload className="w-5 h-5 text-love-600 group-hover:scale-110 transition-transform" />
                                        </div>
                                        <span className="text-xs font-semibold text-love-400 group-hover:text-love-600">Tap to upload proof</span>
                                    </button>
                                ) : (
                                    <div className="bg-white border border-love-200 rounded-2xl p-3 flex items-center justify-between shadow-sm animate-fade-in-up">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="w-10 h-10 rounded-xl bg-love-100 flex items-center justify-center flex-shrink-0">
                                                {missionFile.type.startsWith('image/') ? (
                                                    <ImageIcon className="w-5 h-5 text-love-600" />
                                                ) : (
                                                    <Paperclip className="w-5 h-5 text-love-600" />
                                                )}
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-xs font-bold text-love-800 truncate block max-w-[140px]">{missionFile.name}</span>
                                                <span className="text-[10px] text-love-400">Ready to send</span>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); setMissionFile(null); }}
                                            className="p-2 hover:bg-love-50 rounded-full text-love-400 hover:text-red-500 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}

                                <button 
                                    onClick={handleSendMission}
                                    disabled={!missionFile}
                                    className={`
                                        w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all duration-300
                                        ${missionFile 
                                            ? 'bg-gradient-to-r from-love-500 to-love-600 text-white shadow-love-500/30 hover:shadow-love-500/50 hover:scale-[1.02] active:scale-95' 
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'}
                                    `}
                                >
                                    <Send className={`w-4 h-4 ${missionFile ? 'animate-pulse' : ''}`} />
                                    <span>Complete Mission</span>
                                </button>
                            </div>
                            
                            {missionFile && (
                                <p className="text-[10px] text-center text-love-400 mt-3 animate-fade-in">
                                    <span className="font-semibold">*Note:</span> Email app will open. Please attach the file there!
                                </p>
                            )}
                        </div>
                    )}

                    <div className="flex flex-col items-center gap-4 py-6">
                        <button onClick={handleClose} className="flex items-center gap-2 px-8 py-3 bg-love-600 text-white rounded-full shadow-lg font-bold hover:bg-love-700 active:scale-95 transition-all">
                            <Mail className="w-4 h-4" /> {day.view2.buttonLabel}
                        </button>
                        <p className="font-handwriting text-2xl text-love-600">{day.view2.closingSalutation}</p>
                    </div>
                 </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};
