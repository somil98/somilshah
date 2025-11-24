import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  accentColor?: 'cyan' | 'orange';
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ children, onClick, accentColor = 'cyan' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 }); // Magnetic strength
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const borderColor = accentColor === 'cyan' ? 'group-hover:border-cyan-400' : 'group-hover:border-orange-400';
  const textColor = accentColor === 'cyan' ? 'group-hover:text-cyan-400' : 'group-hover:text-orange-400';
  const glowColor = accentColor === 'cyan' ? 'bg-cyan-500' : 'bg-orange-500';

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
      {/* Button Outline */}
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