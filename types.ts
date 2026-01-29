
import React from 'react';

export interface DayData {
  id: number;
  dayName: string;
  date: string;
  fullDate: string;
  icon: React.ReactNode; 
  emoji: string | React.ReactNode;
  loadingMessage: string;
  
  view1: {
    gifUrl: string;
    citeText: string;
  };
  
  view2: {
    title: string;
    images: string[];
    text: string;
    challenge?: string;
    aiPromptTheme: string; // Theme used to guide Gemini for this specific day
    buttonLabel: string;
    closingSalutation: string;
  };
}

export enum DayState {
  LOCKED = 'LOCKED',
  UNLOCKED = 'UNLOCKED',
  OPENED = 'OPENED',
}

export interface StoredState {
  [key: string]: boolean;
}

export interface Theme {
  id: string;
  name: string;
  isDark: boolean;
  colors: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
}
