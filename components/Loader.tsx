
import React from 'react';

interface LoaderProps {
  message: string;
  emoji: string | React.ReactNode;
}

export const Loader: React.FC<LoaderProps> = ({ message, emoji }) => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-love-50/95 backdrop-blur-md overflow-hidden">
      
      {/* Animated Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-love-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-love-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-love-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      {/* Main Loader Container */}
      <div className="relative flex flex-col items-center justify-center">
        
        {/* Outer Rotating Ring */}
        <div className="absolute w-40 h-40 rounded-full border-4 border-love-200 border-t-love-500 animate-spin-slow"></div>
        
        {/* Inner Pulsing Ring */}
        <div className="absolute w-32 h-32 rounded-full border-2 border-love-300 border-dashed animate-spin-reverse-slower opacity-60"></div>

        {/* Center Portal/Emoji */}
        <div className="relative w-24 h-24 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.6)] animate-pulse-fast">
           {typeof emoji === 'string' ? (
             <span className="text-5xl select-none filter drop-shadow-md animate-bounce-slow">
               {emoji}
             </span>
           ) : (
             <div className="w-12 h-12 text-love-600 fill-love-100 animate-bounce-slow">
               {emoji}
             </div>
           )}
        </div>

      </div>

      {/* Text Message */}
      <div className="relative mt-12 text-center px-6 max-w-[80%]">
        <h3 className="text-2xl font-handwriting font-bold text-love-700 animate-fade-in-up">
           {message}
        </h3>
        <div className="flex justify-center gap-1 mt-3">
           <div className="w-2 h-2 bg-love-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
           <div className="w-2 h-2 bg-love-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
           <div className="w-2 h-2 bg-love-700 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        .animate-spin-reverse-slower {
          animation: spin 6s linear infinite reverse;
        }
        .animate-bounce-slow {
           animation: bounce 2s infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
