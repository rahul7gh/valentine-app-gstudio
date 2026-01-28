import React from 'react';
import { DayData, Theme } from './types';
import { Heart, Gift, Camera, Music, Star, Sun, Moon, Smile } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();
const getDate = (day: number) => `${CURRENT_YEAR}-02-${day.toString().padStart(2, '0')}`;

// Custom Hug Emoji: A face hugging a heart (Care style)
const CustomHugEmoji = (
  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.2" />
    </filter>
    
    {/* Face Base */}
    <circle cx="50" cy="50" r="42" fill="#FCD34D" filter="url(#shadow)" />
    
    {/* Eyes - Happy Arcs */}
    <path d="M 32 40 Q 38 34 44 40" fill="none" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M 56 40 Q 62 34 68 40" fill="none" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
    
    {/* Blush */}
    <ellipse cx="26" cy="52" rx="6" ry="3.5" fill="#EF4444" opacity="0.3" />
    <ellipse cx="74" cy="52" rx="6" ry="3.5" fill="#EF4444" opacity="0.3" />

    {/* The Heart Being Hugged */}
    <path 
      d="M 50 90 C 25 78 12 60 12 46 C 12 34 22 28 34 28 C 42 28 47 32 50 36 C 53 32 58 28 66 28 C 78 28 88 34 88 46 C 88 60 75 78 50 90 Z" 
      fill="#E11D48" 
      stroke="#BE123C" 
      strokeWidth="1"
      filter="url(#shadow)"
    />

    {/* Hands holding the heart */}
    <ellipse cx="22" cy="62" rx="8" ry="9" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" />
    <ellipse cx="78" cy="62" rx="8" ry="9" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" />
  </svg>
);

export const GENERIC_MESSAGES = [
  "I love you more than words can say! ❤️",
  "You make my world brighter every day. 🌟",
  "Thinking of you is my favorite hobby. 💭",
  "You are my greatest adventure. 🚀",
  "My heart beats only for you. 💓",
  "Every moment with you is magic. ✨",
  "You are the peanut butter to my jelly. 🥜",
  "Just checking in to say: You're amazing! 😍",
  "Forever wouldn't be long enough with you. ⏳",
  "You are my dream come true. 🌙"
];

export const FIRST_TIME_MESSAGES = {
  loading: "Unwrapping your surprise...",
  ready: "Here it comes!"
};

export const VALENTINE_DAYS: DayData[] = [
  {
    id: 1,
    dayName: "Rose Day",
    date: "Feb 7",
    fullDate: getDate(7),
    icon: <Heart className="w-6 h-6" />,
    emoji: "🌹",
    view1: {
      gifUrl: "https://media.tenor.com/images/9c557626325501865363172554766324/tenor.gif", // Dudu giving flower
      citeText: "A rose speaks of love silently, in a language known only to the heart."
    },
    view2: {
      title: "Happy Rose Day!",
      image: "https://picsum.photos/400/300?random=1",
      text: "Like a rose, you bring beauty and fragrance into my life. I love you!"
    }
  },
  {
    id: 2,
    dayName: "Propose Day",
    date: "Feb 8",
    fullDate: getDate(8),
    icon: <Gift className="w-6 h-6" />,
    emoji: "💍",
    view1: {
      gifUrl: "https://media.tenor.com/images/3f191599371725010996181729452309/tenor.gif", // Dudu offering heart/love
      citeText: "Every love story is beautiful, but ours is my favorite."
    },
    view2: {
      title: "Will You Be Mine?",
      image: "https://picsum.photos/400/300?random=2",
      text: "Today I promise to walk by your side forever. Will you handle my tantrums for a lifetime?"
    }
  },
  {
    id: 3,
    dayName: "Chocolate Day",
    date: "Feb 9",
    fullDate: getDate(9),
    icon: <Star className="w-6 h-6" />,
    emoji: "🍫",
    view1: {
      gifUrl: "https://media.tenor.com/images/22379895085422891965578799486284/tenor.gif", // Dudu eating
      citeText: "All you need is love. But a little chocolate now and then doesn't hurt."
    },
    view2: {
      title: "Sweetest Thing",
      image: "https://picsum.photos/400/300?random=3",
      text: "You are sweeter than any chocolate in this world. Happy Chocolate Day, my love!"
    }
  },
  {
    id: 4,
    dayName: "Teddy Day",
    date: "Feb 10",
    fullDate: getDate(10),
    icon: <Smile className="w-6 h-6" />,
    emoji: "🧸",
    view1: {
      gifUrl: "https://media.tenor.com/images/57802613587002517614081395567545/tenor.gif", // Cuddling/Teddy vibes
      citeText: "A soft hug from a teddy bear can fix everything."
    },
    view2: {
      title: "Cuddles & Hugs",
      image: "https://picsum.photos/400/300?random=4",
      text: "Sending you a big fluffy teddy bear hug! I wish I was there to cuddle you right now."
    }
  },
  {
    id: 5,
    dayName: "Promise Day",
    date: "Feb 11",
    fullDate: getDate(11),
    icon: <Sun className="w-6 h-6" />,
    emoji: "🎀",
    view1: {
      gifUrl: "https://media.tenor.com/images/a8321035171780445479255776654877/tenor.gif", // Holding hands/Promise
      citeText: "Promises are the uniquely human way of ordering the future."
    },
    view2: {
      title: "My Vow to You",
      image: "https://picsum.photos/400/300?random=5",
      text: "I promise to be your biggest cheerleader, your safe space, and your partner in crime forever."
    }
  },
  {
    id: 6,
    dayName: "Hug Day",
    date: "Feb 12",
    fullDate: getDate(12),
    icon: <Moon className="w-6 h-6" />,
    emoji: CustomHugEmoji,
    view1: {
      gifUrl: "https://media.tenor.com/images/42981504381745480749065609457223/tenor.gif", // Tight hug
      citeText: "One hug from you clears all my worries."
    },
    view2: {
      title: "Warm Embrace",
      image: "https://picsum.photos/400/300?random=6",
      text: "Wrapping you in a warm hug today and always. You are my safe harbor."
    }
  },
  {
    id: 7,
    dayName: "Kiss Day",
    date: "Feb 13",
    fullDate: getDate(13),
    icon: <Camera className="w-6 h-6" />,
    emoji: "💋",
    view1: {
      gifUrl: "https://media.tenor.com/images/73735165842811475960099436737330/tenor.gif", // Kissing
      citeText: "A kiss is a secret told to the mouth instead of the ear."
    },
    view2: {
      title: "Sealed with a Kiss",
      image: "https://picsum.photos/400/300?random=7",
      text: "Sending you a million kisses to brighten your day. Mwah!"
    }
  },
  {
    id: 8,
    dayName: "Valentine's Day",
    date: "Feb 14",
    fullDate: getDate(14),
    icon: <Music className="w-6 h-6" />,
    emoji: "❤️",
    view1: {
      gifUrl: "https://media.tenor.com/images/e7759810486759714856029906646545/tenor.gif", // Love hearts
      citeText: "Loved you yesterday, love you still, always have, always will."
    },
    view2: {
      title: "My Forever Valentine",
      image: "https://picsum.photos/400/300?random=8",
      text: "You are the best thing that ever happened to me. Happy Valentine's Day, my love!"
    }
  }
];

