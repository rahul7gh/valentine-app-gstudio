import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HEART_TYPES = [
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
  "M12 21.5l-1.35-1.1c-4.8-3.9-8-6.6-8-9.7 0-2.5 1.9-4.4 4.4-4.4 1.4 0 2.8.7 3.7 1.8.9-1.1 2.3-1.8 3.7-1.8 2.5 0 4.4 1.9 4.4 4.4 0 3.1-3.2 5.8-8 9.7l-1.35 1.1z",
];

interface FloatingHeartsProps {
  heartColors: string[];
}

const IndividualHeart = ({ colors, index }: { colors: string[]; index: number }) => {
  // We use the stringified colors array as a dependency to recalculate 
  // immediately when the theme changes.
  const config = useMemo(() => {
    const palette = colors.length > 0 ? colors : ['#ff4d6d'];
    return {
      size: Math.random() * (22 - 12) + 12,
      left: Math.random() * 100,
      duration: Math.random() * (18 - 12) + 12,
      delay: Math.random() * 15,
      color: palette[Math.floor(Math.random() * palette.length)],
      path: HEART_TYPES[Math.floor(Math.random() * HEART_TYPES.length)],
      rotation: Math.random() > 0.5 ? 360 : -360,
    };
  }, [colors, index]); // 'index' keeps the randomness stable per slot, 'colors' triggers the change

  return (
    <motion.svg
      // Adding a unique key based on color forces the heart to 
      // re-render immediately when the theme changes.
      key={`${index}-${config.color}`}
      viewBox="0 0 24 24"
      style={{
        position: 'absolute',
        left: `${config.left}%`,
        bottom: '-40px',
        width: config.size,
        fill: config.color,
        opacity: 0.6,
        pointerEvents: 'none',
        zIndex: 5,
      }}
      initial={{ y: 0, rotate: 0, opacity: 0 }}
      animate={{
        y: '-110vh',
        rotate: config.rotation,
        opacity: [0, 0.6, 0.6, 0],
      }}
      transition={{
        duration: config.duration,
        delay: config.delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <path d={config.path} />
    </motion.svg>
  );
};

const FloatingHearts: React.FC<FloatingHeartsProps> = ({ heartColors }) => {
  const heartSlots = useMemo(() => Array.from({ length: 12 }, (_, i) => i), []);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
      zIndex: 5,
    }}>
      {/* AnimatePresence helps with smooth transitions if you add exit animations later */}
      <AnimatePresence>
        {heartSlots.map((id) => (
          <IndividualHeart key={id} index={id} colors={heartColors} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingHearts;