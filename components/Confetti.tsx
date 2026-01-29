
import React, { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  color: string;
  size: number;
  rotation: number;
  shape: 'circle' | 'square' | 'heart' | 'star';
  wobble: number;
  duration: number;
}

interface ConfettiProps {
  primaryColor?: string;
  count?: number;
}

export const Confetti: React.FC<ConfettiProps> = ({ 
  primaryColor = 'var(--love-500)', 
  count = 80 
}) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    // Generate palette based on primary color
    const colors = [
      primaryColor,
      'var(--love-300)',
      'var(--love-700)',
      '#fbbf24', // Gold
      '#ffffff', // White/Highlight
      '#f9a8d4', // Pink
    ];
    
    const shapes: ('circle' | 'square' | 'heart' | 'star')[] = ['circle', 'square', 'heart', 'star'];

    const newPieces: ConfettiPiece[] = Array.from({ length: count }).map((_, i) => {
      // Create a 360 degree explosion
      const angle = Math.random() * Math.PI * 2;
      const velocity = 80 + Math.random() * 200;
      
      return {
        id: i,
        x: 50 + (Math.random() * 10 - 5), // Slight offset from center
        y: 50 + (Math.random() * 10 - 5),
        tx: Math.cos(angle) * velocity,
        ty: Math.sin(angle) * velocity,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 8 + Math.random() * 12,
        rotation: Math.random() * 360,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        wobble: Math.random() * 10,
        duration: 2 + Math.random() * 1.5,
      };
    });
    setPieces(newPieces);

    const timer = setTimeout(() => setPieces([]), 4000);
    return () => clearTimeout(timer);
  }, [primaryColor, count]);

  const renderShape = (p: ConfettiPiece) => {
    switch (p.shape) {
      case 'heart':
        return (
          <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        );
      case 'star':
        return (
          <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      case 'circle':
        return <div className="w-full h-full rounded-full bg-current" />;
      case 'square':
      default:
        return <div className="w-full h-full rounded-sm bg-current" />;
    }
  };

  if (pieces.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-[70] overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            color: p.color,
            transform: `rotate(${p.rotation}deg)`,
            animation: `confetti-burst-${p.id} ${p.duration}s cubic-bezier(0.1, 0.8, 0.3, 1) forwards`,
          }}
        >
          {renderShape(p)}
        </div>
      ))}
      <style>{`
        ${pieces
          .map(
            (p) => `
          @keyframes confetti-burst-${p.id} {
            0% { 
              transform: translate(0, 0) rotate(0deg) scale(0); 
              opacity: 1; 
            }
            15% {
              transform: translate(${p.tx * 0.2}px, ${p.ty * 0.2}px) rotate(${p.rotation * 0.2}deg) scale(1.2);
              opacity: 1;
            }
            100% { 
              transform: translate(${p.tx}px, ${p.ty + 400}px) rotate(${p.rotation + 720}deg) scale(0.4); 
              opacity: 0; 
            }
          }
        `
          )
          .join('')}
      `}</style>
    </div>
  );
};
