
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Timeline } from './components/Timeline';
import { Modal } from './components/Modal';
import { AdminPanel } from './components/AdminPanel';
import { MusicPlayer } from './components/MusicPlayer';
import { LoveJar } from './components/LoveJar';
import { ThemePicker } from './components/ThemePicker';
import EmojiRain from './components/EmojiRain';
import { FloatingBackground } from './components/FloatingBackground';
import { VALENTINE_DAYS, THEMES } from './constants';
import { DayData, DayState, StoredState } from './types';
import { Heart, Settings, Wand2 } from 'lucide-react';
import "./App.css"

const STORAGE_KEY = 'valentine_app_progress';
const ADMIN_STORAGE_KEY = 'valentine_date_overrides';
const THEME_STORAGE_KEY = 'valentine_app_theme';

function App() {
  const [openedDays, setOpenedDays] = useState<StoredState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const [dateOverrides, setDateOverrides] = useState<{ [id: number]: string }>(() => {
    try {
      const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const [currentThemeId, setCurrentThemeId] = useState<string>(() => {
    return localStorage.getItem(THEME_STORAGE_KEY) || 'classic-rose';
  });

  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isThemePickerOpen, setIsThemePickerOpen] = useState(false);
  const [showerEmoji, setShowerEmoji] = useState<string | null>(null);

  useEffect(() => {
    const theme = THEMES.find(t => t.id === currentThemeId) || THEMES[0];
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([shade, color]) => {
      root.style.setProperty(`--love-${shade}`, color);
    });
    localStorage.setItem(THEME_STORAGE_KEY, currentThemeId);
  }, [currentThemeId]);
  
  const effectiveDays = useMemo(() => {
    return VALENTINE_DAYS.map(day => ({
      ...day,
      fullDate: dateOverrides[day.id] || day.fullDate,
      date: dateOverrides[day.id] 
        ? new Date(dateOverrides[day.id]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        : day.date
    }));
  }, [dateOverrides]);

  const getDayState = useCallback((day: DayData) => {
    if (openedDays[day.id]) return DayState.OPENED;
    const now = new Date();
    now.setHours(0,0,0,0);
    const unlockTimestamp = new Date(day.fullDate + 'T00:00:00').getTime();
    return now.getTime() >= unlockTimestamp ? DayState.UNLOCKED : DayState.LOCKED;
  }, [openedDays]);

  const handleDayClick = (day: DayData) => {
    if (getDayState(day) === DayState.LOCKED) return;
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  const handleModalClose = (emoji: string) => {
    setIsModalOpen(false);
    if (selectedDay) {
      const newOpened = { ...openedDays, [selectedDay.id]: true };
      setOpenedDays(newOpened);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newOpened));
      setShowerEmoji(emoji);
    }
  };

  const handleSaveOverrides = (overrides: { [id: number]: string }) => {
    setDateOverrides(overrides);
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(overrides));
  };

  return (
    <div className="min-h-screen bg-love-50 overflow-hidden font-sans text-love-900 transition-colors duration-500 pb-20">
      <FloatingBackground themeId={currentThemeId} />

      <header className="sticky top-0 z-30 bg-love-50/80 backdrop-blur-md shadow-sm border-b border-love-100 transition-colors duration-500">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-handwriting font-bold text-love-600 flex items-center gap-2 animate-pulse-fast">
            <Heart className="w-5 h-5 fill-love-500" />
            Our Journey
          </h1>
          <div className="flex gap-1">
             <button 
                onClick={() => setIsThemePickerOpen(true)} 
                className="p-2 text-love-400 hover:text-love-600 active:scale-90 transition-all"
             >
                <Wand2 className="w-5 h-5" />
             </button>
             <button 
                onClick={() => setIsAdminOpen(true)} 
                className="p-2 text-love-300 hover:text-love-600 active:scale-90 transition-all"
             >
                <Settings className="w-5 h-5" />
             </button>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <Timeline days={effectiveDays} getDoyState={getDayState} onDayClick={handleDayClick} />
      </main>

      {selectedDay && (
        <Modal 
          day={selectedDay} 
          isOpen={isModalOpen} 
          onClose={handleModalClose}
          dayState={openedDays[selectedDay.id] ? DayState.OPENED : DayState.UNLOCKED}
        />
      )}

      <AdminPanel 
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        days={VALENTINE_DAYS} 
        dateOverrides={dateOverrides}
        currentThemeId={currentThemeId}
        onSaveDates={handleSaveOverrides}
        onSelectTheme={setCurrentThemeId}
      />

      <ThemePicker 
        isOpen={isThemePickerOpen}
        onClose={() => setIsThemePickerOpen(false)}
        currentThemeId={currentThemeId}
        onSelectTheme={setCurrentThemeId}
      />

      <EmojiRain emoji={showerEmoji || '❤️'} isActive={!!showerEmoji} onComplete={() => setShowerEmoji(null)} />
      
      {/* Interactive Features */}
      <LoveJar />
      <MusicPlayer />
    </div>
  );
}

export default App;
