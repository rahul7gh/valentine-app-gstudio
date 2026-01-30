
import React, { useEffect, useRef, useMemo } from 'react';
import { Heart, Star, Sparkles } from 'lucide-react';

interface FloatingBackgroundProps {
  themeId: string;
}

const InteractiveStarryBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Generate stars once to avoid re-rendering jitter
    const layers = useMemo(() => [
        { count: 60, speed: 0.5, size: 2, opacityBase: 0.3 },
        { count: 40, speed: 1.0, size: 3, opacityBase: 0.4 },
        { count: 20, speed: 2.0, size: 4, opacityBase: 0.5 },
    ], []);
    
    // Memoize the star positions
    const starData = useMemo(() => {
        return layers.map(layer => ({
            ...layer,
            stars: Array.from({ length: layer.count }).map(() => ({
                left: Math.random() * 100,
                top: Math.random() * 100,
                animDuration: Math.random() * 3 + 2,
                animDelay: Math.random() * 2,
                opacity: Math.random() * layer.opacityBase + 0.1
            }))
        }));
    }, [layers]);

    useEffect(() => {
        const handleMove = (e: MouseEvent | TouchEvent) => {
            if (!containerRef.current) return;
            
            const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
            const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
            
            // Subtle movement range
            const x = (clientX / window.innerWidth - 0.5) * 30; 
            const y = (clientY / window.innerHeight - 0.5) * 30;

            containerRef.current.style.setProperty('--move-x', `${x}px`);
            containerRef.current.style.setProperty('--move-y', `${y}px`);
        };

        window.addEventListener('mousemove', handleMove);
        window.addEventListener('touchmove', handleMove);
        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('touchmove', handleMove);
        };
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Subtle Gradient Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-love-900/5 to-love-900/20 opacity-30"></div>
            
            {/* Nebula / Dust effect */}
            <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vh] bg-love-600/5 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '10s' }}></div>
            <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vh] bg-love-400/5 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '7s', animationDelay: '2s' }}></div>

            {starData.map((layer, layerIndex) => (
                 <div 
                    key={layerIndex}
                    className="absolute inset-0 transition-transform duration-300 ease-out will-change-transform"
                    style={{ 
                        transform: `translate(calc(var(--move-x, 0px) * ${layer.speed}), calc(var(--move-y, 0px) * ${layer.speed}))`
                    }}
                 >
                    {layer.stars.map((star, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-white shadow-[0_0_2px_rgba(255,255,255,0.8)]"
                            style={{
                                left: `${star.left}%`,
                                top: `${star.top}%`,
                                width: `${layer.size}px`,
                                height: `${layer.size}px`,
                                opacity: star.opacity,
                                animation: `twinkle ${star.animDuration}s ease-in-out infinite`,
                                animationDelay: `${star.animDelay}s`,
                            }}
                        />
                    ))}
                 </div>
            ))}
            <style>{`
                @keyframes twinkle {
                    0%, 100% { opacity: 0.2; transform: scale(0.8); }
                    50% { opacity: 1; transform: scale(1.2); }
                }
            `}</style>
        </div>
    );
}

const InteractivePassionBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Generate embers/particles
    const layers = useMemo(() => [
        { count: 30, speed: 0.3, size: 3, opacityBase: 0.2, color: 'var(--love-700)' }, // Deep background embers
        { count: 25, speed: 0.8, size: 4, opacityBase: 0.4, color: 'var(--love-500)' }, // Mid-layer embers
        { count: 15, speed: 1.5, size: 2, opacityBase: 0.6, color: '#fbbf24' },        // Golden sparks
    ], []);
    
    // Memoize positions
    const particleData = useMemo(() => {
        return layers.map(layer => ({
            ...layer,
            particles: Array.from({ length: layer.count }).map(() => ({
                left: Math.random() * 100,
                top: Math.random() * 100,
                animDuration: Math.random() * 4 + 3,
                animDelay: Math.random() * 3,
                opacity: Math.random() * layer.opacityBase + 0.1
            }))
        }));
    }, [layers]);

    useEffect(() => {
        const handleMove = (e: MouseEvent | TouchEvent) => {
            if (!containerRef.current) return;
            
            const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
            const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
            
            // Subtle movement range
            const x = (clientX / window.innerWidth - 0.5) * 40; 
            const y = (clientY / window.innerHeight - 0.5) * 40;

            containerRef.current.style.setProperty('--move-x', `${x}px`);
            containerRef.current.style.setProperty('--move-y', `${y}px`);
        };

        window.addEventListener('mousemove', handleMove);
        window.addEventListener('touchmove', handleMove);
        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('touchmove', handleMove);
        };
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Passionate Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-love-900/40 via-transparent to-love-900/20 opacity-60"></div>
            
            {/* Ambient Glows */}
            <div className="absolute top-0 left-1/3 w-[60vw] h-[60vh] bg-love-500/10 rounded-full blur-[120px] animate-pulse-slow"></div>
            <div className="absolute bottom-0 right-1/3 w-[60vw] h-[60vh] bg-love-700/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

            {particleData.map((layer, layerIndex) => (
                 <div 
                    key={layerIndex}
                    className="absolute inset-0 transition-transform duration-500 ease-out will-change-transform"
                    style={{ 
                        transform: `translate(calc(var(--move-x, 0px) * ${layer.speed}), calc(var(--move-y, 0px) * ${layer.speed}))`
                    }}
                 >
                    {layer.particles.map((p, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full shadow-[0_0_8px_currentColor]"
                            style={{
                                left: `${p.left}%`,
                                top: `${p.top}%`,
                                width: `${layer.size}px`,
                                height: `${layer.size}px`,
                                backgroundColor: layer.color,
                                color: layer.color,
                                opacity: p.opacity,
                                animation: `ember-glow ${p.animDuration}s ease-in-out infinite alternate`,
                                animationDelay: `${p.animDelay}s`,
                            }}
                        />
                    ))}
                 </div>
            ))}
            <style>{`
                @keyframes ember-glow {
                    0% { opacity: 0.3; transform: scale(0.8) translateY(0); }
                    100% { opacity: 0.8; transform: scale(1.2) translateY(-10px); }
                }
                .animate-pulse-slow {
                    animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
        </div>
    );
}

export const FloatingBackground: React.FC<FloatingBackgroundProps> = ({ themeId }) => {
  const isEndless = themeId === 'endless-universe';
  const isMidnight = themeId === 'midnight-passion';
  
  if (isEndless) {
      return <InteractiveStarryBackground />;
  }

  if (isMidnight) {
      return <InteractivePassionBackground />;
  }

  const isDark = themeId === 'stardust-universe' || themeId === 'velvet-night';
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
