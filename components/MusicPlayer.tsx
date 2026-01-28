
import React, { useState, useRef, useEffect } from 'react';
import { Music, Volume2, VolumeX, Heart } from 'lucide-react';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play blocked by browser"));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[60]">
      <audio 
        ref={audioRef} 
        loop 
        src="https://www.bensound.com/bensound-music/bensound-love.mp3" 
      />
      <button
        onClick={togglePlay}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all transform active:scale-90 ${isPlaying ? 'bg-love-600 text-white animate-pulse' : 'bg-white text-love-400'}`}
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
        
        {/* Floating Heart Decor */}
        {isPlaying && (
            <div className="absolute -top-2 -left-2 bg-white rounded-full p-1 shadow-sm">
                <Heart size={12} className="text-love-500 fill-love-500" />
            </div>
        )}
      </button>
    </div>
  );
};
