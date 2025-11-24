import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const SolarSystem: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  // Position values for the tilt effect (-0.5 to 0.5 range)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the raw input values
  const springConfig = { stiffness: 150, damping: 15 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  // Map normalized position to rotation degrees
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [15, -15]); // Tilt X (Up/Down)
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-15, 15]); // Tilt Y (Left/Right)

  // 1. Mouse Interaction Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    // Calculate normalized mouse position from center (-0.5 to 0.5)
    const normalizedX = (e.clientX - rect.left) / width - 0.5;
    const normalizedY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // 2. Gyroscope Interaction Handler
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      // Return if no sensor data
      if (e.gamma === null || e.beta === null) return;

      // Define sensitivity range (degrees)
      const MAX_TILT = 30;
      
      // GAMMA: Left-to-Right tilt [-90, 90]
      // We clamp it to -30 to 30 for subtle effect
      const gamma = Math.max(-MAX_TILT, Math.min(MAX_TILT, e.gamma));
      const normX = gamma / (MAX_TILT * 2); // Map to -0.5 to 0.5

      // BETA: Front-to-Back tilt [-180, 180]
      // A phone is usually held at ~45 degrees. We center the effect there.
      const RESTING_ANGLE = 45;
      const beta = Math.max(RESTING_ANGLE - MAX_TILT, Math.min(RESTING_ANGLE + MAX_TILT, e.beta));
      const normY = (beta - RESTING_ANGLE) / (MAX_TILT * 2); // Map to -0.5 to 0.5

      x.set(normX);
      y.set(normY);
    };

    // Check availability and add listener
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
    };
  }, [x, y]);

  // Orbit definitions
  const orbits = [
    { radius: 60, duration: 4, color: '#ffffff', size: 4 },      // Inner / Mercury-ish
    { radius: 95, duration: 8, color: '#22d3ee', size: 6 },      // Middle / Cyan Accent
    { radius: 135, duration: 15, color: '#fb923c', size: 5 },    // Outer / Orange Accent
  ];

  return (
    <div 
      ref={ref}
      className="relative w-80 h-80 flex items-center justify-center cursor-pointer perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full flex items-center justify-center transform-style-3d"
        style={{ 
          rotateX, 
          rotateY,
          perspective: 1000
        }}
      >
        {/* Central Star (Sun) */}
        <motion.div 
          className="absolute w-12 h-12 bg-white rounded-full shadow-[0_0_30px_rgba(255,255,255,0.4)] z-10"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Orbits and Planets */}
        {orbits.map((orbit, index) => (
          <div 
            key={index}
            className="absolute rounded-full border border-white/10"
            style={{ 
              width: orbit.radius * 2, 
              height: orbit.radius * 2,
            }}
          >
            <motion.div
              className="absolute w-full h-full"
              animate={{ rotate: 360 }}
              transition={{ 
                duration: orbit.duration, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                style={{ 
                  width: orbit.size, 
                  height: orbit.size, 
                  backgroundColor: orbit.color 
                }}
                whileHover={{ scale: 2 }}
              />
            </motion.div>
          </div>
        ))}

        {/* Decorative subtle gradient background for depth */}
        <div className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent opacity-0 hover:opacity-10 transition-opacity duration-500 rounded-full pointer-events-none" />
      </motion.div>
    </div>
  );
};