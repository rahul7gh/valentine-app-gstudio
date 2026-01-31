
import { DayData, Theme } from './types';
import { Heart, Gift, Camera, Music, Star, Sun, Moon, Smile } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();
const getDate = (day: number) => `${CURRENT_YEAR}-02-${day.toString().padStart(2, '0')}`;

export const LOCKED_MESSAGES = [
  "Hold your horses, gorgeous! 🐴",
  "Patience is a virtue! 😉",
  "Not yet! Good things take time. ⏳",
  "No peeking at the future! 🙈",
  "Wait for the magic moment! ✨",
  "I love your eagerness, but wait! ❤️",
  "Slow down, tiger! 🐯",
  "Future you will thank present you for waiting! 🎁",
  "Stop right there, beautiful! 🛑",
  "Not even a peek, sneaky! 🫣",
  "Don't rush perfection! 💅",
  "Saving this surprise for later! 🤐"
];

const CustomHugEmoji = (
  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.2" />
    </filter>
    <circle cx="50" cy="50" r="42" fill="var(--love-100)" filter="url(#shadow)" stroke="var(--love-200)" strokeWidth="1" />
    <path d="M 32 40 Q 38 34 44 40" fill="none" stroke="var(--love-900)" strokeWidth="3.5" strokeLinecap="round" opacity="0.6" />
    <path d="M 56 40 Q 62 34 68 40" fill="none" stroke="var(--love-900)" strokeWidth="3.5" strokeLinecap="round" opacity="0.6" />
    <ellipse cx="26" cy="52" rx="6" ry="3.5" fill="var(--love-400)" opacity="0.3" />
    <ellipse cx="74" cy="52" rx="6" ry="3.5" fill="var(--love-400)" opacity="0.3" />
    <path d="M 50 90 C 25 78 12 60 12 46 C 12 34 22 28 34 28 C 42 28 47 32 50 36 C 53 32 58 28 66 28 C 78 28 88 34 88 46 C 88 60 75 78 50 90 Z" fill="var(--love-500)" stroke="var(--love-700)" strokeWidth="1" filter="url(#shadow)" />
    <ellipse cx="22" cy="62" rx="8" ry="9" fill="var(--love-100)" stroke="var(--love-300)" strokeWidth="1" />
    <ellipse cx="78" cy="62" rx="8" ry="9" fill="var(--love-100)" stroke="var(--love-300)" strokeWidth="1" />
  </svg>
);

export const REASONS_I_LOVE_YOU = [
  "The way your eyes crinkle when you laugh.",
  "Your kindness towards everyone you meet.",
  "How you make me feel like the luckiest man alive.",
  "Your incredible strength and resilience.",
  "The way you always know how to make me smile.",
  "How passionate you are about your dreams.",
  "Your scent that feels like 'home'.",
  "The way you handle my quirks with patience.",
  "Our late-night deep conversations.",
  "The safety I feel when I'm in your arms.",
  "Your intelligence and the way you see the world.",
  "The way you're my best friend and lover all in one.",
  "How you encourage me to be my best self.",
  "The little dances you do when you're happy.",
  "Your beautiful soul that shines through everything.",
  "The way you look at me when you think I'm not looking.",
  "Your soft voice that calms my heart.",
  "The way we can be silly together without judgment.",
  "Your adventurous spirit.",
  "How you remember the smallest details about us.",
  "The way you love your family.",
  "Your cooking (especially when we do it together).",
  "The way you support me through my toughest days.",
  "Your beautiful hair that I love to touch.",
  "The way you say my name.",
  "Our shared dreams for our future home.",
  "The way you look in the morning sunlight.",
  "Your laugh that is my favorite sound in the world.",
  "The way you challenge me to grow.",
  "Your grace and elegance.",
  "The way you care for our future together.",
  "Your honesty and integrity.",
  "The way you light up any room you walk into.",
  "Our inside jokes that no one else understands.",
  "The way you're so thoughtful with gifts.",
  "Your warm hands in the winter.",
  "The way you're so brave.",
  "Your unique perspective on life.",
  "The way you trust me with your heart.",
  "Your beautiful smile that fixes my day.",
  "The way you're so generous.",
  "Your determination to succeed.",
  "The way you make every holiday feel special.",
  "Our quiet moments of just being together.",
  "The way you're my rock.",
  "Your ability to find beauty in the mundane.",
  "The way you're going to be the most amazing wife.",
  "Everything about you, just as you are.",
  "Because you are uniquely, wonderfully you."
];

