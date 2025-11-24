import React from 'react';
import { motion, Variants } from 'framer-motion';

export const BrainLogo: React.FC = () => {
  // Path definition for a stylized brain circuit
  const brainPath = "M50 35 C50 35 30 35 25 50 C20 65 25 80 40 90 C40 90 35 110 50 120 M50 35 C50 35 70 35 75 50 C80 65 75 80 60 90 C60 90 65 110 50 120 M50 35 L50 120";
  const circuitLeft = "M40 55 L30 55 M35 70 L25 70 M40 90 L30 100";
  const circuitRight = "M60 55 L70 55 M65 70 L75 70 M60 90 L70 100";
  
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.2, type: "spring", duration: 2, bounce: 0 },
        opacity: { delay: i * 0.2, duration: 0.01 }
      }
    })
  };

  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
      {/* Subtle background circle acting as a halo, sans glow */}
      <motion.div 
        className="absolute inset-0 rounded-full border border-white/5"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
      
      {/* Inner rotating ring */}
      <motion.div 
        className="absolute inset-4 rounded-full border border-dashed border-white/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
      />

      {/* The Brain Circuit SVG */}
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 100 150"
        initial="hidden"
        animate="visible"
        className="drop-shadow-2xl"
      >
        {/* Main Brain Outline */}
        <motion.path
          d={brainPath}
          stroke="white"
          strokeWidth="1.5"
          fill="transparent"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={draw}
          custom={0}
        />
        
        {/* Internal Circuits Left */}
        <motion.path
          d={circuitLeft}
          stroke="#22d3ee" // Cyan accent
          strokeWidth="1"
          fill="transparent"
          strokeLinecap="round"
          variants={draw}
          custom={1}
        />

        {/* Internal Circuits Right */}
        <motion.path
          d={circuitRight}
          stroke="#fb923c" // Orange accent
          strokeWidth="1"
          fill="transparent"
          strokeLinecap="round"
          variants={draw}
          custom={1.5}
        />

        {/* Connecting Nodes (Dots) */}
        <motion.circle cx="50" cy="35" r="2" fill="white" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1}} />
        <motion.circle cx="50" cy="75" r="1.5" fill="white" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2}} />
        <motion.circle cx="50" cy="120" r="2" fill="white" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.4}} />
        
        {/* Animated Pulse on center node */}
        <motion.circle 
          cx="50" 
          cy="75" 
          r="4" 
          stroke="white" 
          strokeWidth="0.5" 
          fill="transparent"
          animate={{ scale: [1, 2], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.svg>
    </div>
  );
};