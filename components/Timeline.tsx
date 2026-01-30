
import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { DayData, DayState } from '../types';

interface Point {
  x: number;
  y: number;
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
    {/* Hair Back - Full & Round */}
    <path d="M 10 50 Q 5 85 25 95 L 75 95 Q 95 85 90 50 Q 90 10 50 10 Q 10 10 10 50" fill="#3E2723" />
    
    {/* Face Shape */}
    <path d="M 22 50 C 22 80, 32 90, 50 92 C 68 90, 78 80, 78 50 C 78 38, 50 35, 22 50" fill="#FEEBC8" />

    {/* Bangs - Straight cut with slight curve */}
    <path d="M 15 50 Q 30 60 50 55 Q 70 60 85 50" fill="#3E2723" />

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
  <div className="relative w-28 h-16 pointer-events-none z-30 -mb-3 scale-110">
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

interface TimelineProps {
  days: DayData[];
  getDoyState: (day: DayData) => DayState;
  onDayClick: (day: DayData) => void;
  avatarIndex: number;
}

export const Timeline: React.FC<TimelineProps> = ({ days, getDoyState, onDayClick, avatarIndex }) => {
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [markerPositions, setMarkerPositions] = useState<Point[]>([]);
  const [markerDistances, setMarkerDistances] = useState<number[]>([]);
  const [avatarDistance, setAvatarDistance] = useState(0);
  const [containerHeight, setContainerHeight] = useState(2500); // Increased default height
  const [pathD, setPathD] = useState("");
  const [centerX, setCenterX] = useState(0);

  const lastUnlockedIndex = days.reduce((acc, day, index) => {
    return getDoyState(day) !== DayState.LOCKED ? index : acc;
  }, -1);
  
  const progress = Math.max(0, lastUnlockedIndex + 1);
  
  // Dynamically calculate the path based on container width
  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current) return;
      
      const w = containerRef.current.clientWidth;
      const width = w > 0 ? w : 350; 
      
      const c = width / 2;
      setCenterX(c);
      const r = width * 0.85; // Slightly wider curve
      const l = width * 0.15; // Slightly wider curve

      // Generate a longer, wavier road
      const START_Y = 50;
      const SEGMENT_HEIGHT = 220; // Increased distance between curves significantly
      
      let d = `M ${c} ${START_Y}`;
      let currentY = START_Y;
      
      // Generate enough segments for all days + buffer
      const segments = days.length + 1;
      
      for (let i = 0; i < segments; i++) {
        const isRight = i % 2 === 0;
        const cpX = isRight ? r : l; // Control Point X
        const nextY = currentY + SEGMENT_HEIGHT;
        const cpY = currentY + (SEGMENT_HEIGHT / 2);
        
        d += ` Q ${cpX} ${cpY}, ${c} ${nextY}`;
        currentY = nextY;
      }
      