export const GENERIC_MESSAGES = [
  "I love you more than words can say! ❤️",
  "You make my world brighter every day. 🌟",
  "Thinking of you is my favorite hobby. 💭",
  "You are my greatest adventure. 🚀",
  "My heart beats only for you. 💓",
  "Every moment with you is magic. ✨",
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
    loadingMessage: "Picking the best rose for you...",
    view1: {
      gifUrl: "day1.webp", // Bear holding rose
      citeText: "Just like this rose, my love for you blooms more every single day."
    },
    view2: {
      title: "For My Beautiful Rose",
      images: ["https://picsum.photos/400/500?random=11", "https://picsum.photos/400/500?random=12"],
      text: "You are the most beautiful flower in the garden of my life. Happy Rose Day, my love!",
      challenge: "Find a flower (or draw one!) and send me a picture.",
      aiPromptTheme: "roses and the beauty of a new blossoming marriage",
      buttonLabel: "Accept My Rose",
      closingSalutation: "With fragrant love,"
    }
  },
  {
    id: 2,
    dayName: "Propose Day",
    date: "Feb 8",
    fullDate: getDate(8),
    icon: <Gift className="w-6 h-6" />,
    emoji: "💍",
    loadingMessage: "Getting down on one knee...",
    view1: {
      gifUrl: "day2.webp", // Bear proposing
      citeText: "No grand words… just me, choosing you, every day."
    },
    view2: {
      title: "Marry Me (Again?)",
      images: ["https://picsum.photos/400/500?random=21", "https://picsum.photos/400/500?random=22"],
      text: "Every day I wake up and choose you. I can't wait to make it official.",
      challenge: "Photograph something that represents “us” to you",
      aiPromptTheme: "eternal promises and the joy of choosing each other forever",
      buttonLabel: "Say Yes!",
      closingSalutation: "Yours eternally,"
    }
  },
  {
    id: 3,
    dayName: "Chocolate Day",
    date: "Feb 9",
    fullDate: getDate(9),
    icon: <Star className="w-6 h-6" />,
    emoji: "🍫",
    loadingMessage: "Unwrapping something sweet...",
    view1: {
      gifUrl: "day3.webp", // Bears eating
      citeText: "Sweet like this chocolate, warm like the way you make me feel."
    },
    view2: {
      title: "Sweet Treats",
      images: ["https://picsum.photos/400/500?random=31", "https://picsum.photos/400/500?random=32"],
      text: "Sharing snacks and sweet moments with you is my favorite thing to do.",
      challenge: "Take a photo of your favorite chocolate's two pieces of chocolate side by side",
      aiPromptTheme: "the sweetness of love and how life with you is a treat",
      buttonLabel: "Yum!",
      closingSalutation: "Sweetly yours,"
    }
  },
  {
    id: 4,
    dayName: "Teddy Day",
    date: "Feb 10",
    fullDate: getDate(10),
    icon: <Smile className="w-6 h-6" />,
    emoji: "🧸",
    loadingMessage: "Sending fluffy vibes...",
    view1: {
      gifUrl: "day4.webp", // Happy bears / hugging
      citeText: "This one’s for you to hold—until I can!"
    },
    view2: {
      title: "Soft & Cuddly",
      images: ["https://picsum.photos/400/500?random=41", "https://picsum.photos/400/500?random=42"],
      text: "I promise to always be soft for you, to be your comfort when the world is hard.",
      challenge: "Photograph something that makes you feel safe or comforted today(something that really calms you down..)",
      aiPromptTheme: "warm hugs, softness, and the comfort of your presence",
      buttonLabel: "Snuggle Up",
      closingSalutation: "Beary much yours,"
    }
  },
  {
    id: 5,
    dayName: "Promise Day",
    date: "Feb 11",
    fullDate: getDate(11),
    icon: <Sun className="w-6 h-6" />,
    emoji: "🎀",
    loadingMessage: "Making a pinky promise...",
    view1: {
      gifUrl: "day5.webp", // Holding hands
      citeText: "Hand in hand, I promise to walk this life with you."
    },
    view2: {
      title: "My Vow",
      images: ["https://picsum.photos/400/500?random=51", "https://picsum.photos/400/500?random=52"],
      text: "I promise to hold your hand through the good times and the bad. You never have to walk alone.",
      challenge: "Write one promise for us on paper and photograph it",
      aiPromptTheme: "commitment, loyalty, and the sacred vows we will soon take",
      buttonLabel: "I Promise",
      closingSalutation: "Forever committed,"
    }
  },
  {
    id: 6,
    dayName: "Hug Day",
    date: "Feb 12",
    fullDate: getDate(12),
    icon: <Moon className="w-6 h-6" />,
    emoji: CustomHugEmoji,
    loadingMessage: "Squeezing tight...",
    view1: {
      gifUrl: "day6.webp", // Tight hug
      citeText: "This hug is my favorite place—right where you are."
    },
    view2: {
      title: "The Perfect Fit",
      images: ["https://picsum.photos/400/500?random=61", "https://picsum.photos/400/500?random=62"],
      text: "Your hugs heal everything. I'm sending you the biggest, tightest squeeze right now!",
      challenge: "Photo of two chairs / pillows / shoes next to each other",
      aiPromptTheme: "the security and warmth of a lifelong embrace",
      buttonLabel: "Squeeze Me",
      closingSalutation: "Holding you tight,"
    }
  },
  {
    id: 7,
    dayName: "Kiss Day",
    date: "Feb 13",
    fullDate: getDate(13),
    icon: <Camera className="w-6 h-6" />,
    emoji: "💋",
    loadingMessage: "Puckering up...",
    view1: {
      gifUrl: "day7.webp", // Kissing
      citeText: "A small kiss, carrying all the love I don’t always say"
    },
    view2: {
      title: "Kisses for You",
      images: ["https://picsum.photos/400/500?random=71", "https://picsum.photos/400/500?random=72"],
      text: "One kiss is all it takes to make my heart race. I love you!",
      challenge: "Create a small hand crafted note for me and share the picture (Keep the theme of the day in mind🤭)",
      aiPromptTheme: "passion, affection, and the thrill of your kiss",
      buttonLabel: "Mwah!",
      closingSalutation: "With endless kisses,"
    }
  },
  {
    id: 8,
    dayName: "Valentine's Day",
    date: "Feb 14",
    fullDate: getDate(14),
    icon: <Music className="w-6 h-6" />,
    emoji: "❤️",
    loadingMessage: "Here is my heart...",
    view1: {
      gifUrl: "day8.webp", // Heart / Sitting together
      citeText: "Loving you, just as you are, is my greatest joy"
    },
    view2: {
      title: "My Forever Valentine",
      images: ["https://picsum.photos/400/500?random=81", "https://picsum.photos/400/500?random=82"],
      text: "You are the best thing that ever happened to me. Happy Valentine's Day, my wife-to-be!",
      challenge: "Photo of your two favorite things side by side",
      aiPromptTheme: "the culmination of our love and our first Valentine as engaged partners",
      buttonLabel: "Forever Yours",
      closingSalutation: "Your Valentine,"
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
    id: 'endless-universe',
    name: 'Endless Universe',
    isDark: true,
    colors: {
      50: '#000000',      // Infinite Void
      100: '#030712',     // Deepest Space
      200: '#111827',     // Dark Matter
      300: '#1e293b',     // Outer Rim
      400: '#334155',     // Nebula Dust
      500: '#6366f1',     // Indigo Star (Primary Action)
      600: '#818cf8',     // Blue Giant
      700: '#a5b4fc',     // Starlight
      800: '#c7d2fe',     // Aurora
      900: '#ffffff',     // Pure Light
    }
  },
  {
    id: 'stardust-universe',
    name: 'Cosmos Stardust',
    isDark: true,
    colors: {
      50: '#020617',
      100: '#0f172a',
      200: '#1e293b',
      300: '#334155',
      400: '#475569',
      500: '#8b5cf6',
      600: '#a78bfa',
      700: '#c4b5fd',
      800: '#e2e8f0',
      900: '#f8fafc',
    }
  },
  {
    id: 'midnight-passion',
    name: 'Midnight Passion',
    isDark: true,
    colors: {
      50: '#0f0505',
      100: '#2a0a10',
      200: '#450a1f',
      300: '#701a3c',
      400: '#9b224d',
      500: '#d63066',
      600: '#f43f5e',
      700: '#fda4af',
      800: '#ffe4e6',
      900: '#fff1f2',
    }
  },
  {
    id: 'velvet-night',
    name: 'Velvet Night',
    isDark: true,
    colors: {
      50: '#0f0716',
      100: '#1a0f26',
      200: '#2d1b42',
      300: '#4c2a70',
      400: '#7b46a6',
      500: '#a855f7',
      600: '#c084fc',
      700: '#e9d5ff',
      800: '#f3e8ff',
      900: '#faf5ff',
    }
  },
  {
    id: 'enchanted-forest',
    name: 'Forest Whisper',
    isDark: true,
    colors: {
      50: '#020905',
      100: '#05160d',
      200: '#0a2818',
      300: '#12422a',
      400: '#18633d',
      500: '#10b981',
      600: '#34d399',
      700: '#a7f3d0',
      800: '#d1fae5',
      900: '#ecfdf5',
    }
  },
  {
    id: 'cozy-cocoa',
    name: 'Cozy Cocoa',
    isDark: true,
    colors: {
      50: '#18100c',
      100: '#291b15',
      200: '#3f2a20',
      300: '#634031',
      400: '#8c5943',
      500: '#ea580c',
      600: '#fdba74',
      700: '#fed7aa',
      800: '#ffedd5',
      900: '#fff7ed',
    }
  },
  {
    id: 'lavender-dream',
    name: 'Lavender Dream',
    isDark: false,
    colors: {
      50: '#f5f3ff',
      100: '#ede9fe',
      200: '#ddd6fe',
      300: '#c4b5fd',
      400: '#a78bfa',
      500: '#8b5cf6',
      600: '#7c3aed',
      700: '#6d28d9',
      800: '#5b21b6',
      900: '#4c1d95',
    }
  },
  {
    id: 'peach-sorbet',
    name: 'Peach Sorbet',
    isDark: false,
    colors: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316',
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
    }
  },
  {
    id: 'ocean-love',
    name: 'Ocean Whispers',
    isDark: false,
    colors: {
      50: '#f0fdfa',
      100: '#ccfbf1',
      200: '#99f6e4',
      300: '#5eead4',
      400: '#2dd4bf',
      500: '#14b8a6',
      600: '#0d9488',
      700: '#0f766e',
      800: '#115e59',
      900: '#134e4a',
    }
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour',
    isDark: false,
    colors: {
      50: '#fffbeb',
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
  }
];
