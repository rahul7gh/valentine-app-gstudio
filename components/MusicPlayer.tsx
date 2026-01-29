
import React, { useState, useRef, useEffect } from 'react';
import { Music, Volume2, VolumeX, Heart, SkipForward, SkipBack, Disc, ChevronDown, ListMusic } from 'lucide-react';

const PLAYLIST = [
  { title: "Sweet Love", artist: "Bensound", url: "https://www.bensound.com/bensound-music/bensound-love.mp3" },
  { title: "Acoustic Breeze", artist: "Bensound", url: "https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3" },
  { title: "Tenderness", artist: "Bensound", url: "https://www.bensound.com/bensound-music/bensound-tenderness.mp3" },
  { title: "Sunny Day", artist: "Bensound", url: "https://www.bensound.com/bensound-music/bensound-sunny.mp3" }
];

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = PLAYLIST[currentTrackIndex];

  useEffect(() => {
    // When track changes, reload and play if it was already playing
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
            playPromise.catch(e => {
                console.log("Playback interrupted or blocked", e);
                setIsPlaying(false);
            });
        }
      }
    }
  }, [currentTrackIndex]);

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play blocked by browser"));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = (e?: React.SyntheticEvent) => {
    e?.stopPropagation();
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
  };

  const prevTrack = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3">
      <audio 
        ref={audioRef} 
        loop 
        src={currentTrack.url}
        onEnded={nextTrack}
      />

      {/* Expanded Player Card */}
      <div className={`
        transition-all duration-500 ease-cubic-bezier(0.175, 0.885, 0.32, 1.275) origin-bottom-right
        ${isExpanded ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-10 pointer-events-none absolute bottom-0 right-0'}
      `}>
        <div className="bg-love-100/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-love-200 w-64">
           {/* Header / Minimize */}
           <div className="flex items-center justify-between mb-4 border-b border-love-200 pb-2">
              <div className="flex items-center gap-2 text-love-600">
                  <ListMusic size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">Our Playlist</span>
              </div>
              <button onClick={() => setIsExpanded(false)} className="text-love-500 hover:text-love-700 transition-colors">
                  <ChevronDown size={18} />
              </button>
           </div>

           {/* Track Info */}
           <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-full bg-love-50 flex items-center justify-center border-2 border-love-200 shadow-inner ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
                  <Disc className={`text-love-500 ${isPlaying ? 'animate-pulse' : ''}`} size={24} />
              </div>
              <div className="flex-1 overflow-hidden">
                  <h4 className="font-bold text-love-800 text-sm truncate">{currentTrack.title}</h4>
                  <p className="text-xs text-love-500 truncate">{currentTrack.artist}</p>
              </div>
           </div>

           {/* Controls */}
           <div className="flex items-center justify-between px-2">
              <button onClick={prevTrack} className="p-2 text-love-500 hover:text-love-700 hover:bg-love-50 rounded-full transition-all">
                  <SkipBack size={20} fill="currentColor" />
              </button>
              
              <button 
                onClick={togglePlay}
                className="w-12 h-12 flex items-center justify-center bg-love-500 text-white rounded-full shadow-lg shadow-love-200 hover:bg-love-600 hover:scale-105 active:scale-95 transition-all"
              >
                  {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
              </button>

              <button onClick={nextTrack} className="p-2 text-love-500 hover:text-love-700 hover:bg-love-50 rounded-full transition-all">
                  <SkipForward size={20} fill="currentColor" />
              </button>
           </div>
        </div>
      </div>

      {/* Floating Toggle Button (Visible when minimized) */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
            relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 z-10 border-2 border-love-200
            ${isExpanded ? 'bg-love-100 text-love-500 scale-90' : 'bg-love-100/90 backdrop-blur text-love-500 hover:scale-105'}
            ${isPlaying && !isExpanded ? 'animate-active-heart-pulse ring-4 ring-love-200/50' : ''}
        `}
      >
        {isPlaying ? (
           <div className="relative">
             <Music size={24} className="animate-bounce" />
             <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-love-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-love-500"></span>
             </span>
           </div>
        ) : (
           <Music size={24} />
        )}
      </button>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
