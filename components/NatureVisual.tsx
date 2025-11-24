import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const NatureVisual: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 20 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  // Parallax layers move at different speeds
  const layer1X = useTransform(smoothX, [-0.5, 0.5], [-10, 10]); // Back
  const layer2X = useTransform(smoothX, [-0.5, 0.5], [-25, 25]); // Middle
  const layer3X = useTransform(smoothX, [-0.5, 0.5], [-40, 40]); // Front
  
  const layer1Y = useTransform(smoothY, [-0.5, 0.5], [-5, 5]);
  const layer2Y = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);
  const layer3Y = useTransform(smoothY, [-0.5, 0.5], [-15, 15]);

  // Handle Mouse Interaction
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const normalizedX = (e.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Handle Gyroscope Interaction
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null) return;
      const MAX_TILT = 30;
      const gamma = Math.max(-MAX_TILT, Math.min(MAX_TILT, e.gamma));
      const beta = Math.max(0, Math.min(60, e.beta)); // Tilt primarily used for up/down looking
      
      x.set(gamma / (MAX_TILT * 2));
      y.set((beta - 30) / 60);
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    }
    return () => {
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
    };
  }, [x, y]);

  return (
    <div 
      ref={ref}
      className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center cursor-pointer overflow-hidden rounded-full mask-image-radial"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
        {/* Background Glow (Moon/Sun light) */}
        <motion.div 
            className="absolute top-10 right-10 w-24 h-24 bg-[#a3e635]/20 rounded-full blur-2xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 6, repeat: Infinity }}
        />

        {/* Mountain SVG Layers */}
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl overflow-visible">
            {/* Layer 1: Distant Peaks */}
            <motion.path 
                d="M-20 150 L30 80 L80 140 L120 70 L160 130 L220 100 L220 220 L-20 220 Z" 
                fill="#065f46" // Dark Green
                className="opacity-60"
                style={{ x: layer1X, y: layer1Y }}
            />
             
            {/* Layer 2: Mid Range */}
            <motion.path 
                d="M-30 220 L20 120 L70 180 L130 110 L230 220 Z" 
                fill="#047857" // Emerald
                className="opacity-80"
                style={{ x: layer2X, y: layer2Y }}
            />

            {/* Layer 3: Foreground */}
            <motion.path 
                d="M-10 220 L50 150 L100 220 L150 160 L220 220 Z" 
                fill="#064e3b" // Deepest Green
                style={{ x: layer3X, y: layer3Y }}
            />
        </svg>

        {/* Fireflies */}
        {[...Array(8)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#a3e635] rounded-full shadow-[0_0_8px_#a3e635]"
                initial={{ 
                    x: Math.random() * 300 - 150, 
                    y: Math.random() * 300 - 150, 
                    opacity: 0 
                }}
                animate={{ 
                    x: [Math.random() * 300 - 150, Math.random() * 300 - 150],
                    y: [Math.random() * 300 - 150, Math.random() * 300 - 150],
                    opacity: [0, 1, 0]
                }}
                transition={{ 
                    duration: 3 + Math.random() * 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    x: useTransform(smoothX, [-0.5, 0.5], [-20 * (i % 3 + 1), 20 * (i % 3 + 1)]),
                    y: useTransform(smoothY, [-0.5, 0.5], [-20 * (i % 3 + 1), 20 * (i % 3 + 1)])
                }}
            />
        ))}
    </div>
  );
};