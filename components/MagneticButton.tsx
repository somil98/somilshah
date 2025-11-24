import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  theme?: 'tech' | 'nature';
  variant?: 'primary' | 'secondary';
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  onClick, 
  theme = 'tech',
  variant = 'primary' 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  // Styles based on theme and variant
  let borderColor = '';
  let textColor = '';
  let glowColor = '';

  if (theme === 'tech') {
    borderColor = variant === 'primary' ? 'group-hover:border-accent-cyan' : 'group-hover:border-accent-orange';
    textColor = variant === 'primary' ? 'group-hover:text-accent-cyan' : 'group-hover:text-accent-orange';
    glowColor = variant === 'primary' ? 'bg-accent-cyan' : 'bg-accent-orange';
  } else {
    // Nature Theme
    borderColor = variant === 'primary' ? 'group-hover:border-accent-emerald' : 'group-hover:border-accent-lime';
    textColor = variant === 'primary' ? 'group-hover:text-accent-emerald' : 'group-hover:text-accent-lime';
    glowColor = variant === 'primary' ? 'bg-accent-emerald' : 'bg-accent-lime';
  }

  return (
    <motion.div
      ref={ref}
      className="relative group cursor-pointer"
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={onClick}
    >
      <div className={`
        relative overflow-hidden
        px-8 py-3 rounded-full 
        border border-white/20 ${borderColor}
        bg-white/5 backdrop-blur-sm
        transition-colors duration-300 ease-out
      `}>
        {/* Hover Fill Effect */}
        <div className={`
          absolute inset-0 translate-y-full ${glowColor} opacity-10
          group-hover:translate-y-0 transition-transform duration-300 ease-in-out
        `} />

        {/* Text */}
        <span className={`
          relative z-10 text-sm font-medium tracking-widest uppercase
          text-white/80 ${textColor} transition-colors duration-300
        `}>
          {children}
        </span>
      </div>
    </motion.div>
  );
};