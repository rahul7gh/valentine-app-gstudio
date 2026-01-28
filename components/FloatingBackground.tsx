import React from 'react';
import { Heart, Star } from 'lucide-react';

interface FloatingBackgroundProps {
  themeId: string;
}

export const FloatingBackground: React.FC<FloatingBackgroundProps> = ({ themeId }) => {
  const isCosmic = themeId === 'starry-night' || themeId === 'nebula-dreams';
  const count = isCosmic ? 30 : 15; // More stars than hearts for the night sky effect

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Generate floating particles */}
      {Array.from({ length: count }).map((_, i) => {
        const left = Math.random() * 100;
        const animationDelay = Math.random() * 10;
        const duration = (isCosmic ? 5 : 15) + Math.random() * 10; // Stars twinkle/move slightly differently
        const size = (isCosmic ? 4 : 10) + Math.random() * (isCosmic ? 8 : 30); // Stars are smaller
        const opacity = Math.random() * 0.5 + 0.1;
        
        return (
          <div 
            key={i}
            className={`absolute bottom-[-50px] text-love-300 ${isCosmic ? 'animate-pulse' : 'animate-float'}`}
            style={{
              left: `${left}%`,
              top: isCosmic ? `${Math.random() * 100}%` : undefined, // Stars are scattered, Hearts float up
              animationDelay: `${animationDelay}s`,
              animationDuration: `${duration}s`,
              transform: `scale(${Math.random()})`,
              opacity: opacity
            }}
          >
            {isCosmic ? (
              <Star size={size} fill="currentColor" />
            ) : (
              <Heart size={size} fill="currentColor" />
            )}
          </div>
        );
      })}
    </div>
  );
};