export const THEMES: Theme[] = [
  {
    id: 'classic-rose',
    name: 'Classic Rose',
    isDark: false,
    colors: {
      50: '#fff1f2',
      100: '#ffe4e6',
      200: '#fecdd3',
      300: '#fda4af',
      400: '#fb7185',
      500: '#f43f5e',
      600: '#e11d48',
      700: '#be123c',
      800: '#9f1239',
      900: '#881337',
    }
  },
  {
    id: 'midnight-passion',
    name: 'Midnight Passion',
    isDark: true,
    colors: {
      // Inverted Palette for Dark Mode
      // 50 is Background (Dark), 900 is Text (Light)
      50: '#0f0505',  // Very dark red/black bg
      100: '#2a0a10', // Dark card bg
      200: '#450a1f',
      300: '#701a3c', // Border
      400: '#9b224d',
      500: '#d63066', // Highlight
      600: '#f43f5e', // Primary Action
      700: '#fda4af',
      800: '#ffe4e6', // High contrast text
      900: '#fff1f2', // Title text
    }
  },
  {
    id: 'starry-night',
    name: 'Starry Night',
    isDark: true,
    colors: {
      50: '#020617', // Slate 950 (Deep Space)
      100: '#0f172a', // Slate 900
      200: '#1e293b', // Slate 800
      300: '#334155', // Slate 700
      400: '#475569', // Slate 600
      500: '#f59e0b', // Amber 500 (Golden Stars) - Primary
      600: '#fbbf24', // Amber 400 - Highlight
      700: '#cbd5e1', // Slate 300 - Text
      800: '#e2e8f0', // Slate 200 - High Contrast Text
      900: '#f8fafc', // Slate 50 - Titles
    }
  },
  {
    id: 'nebula-dreams',
    name: 'Nebula Dreams',
    isDark: true,
    colors: {
      50: '#0f0314', // Deep Violet Black
      100: '#260a2f', // Dark Purple Card
      200: '#451252',
      300: '#6d1d7a',
      400: '#9b2dad',
      500: '#d946ef', // Fuchsia 500 - Neon Pink/Purple
      600: '#e879f9', // Fuchsia 400
      700: '#f5d0fe', // Light Purple Text
      800: '#fae8ff', // Lighter Text
      900: '#ffffff', // White Titles
    }
  },
  {
    id: 'golden-sunset',
    name: 'Golden Sunset',
    isDark: false,
    colors: {
      50: '#fffbeb', // Amber 50
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    }
  },
  {
    id: 'enchanted-forest',
    name: 'Enchanted Forest',
    isDark: false,
    colors: {
      50: '#f0fdf4', // Emerald 50
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    }
  },
  {
    id: 'royal-lavender',
    name: 'Royal Lavender',
    isDark: false,
    colors: {
      50: '#faf5ff', // Purple 50
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7e22ce',
      800: '#6b21a8',
      900: '#581c87',
    }
  }
];