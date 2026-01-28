import React, { useEffect, useState } from 'react';

interface EmojiRainProps {
  emoji: string | React.ReactNode;
  isActive: boolean;
  onComplete: () => void;
}

const EmojiRain: React.FC<EmojiRainProps> = ({ emoji, isActive, onComplete }) => {
  const [particles, setParticles] = useState<{ id: number; left: number; duration: number; delay: number; size: number }[]>([]);

  useEffect(() => {
    if (isActive) {
      // Gentle shower of 20 particles
      const newParticles = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100, // percentage
        duration: 4 + Math.random() * 4, // 4-8s
        delay: Math.random() * 2, // 0-2s
        size: 1 + Math.random() * 1.5, // Scale multiplier
      }));
      setParticles(newParticles);

      const timer = setTimeout(() => {
        onComplete();
        setParticles([]);
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute top-[-50px] flex items-center justify-center"
          style={{
            left: `${p.left}%`,
            animation: `fall ${p.duration}s linear ${p.delay}s forwards`,
            transform: `scale(${p.size})`,
          }}
        >
          {typeof emoji === 'string' ? (
             <div className="text-4xl select-none" style={{ color: 'transparent', textShadow: '0 0 0 var(--love-500)' }}>
               {emoji}
             </div>
          ) : (
             <div className="w-8 h-8 text-love-500 fill-current">
               {emoji}
             </div>
          )}
        </div>
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default EmojiRain;