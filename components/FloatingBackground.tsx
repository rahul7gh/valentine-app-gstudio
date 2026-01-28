
import React from 'react';
import { Heart, Star, Sparkles } from 'lucide-react';

interface FloatingBackgroundProps {
  themeId: string;
}

export const FloatingBackground: React.FC<FloatingBackgroundProps> = ({ themeId }) => {
  const isDark = themeId === 'midnight-passion';
  const isGold = themeId === 'golden-hour';
  const isOcean = themeId === 'ocean-love';
  
  const particleCount = isDark ? 40 : 20;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {Array.from({ length: particleCount }).map((_, i) => {
        const left = Math.random() * 100;
        const animationDelay = Math.random() * 10;
        const duration = (isDark ? 5 : 10) + Math.random() * 10;
        const size = (isDark ? 4 : 10) + Math.random() * (isDark ? 8 : 20);
        const opacity = Math.random() * 0.4 + 0.1;
        
        return (
          <div 
            key={i}
            className={`absolute ${isDark ? 'top-[-50px]' : 'bottom-[-50px]'} text-love-300 transition-all duration-1000 ${isDark ? 'animate-pulse' : 'animate-float'}`}
            style={{
              left: `${left}%`,
              top: isDark ? `${Math.random() * 100}%` : undefined,
              animationDelay: `${animationDelay}s`,
              animationDuration: `${duration}s`,
              transform: `scale(${Math.random() * 0.5 + 0.5})`,
              opacity: opacity,
              color: 'var(--love-300)'
            }}
          >
            {isDark ? (
              <Star size={size} fill="currentColor" />
            ) : isGold ? (
              <Sparkles size={size} fill="currentColor" />
            ) : isOcean ? (
              <svg viewBox="0 0 24 24" className="w-full h-full fill-current" style={{ width: size, height: size }}>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"/>
              </svg>
            ) : (
              <Heart size={size} fill="currentColor" />
            )}
          </div>
        );
      })}
    </div>
  );
};
