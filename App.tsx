import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Timeline } from './components/Timeline';
import { Modal } from './components/Modal';
import { AdminPanel } from './components/AdminPanel';
import EmojiRain from './components/EmojiRain';
import { FloatingBackground } from './components/FloatingBackground';
import { VALENTINE_DAYS, THEMES } from './constants';
import { DayData, DayState, StoredState } from './types';
import { Heart, Settings } from 'lucide-react';
import "./App.css"
const STORAGE_KEY = 'valentine_app_progress';
const ADMIN_STORAGE_KEY = 'valentine_date_overrides';
const THEME_STORAGE_KEY = 'valentine_app_theme';

function App() {
  // --- STATE ---
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
  const [showerEmoji, setShowerEmoji] = useState<string | null>(null);

  // --- EFFECT: Apply Theme ---
  useEffect(() => {
    const theme = THEMES.find(t => t.id === currentThemeId) || THEMES[0];
    const root = document.documentElement;
    
    // Set CSS variables
    Object.entries(theme.colors).forEach(([shade, color]) => {
      root.style.setProperty(`--love-${shade}`, color);
    });
    
    // Optional: Save to local storage
    localStorage.setItem(THEME_STORAGE_KEY, currentThemeId);
  }, [currentThemeId]);
  
  // --- COMPUTED DATA ---
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
    // Safe generic comparison logic
    const unlockTimestamp = new Date(day.fullDate + 'T00:00:00').getTime();
    const nowTimestamp = now.getTime();

    return nowTimestamp >= unlockTimestamp ? DayState.UNLOCKED : DayState.LOCKED;
  }, [openedDays]);

  // --- HANDLERS ---
  const handleDayClick = (day: DayData) => {
    const state = getDayState(day);
    if (state === DayState.LOCKED) return;
    
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  const handleModalClose = (emoji: string) => {
    setIsModalOpen(false);
    
    // Mark as opened
    if (selectedDay) {
      const newOpened = { ...openedDays, [selectedDay.id]: true };
      setOpenedDays(newOpened);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newOpened));
      
      // Trigger shower with the day's emoji
      setShowerEmoji(emoji);
    }
  };

  const handleSaveOverrides = (overrides: { [id: number]: string }) => {
    setDateOverrides(overrides);
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(overrides));
  };

  return (
    <div className="min-h-screen bg-love-50 overflow-hidden font-sans text-love-900 transition-colors duration-500">
      
      {/* Background Effect */}
      <FloatingBackground themeId={currentThemeId} />

      {/* Header */}
      <header className="sticky top-0 z-30 bg-love-50/80 backdrop-blur-md shadow-sm border-b border-love-100 transition-colors duration-500">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-handwriting font-bold text-love-600 flex items-center gap-2 animate-pulse-fast">
            <Heart className="w-5 h-5 fill-love-500" />
            Our Journey
          </h1>
          <button 
             onClick={() => setIsAdminOpen(true)}
             className="p-2 text-love-300 hover:text-love-600 transition-colors"
          >
             <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="relative z-10">
        <Timeline 
          days={effectiveDays} 
          getDoyState={getDayState} 
          onDayClick={handleDayClick} 
        />
      </main>

      {/* Interactive Elements */}
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

      <EmojiRain 
        emoji={showerEmoji || '❤️'} 
        isActive={!!showerEmoji} 
        onComplete={() => setShowerEmoji(null)} 
      />

    </div>
  );
}

export default App;