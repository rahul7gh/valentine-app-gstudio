import React, { useState, useEffect } from 'react';
import { DayData } from '../types';
import { THEMES } from '../constants';
import { X, Save, RotateCcw, Palette, Calendar, Play } from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  days: DayData[];
  dateOverrides: { [id: number]: string };
  currentThemeId: string;
  onSaveDates: (overrides: { [id: number]: string }) => void;
  onSelectTheme: (themeId: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ 
  isOpen, 
  onClose, 
  days, 
  dateOverrides, 
  currentThemeId,
  onSaveDates,
  onSelectTheme
}) => {
  const [activeTab, setActiveTab] = useState<'dates' | 'themes'>('themes');
  const [tempOverrides, setTempOverrides] = useState(dateOverrides);

  // Sync state when panel opens to ensure fresh data
  useEffect(() => {
    if (isOpen) {
      setTempOverrides(dateOverrides);
    }
  }, [isOpen, dateOverrides]);

  if (!isOpen) return null;

  const handleDateChange = (id: number, val: string) => {
    setTempOverrides(prev => ({ ...prev, [id]: val }));
  };

  const handleSaveDates = () => {
    onSaveDates(tempOverrides);
  };

  const handleResetDates = () => {
    setTempOverrides({});
    onSaveDates({});
  };

  const handleTestAll = () => {
    const year = new Date().getFullYear();
    const testDate = `${year}-01-01`;
    const newOverrides: { [id: number]: string } = {};
    days.forEach(day => {
      newOverrides[day.id] = testDate;
    });
    setTempOverrides(newOverrides);
    onSaveDates(newOverrides);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-love-50 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col border border-love-200">
        {/* Header */}
        <div className="bg-love-900 text-love-50 p-4 flex justify-between items-center shadow-md">
          <h2 className="text-lg font-bold font-handwriting tracking-wider text-2xl">Admin Settings</h2>
          <button onClick={onClose} className="hover:bg-love-800 p-1 rounded-full transition-colors"><X className="w-6 h-6" /></button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-love-200 bg-love-100">
          <button 
            onClick={() => setActiveTab('themes')}
            className={`flex-1 py-3 font-semibold flex justify-center items-center gap-2 transition-colors ${activeTab === 'themes' ? 'text-love-700 border-b-2 border-love-600 bg-love-50' : 'text-love-400 hover:bg-love-50/50'}`}
          >
            <Palette className="w-4 h-4" /> Themes
          </button>
          <button 
            onClick={() => setActiveTab('dates')}
            className={`flex-1 py-3 font-semibold flex justify-center items-center gap-2 transition-colors ${activeTab === 'dates' ? 'text-love-700 border-b-2 border-love-600 bg-love-50' : 'text-love-400 hover:bg-love-50/50'}`}
          >
            <Calendar className="w-4 h-4" /> Dates
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4 overflow-y-auto flex-1 bg-love-50">
          
          {activeTab === 'themes' && (
            <div className="grid grid-cols-1 gap-4">
              {THEMES.map(theme => (
                <button
                  key={theme.id}
                  onClick={() => onSelectTheme(theme.id)}
                  className={`
                    relative p-4 rounded-xl border-2 flex items-center justify-between transition-all duration-300
                    ${currentThemeId === theme.id ? 'border-love-600 bg-white shadow-lg scale-[1.02]' : 'border-love-100 bg-white/60 shadow-sm hover:bg-white'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    {/* Color Swatch Preview */}
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: theme.colors[500] }}></div>
                      <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: theme.colors[300] }}></div>
                      <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: theme.colors[800] }}></div>
                    </div>
                    <span className={`font-bold ${currentThemeId === theme.id ? 'text-love-800' : 'text-love-600'}`}>{theme.name}</span>
                  </div>
                  {currentThemeId === theme.id && (
                    <div className="w-4 h-4 rounded-full bg-love-500 shadow-sm ring-2 ring-love-200"></div>
                  )}
                </button>
              ))}
            </div>
          )}

          {activeTab === 'dates' && (
            <div className="space-y-4">
              <p className="text-xs text-love-400 mb-2 italic">Adjust dates to test the timeline journey.</p>
              {days.map(day => {
                const currentVal = tempOverrides[day.id] || day.fullDate;
                return (
                  <div key={day.id} className="flex flex-col space-y-1 bg-white p-3 rounded-xl shadow-sm border border-love-100">
                    <label className="text-sm font-semibold text-love-800 flex justify-between">
                      <span className="flex items-center gap-2">
                         <span className="text-love-500">{day.icon}</span>
                         {day.dayName}
                      </span>
                      <span className="text-love-300 font-normal text-xs">Def: {day.fullDate}</span>
                    </label>
                    <input 
                      type="date" 
                      value={currentVal}
                      onChange={(e) => handleDateChange(day.id, e.target.value)}
                      className="w-full border border-love-200 rounded-lg p-2 text-love-700 bg-love-50 focus:ring-2 focus:ring-love-400 focus:outline-none focus:bg-white transition-colors"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {activeTab === 'dates' && (
          <div className="p-4 bg-love-50 border-t border-love-200 flex flex-col gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="flex gap-3">
              <button 
                onClick={handleResetDates}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-2 border border-love-300 text-love-700 rounded-xl hover:bg-love-100 transition-colors font-medium text-sm"
              >
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
              <button 
                onClick={handleTestAll}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-2 border border-love-300 text-love-700 rounded-xl hover:bg-love-100 transition-colors font-medium text-sm"
              >
                <Play className="w-4 h-4" /> Test All
              </button>
            </div>
            <button 
              onClick={handleSaveDates}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-love-500 to-love-600 text-white rounded-xl hover:from-love-600 hover:to-love-700 shadow-md transform active:scale-95 transition-all font-bold"
            >
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};