import React, { useEffect, useRef } from 'react';
import { DayData, DayState } from '../types';

interface TimelineProps {
  days: DayData[];
  getDoyState: (day: DayData) => DayState;
  onDayClick: (day: DayData) => void;
}

// Ghibli Style Boy
const BoyFace = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md overflow-visible">
    {/* Hair Back */}
    <path d="M 10 45 C 5 20, 25 5, 50 5 C 75 5, 95 20, 90 45" fill="#2D3748" />
    
    {/* Face Shape */}
    <path d="M 20 45 C 20 75, 30 88, 50 90 C 70 88, 80 75, 80 45 C 80 35, 50 30, 20 45" fill="#FEEBC8" />

    {/* Ears */}
    <path d="M 15 55 Q 12 60 18 65" fill="#FEEBC8" />
    <path d="M 85 55 Q 88 60 82 65" fill="#FEEBC8" />

    {/* Hair Front / Bangs - Tousled */}
    <path d="M 12 40 C 20 55, 30 40, 40 48 C 50 40, 60 55, 70 45 C 80 50, 85 40, 88 40" fill="#2D3748" stroke="#2D3748" strokeWidth="1" />

    {/* Eyes - Classic Ghibli Dot Eyes with highlight */}
    <circle cx="35" cy="58" r="4" fill="#1A202C" />
    <circle cx="65" cy="58" r="4" fill="#1A202C" />
    <circle cx="33" cy="56" r="1.5" fill="white" />
    <circle cx="63" cy="56" r="1.5" fill="white" />

    {/* Blush */}
    <ellipse cx="28" cy="68" rx="5" ry="3" fill="#F6AD55" opacity="0.4" />
    <ellipse cx="72" cy="68" rx="5" ry="3" fill="#F6AD55" opacity="0.4" />

    {/* Mouth - Small open smile */}
    <path d="M 45 75 Q 50 80 55 75" fill="#E53E3E" opacity="0.8" />
  </svg>
);

// Ghibli Style Girl
const GirlFace = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md overflow-visible">
    <defs>
      <linearGradient id="ghibliHairGrad" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#1a1a1a" />
        <stop offset="70%" stopColor="#3E2723" />
        <stop offset="100%" stopColor="#8D6E63" />
      </linearGradient>
    </defs>

    {/* Hair Back - Full & Round */}
    <path d="M 10 50 Q 5 85 25 95 L 75 95 Q 95 85 90 50 Q 90 10 50 10 Q 10 10 10 50" fill="url(#ghibliHairGrad)" />
    
    {/* Face Shape */}
    <path d="M 22 50 C 22 80, 32 90, 50 92 C 68 90, 78 80, 78 50 C 78 38, 50 35, 22 50" fill="#FEEBC8" />

    {/* Bangs - Straight cut with slight curve */}
    <path d="M 15 50 Q 30 60 50 55 Q 70 60 85 50" fill="url(#ghibliHairGrad)" />

    {/* Eyes - Slightly larger */}
    <circle cx="36" cy="62" r="4.5" fill="#1A202C" />
    <circle cx="64" cy="62" r="4.5" fill="#1A202C" />
    <circle cx="34" cy="60" r="1.5" fill="white" />
    <circle cx="62" cy="60" r="1.5" fill="white" />

    {/* Blush */}
    <circle cx="28" cy="70" r="6" fill="#F687B3" opacity="0.4" />
    <circle cx="72" cy="70" r="6" fill="#F687B3" opacity="0.4" />

    {/* Mouth */}
    <path d="M 46 78 Q 50 82 54 78" stroke="#D53F8C" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

