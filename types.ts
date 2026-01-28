import React from 'react';

export interface DayData {
  id: number;
  dayName: string; // e.g., "Rose Day"
  date: string; // "Feb 7"
  fullDate: string; // ISO format or string capable of Date.parse e.g. "2025-02-07"
  icon: React.ReactNode; 
  emoji: string | React.ReactNode; // Modified to support custom SVG icons
  
  // Modal View 1 Content
  view1: {
    gifUrl: string;
    citeText: string;
  };
  
  // Modal View 2 Content
  view2: {
    title: string;
    image: string;
    text: string;
  };
}

export enum DayState {
  LOCKED = 'LOCKED',
  UNLOCKED = 'UNLOCKED',
  OPENED = 'OPENED',
}

export interface StoredState {
  [key: string]: boolean; // dayId -> isOpened
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