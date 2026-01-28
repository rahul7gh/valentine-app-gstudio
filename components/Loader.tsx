import React from 'react';
import { Heart } from 'lucide-react';

interface LoaderProps {
  message: string;
}

export const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-love-50/90 backdrop-blur-sm">
      <div className="relative">
        <Heart className="w-20 h-20 text-love-500 animate-bounce" fill="currentColor" />
        <div className="absolute inset-0 w-20 h-20 bg-love-400 rounded-full blur-xl opacity-40 animate-pulse"></div>
      </div>
      <p className="mt-8 text-xl font-handwriting font-bold text-love-700 animate-pulse text-center max-w-[80%]">
        {message}
      </p>
    </div>
  );
};