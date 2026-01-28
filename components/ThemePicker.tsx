
import React from 'react';
import { THEMES } from '../constants';
import { X, Palette, Sparkles } from 'lucide-react';

interface ThemePickerProps {
  isOpen: boolean;
  onClose: () => void;
  currentThemeId: string;
  onSelectTheme: (themeId: string) => void;
}

export const ThemePicker: React.FC<ThemePickerProps> = ({ isOpen, onClose, currentThemeId, onSelectTheme }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fade-in">
      <div className="absolute inset-0 bg-love-900/60 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-[2rem] p-6 shadow-2xl max-w-sm w-full border-4 border-love-100 animate-fade-in-up">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-love-100 rounded-lg text-love-600">
              <Palette size={20} />
            </div>
            <h3 className="font-handwriting text-2xl text-love-800 font-bold">Personalize Style</h3>
          </div>
          <button onClick={onClose} className="text-love-300 hover:text-love-600"><X size={24} /></button>
        </div>

        <div className="grid grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-1">
          {THEMES.map(theme => (
            <button
              key={theme.id}
              onClick={() => onSelectTheme(theme.id)}
              className={`
                group relative flex flex-col p-4 rounded-2xl border-2 transition-all duration-300
                ${currentThemeId === theme.id 
                  ? 'border-love-500 bg-love-50 shadow-md scale-[1.05]' 
                  : 'border-gray-100 bg-white hover:border-love-200'}
              `}
            >
              {/* Color Preview Swatch */}
              <div className="flex -space-x-1 mb-3">
                <div className="w-6 h-6 rounded-full ring-2 ring-white" style={{ backgroundColor: theme.colors[500] }}></div>
                <div className="w-6 h-6 rounded-full ring-2 ring-white" style={{ backgroundColor: theme.colors[300] }}></div>
                <div className="w-6 h-6 rounded-full ring-2 ring-white" style={{ backgroundColor: theme.colors[700] }}></div>
              </div>
              
              <span className={`text-sm font-bold ${currentThemeId === theme.id ? 'text-love-800' : 'text-gray-600'}`}>
                {theme.name}
              </span>

              {currentThemeId === theme.id && (
                <div className="absolute top-2 right-2">
                  <Sparkles className="text-love-500 w-4 h-4 animate-pulse" />
                </div>
              )}
            </button>
          ))}
        </div>

        <button 
          onClick={onClose}
          className="mt-6 w-full py-3 bg-love-600 text-white rounded-xl font-bold hover:bg-love-700 shadow-lg shadow-love-200 transition-all"
        >
          Looks Perfect!
        </button>
      </div>
    </div>
  );
};