const CoupleAvatars = () => (
  <div className="relative w-28 h-16 pointer-events-none z-30 -mb-3">
    {/* Bodies & Hands SVG Layer */}
    <svg viewBox="0 0 100 60" className="absolute bottom-0 left-0 w-full h-full overflow-visible drop-shadow-sm">
       {/* Boy Body (Left) */}
       <path d="M 10 60 L 10 45 C 10 40, 32 40, 32 45 L 32 60 Z" fill="#2D3748" />
       
       {/* Boy's Outer Arm (Left) - Hanging naturally */}
       <path d="M 10 46 Q 4 52 4 57" stroke="#FEEBC8" strokeWidth="3" fill="none" strokeLinecap="round" />
       <circle cx="4" cy="57" r="2.5" fill="#FEEBC8" />

       {/* Girl Body (Right) */}
       <path d="M 68 60 L 68 45 C 68 40, 90 40, 90 45 L 90 60 Z" fill="#8D6E63" />

       {/* Girl's Outer Arm (Right) - Hanging naturally */}
       <path d="M 90 46 Q 96 52 96 57" stroke="#FEEBC8" strokeWidth="3" fill="none" strokeLinecap="round" />
       <circle cx="96" cy="57" r="2.5" fill="#FEEBC8" />
       
       {/* Inner Arms connecting */}
       <path d="M 32 48 Q 42 55 50 55" stroke="#FEEBC8" strokeWidth="3" fill="none" strokeLinecap="round" />
       <path d="M 68 48 Q 58 55 50 55" stroke="#FEEBC8" strokeWidth="3" fill="none" strokeLinecap="round" />
       
       {/* Clasping Hands */}
       <circle cx="50" cy="55" r="3" fill="#FEEBC8" />
    </svg>

    {/* Boy Head */}
    <div className="absolute left-0 bottom-4 w-12 h-12 animate-wiggle" style={{ animationDuration: '3s', transformOrigin: 'bottom center' }}>
       <BoyFace />
    </div>

    {/* Girl Head */}
    <div className="absolute right-0 bottom-4 w-12 h-12 animate-wiggle" style={{ animationDuration: '3.5s', animationDelay: '0.5s', transformOrigin: 'bottom center' }}>
       <GirlFace />
    </div>
  </div>
);