      setPathD(d);
    };

    updatePath();
    window.addEventListener('resize', updatePath);
    return () => window.removeEventListener('resize', updatePath);
  }, [days.length]);

  useLayoutEffect(() => {
    if (pathRef.current && pathD) {
      const path = pathRef.current;
      try {
        const pathLength = path.getTotalLength();
        
        // Calculate distances first
        const dists = days.map((_, i) => (pathLength / days.length) * (i + 0.5));
        setMarkerDistances(dists);

        // Get coordinates from distances
        const newPositions = dists.map(dist => {
          const { x, y } = path.getPointAtLength(dist);
          return { x, y };
        });
        
        setMarkerPositions(newPositions);
        setContainerHeight(pathLength + 150);
      } catch (error) {
        console.error("Error calculating path points:", error);
      }
    }
  }, [days, pathD]);

  // Update avatar distance when index changes
  useEffect(() => {
    if (markerDistances.length > 0 && markerDistances[avatarIndex] !== undefined) {
      setAvatarDistance(markerDistances[avatarIndex]);
    }
  }, [avatarIndex, markerDistances]);
  
  useEffect(() => {
    if (containerRef.current && markerPositions.length > 0 && lastUnlockedIndex >= 0) {
      const timer = setTimeout(() => {
        const targetY = markerPositions[lastUnlockedIndex].y;
        containerRef.current?.scrollTo({
          top: targetY - (containerRef.current.clientHeight / 2),
          behavior: 'smooth',
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [lastUnlockedIndex, markerPositions]);

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
      return isString ? (
         <span className="text-3xl select-none animate-pulse" style={{ color: 'transparent', textShadow: '0 0 0 var(--love-500)' }}>{emoji}</span>
      ) : (
         <div className="w-8 h-8 animate-pulse text-love-500 fill-current">{emoji}</div>
      );
    }

    if (state === DayState.OPENED) {
       return isString ? (
          <span className="text-3xl select-none drop-shadow-sm" style={{ color: 'transparent', textShadow: '0 0 0 white' }}>{emoji}</span>
       ) : (
          <div className="w-8 h-8 drop-shadow-sm text-white fill-current">{emoji}</div>
       );
    }
  };

  return (
    <div ref={containerRef} className="relative h-full overflow-y-auto px-4">
      <div className="relative mx-auto max-w-md" style={{ height: `${containerHeight}px` }}>
        {pathD && (
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-visible">
            <defs>
              <path
                id="roadPath"
                ref={pathRef}
                d={pathD}
              />
            </defs>

            <use href="#roadPath" fill="none" stroke="var(--love-300)" strokeWidth="60" strokeLinecap="round" style={{ opacity: 0.3 }} />
            <use href="#roadPath" fill="none" stroke="var(--love-200)" strokeWidth="50" strokeLinecap="round" />
            
            <path
                d={pathD}
                fill="none" 
                stroke="var(--love-600)" 
                strokeWidth="50" 
                strokeLinecap="round" 
                pathLength={days.length} 
                strokeDasharray={`${progress} ${days.length}`} 
                strokeDashoffset="0"
                className="transition-all duration-1000 ease-in-out opacity-90"
            />
            
            <use href="#roadPath" fill="none" stroke="var(--love-400)" strokeWidth="2" strokeDasharray="10 10" strokeLinecap="round" />
          </svg>
        )}

        {/* Avatar using Offset Path for smooth curve following */}
        {markerDistances.length > 0 && pathD && (
          <div
            className="absolute z-40 pointer-events-none"
            style={{
              // @ts-ignore - Offset path properties are standard but TS might complain depending on lib version
              offsetPath: `path('${pathD}')`,
              offsetDistance: `${avatarDistance}px`,
              offsetRotate: '0deg', // Keep upright
              transition: 'offset-distance 2s cubic-bezier(0.45, 0, 0.55, 1)', // Smooth easing
              // Centering on the path point + vertical offset to show marker
              // Increased Y translation to move avatar below marker and text
              transform: 'translate(-50%, 120%)', 
              top: 0,
              left: 0,
            }}
          >
            <CoupleAvatars />
          </div>
        )}

        {markerPositions.map((pos, index) => {
          const day = days[index];
          const state = getDoyState(day);
          const isRightSide = pos.x > centerX;

          return (
            <div
              key={day.id}
              className="absolute z-20 group"
              style={{
                top: `${pos.y}px`,
                left: `${pos.x}px`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="relative flex items-center">
                <button
                  onClick={() => onDayClick(day)}
                  className={`relative flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full border-4 shadow-xl transition-all duration-500 transform overflow-hidden z-20
                    ${state === DayState.LOCKED ? 'bg-love-50 border-gray-300 opacity-90 cursor-not-allowed' : ''}
                    ${state === DayState.UNLOCKED ? 'bg-love-50 border-love-500 scale-110 hover:scale-115 shadow-[0_0_15px_var(--love-300)]' : ''}
                    ${state === DayState.OPENED ? 'bg-love-500 border-love-600 scale-100 shadow-inner' : ''}
                  `}
                >
                  {state === DayState.UNLOCKED && (
                    <>
                      <div className="absolute inset-0 rounded-full bg-love-100/30"></div>
                      <div className="absolute -inset-1 rounded-full border-2 border-love-400 opacity-40 animate-ping"></div>
                    </>
                  )}
                  {renderEmojiContent(day.emoji, state)}
                </button>
                
                <div className={`absolute top-1/2 -translate-y-1/2 w-[120px] 
                    ${isRightSide ? 'right-full mr-14 text-right' : 'left-full ml-14 text-left'}
                    transition-all duration-500
                    ${state === DayState.LOCKED ? 'opacity-40 grayscale blur-[0.5px]' : 'opacity-100 transform group-hover:scale-105'}
                `}>
                  <span className="font-bold text-love-600 text-xs uppercase tracking-wider mb-0.5 block">{day.date}</span>
                  <h3 className="font-handwriting text-2xl text-love-800 font-bold leading-none drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]">
                    {day.dayName}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