export const Timeline: React.FC<TimelineProps> = ({ days, getDoyState, onDayClick }) => {
  const dayRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const lastUnlockedIndex = days.reduce((acc, day, index) => {
    return getDoyState(day) !== DayState.LOCKED ? index : acc;
  }, -1);
  
  const progress = Math.max(0, lastUnlockedIndex + 1);

  // Auto-scroll effect
  useEffect(() => {
    if (lastUnlockedIndex >= 0 && dayRefs.current[lastUnlockedIndex]) {
      const timer = setTimeout(() => {
        dayRefs.current[lastUnlockedIndex]?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 500); // Slight delay to ensure layout is ready
      return () => clearTimeout(timer);
    }
  }, [lastUnlockedIndex]);

  const renderEmojiContent = (emoji: string | React.ReactNode, state: DayState) => {
    const isString = typeof emoji === 'string';

    if (state === DayState.LOCKED) {
      return isString ? (
        <span className="text-3xl select-none opacity-50 grayscale" style={{ color: 'transparent', textShadow: '0 0 0 #9ca3af' }}>{emoji}</span>
      ) : (
        <div className="w-8 h-8 opacity-50 grayscale text-gray-400 fill-current">{emoji}</div>
      );
    }
    
    if (state === DayState.UNLOCKED) {
      // Hollow Effect
      return isString ? (
         <span className="text-3xl select-none animate-pulse" style={{ color: 'transparent', textShadow: '0 0 0 var(--love-500)' }}>{emoji}</span>
      ) : (
         <div className="w-8 h-8 animate-pulse text-love-500 fill-current">{emoji}</div>
      );
    }

    if (state === DayState.OPENED) {
       // Solid Effect
       return isString ? (
          <span className="text-3xl select-none drop-shadow-sm" style={{ color: 'transparent', textShadow: '0 0 0 white' }}>{emoji}</span>
       ) : (
          <div className="w-8 h-8 drop-shadow-sm text-white fill-current">{emoji}</div>
       );
    }
  };

  return (
    <div className="relative py-10 px-4 max-w-md mx-auto min-h-screen">
      
      {/* Road SVG */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-visible" preserveAspectRatio="none">
        <defs>
          <path id="roadPath"
            d={`M 50% 20 
               Q 20% 80, 50% 140 
               T 50% 260 
               T 50% 380 
               T 50% 500 
               T 50% 620 
               T 50% 740 
               T 50% 860 
               T 50% 980`}
          />
        </defs>

        {/* 1. Base Road */}
        <use href="#roadPath"
          fill="none"
          stroke="var(--love-300)" 
          strokeWidth="60"
          strokeLinecap="round"
          style={{ vectorEffect: 'non-scaling-stroke', opacity: 0.3 }} 
        />

        {/* 2. Asphalt Road */}
        <use href="#roadPath"
          fill="none"
          stroke="#525252"
          strokeWidth="50"
          strokeLinecap="round"
          style={{ vectorEffect: 'non-scaling-stroke' }}
        />

        {/* 3. Highlighted Road (Uses Love-600) */}
        <use href="#roadPath"
          fill="none"
          stroke="var(--love-600)"
          strokeWidth="50"
          strokeLinecap="round"
          pathLength="8"
          strokeDasharray={`${progress} 8`}
          strokeDashoffset="0"
          className="transition-all duration-1000 ease-in-out opacity-90"
          style={{ vectorEffect: 'non-scaling-stroke' }}
        />

        {/* 4. Center Line */}
        <use href="#roadPath"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="2"
          strokeDasharray="10 10"
          strokeLinecap="round"
          style={{ vectorEffect: 'non-scaling-stroke' }}
        />
      </svg>

      <div className="relative z-10 flex flex-col space-y-[56px] pt-12 pb-20">
        {days.map((day, index) => {
          const state = getDoyState(day);
          const isLeft = index % 2 === 0;
          const isLastUnlocked = index === lastUnlockedIndex;

          return (
            <div 
              key={day.id} 
              ref={el => { dayRefs.current[index] = el; }}
              className={`relative flex items-center w-full ${isLeft ? 'justify-start pl-4' : 'justify-end pr-4'}`}
            >
              <div 
                className={`relative flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'} gap-4`}
                style={{ width: '55%' }} 
              >
                
                {/* Marker Button */}
                <button
                  onClick={() => onDayClick(day)}
                  disabled={state === DayState.LOCKED}
                  className={`
                    relative flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full border-4 shadow-xl transition-all duration-500 transform z-20 overflow-hidden
                    ${state === DayState.LOCKED ? 'bg-love-50 border-gray-300 opacity-80' : ''}
                    ${state === DayState.UNLOCKED ? 'bg-love-50 border-love-500 scale-110 hover:scale-115 shadow-[0_0_15px_var(--love-300)]' : ''}
                    ${state === DayState.OPENED ? 'bg-love-500 border-love-600 scale-100 shadow-inner' : ''}
                  `}
                >
                  {state === DayState.UNLOCKED && (
                    <>
                       {/* Hollow Effect: Colored outline emoji inside light background */}
                       <div className="absolute inset-0 rounded-full bg-love-100/30"></div>
                       {/* Subtle outer ping for attention */}
                       <div className="absolute -inset-1 rounded-full border-2 border-love-400 opacity-40 animate-ping"></div>
                    </>
                  )}
                  
                  {renderEmojiContent(day.emoji, state)}

                </button>
                
                {/* Text Label Container (No Border/BG) */}
                <div className={`relative group ${isLastUnlocked ? 'z-30' : 'z-10'}`}>
                  
                  <div className={`
                     flex flex-col p-2 min-w-[100px]
                     transition-all duration-500
                     ${state === DayState.LOCKED ? 'opacity-40 grayscale blur-[0.5px]' : 'opacity-100 transform hover:scale-105'}
                     ${isLeft ? 'items-start text-left' : 'items-end text-right'}
                  `}>
                    <span className="font-bold text-love-400 text-xs uppercase tracking-wider mb-0.5">{day.date}</span>
                    <span className="font-handwriting text-2xl text-love-700 font-bold leading-none drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]">
                      {day.dayName}
                    </span>
                  </div>

                  {/* Couple Avatars Positioned Beside Text */}
                  {isLastUnlocked && (
                    <div className={`
                      absolute top-1/2 -translate-y-1/2
                      ${isLeft ? 'left-full ml-2' : 'right-full mr-2'}
                    `}>
                      <CoupleAvatars />
                    </div>
                  )}

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};