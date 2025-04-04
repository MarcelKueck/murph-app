// components/core/Logo.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Animation variants for the SVG paths
const drawVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => { // Custom function for staggering
    const delay = 0.1 + i * 0.18; // Adjust stagger timing
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.1, bounce: 0 },
        opacity: { delay, duration: 0.01 }
      }
    };
  }
};

// Variant for the nose to fade in
const noseVariant = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.7, duration: 0.3 } } // Fade and scale in
}

const Logo = () => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24" // Keep 24x24 viewbox
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5" // Keep slightly thinner stroke
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-brand-primary" // Use brand color
      initial="hidden"
      animate="visible"
    >
      {/* Path 1: Left Ear + Side */}
      <motion.path
        d="M8 5 L4 9 V14 C4 17, 7 19, 9 17" // More defined ear, slight curve at bottom jaw
        variants={drawVariants}
        custom={0}
      />
      {/* Path 2: Right Ear + Side */}
       <motion.path
        d="M16 5 L20 9 V14 C20 17, 17 19, 15 17" // Symmetric to left side
        variants={drawVariants}
        custom={1}
      />
      {/* Path 3: Top Head Outline */}
       <motion.path
        d="M8 5 C9.5 3.5, 14.5 3.5, 16 5" // Curve connecting the ears
        variants={drawVariants}
        custom={2}
      />
       {/* Path 4: Muzzle Bridge/Top */}
       <motion.path
        // d="M9 14 Q 12 13.5, 15 14" // Slight downward curve for muzzle top
        d="M9 17 C 10 16, 14 16, 15 17" // Connect the bottom jaw points - simpler
        variants={drawVariants}
        custom={3}
      />

       {/* Nose - Slightly larger, fades/scales in */}
       <motion.circle
         cx="12"
         cy="15.5" // Position nose
         r="1.2" // Slightly larger radius
         fill="currentColor"
         variants={noseVariant}
         strokeWidth="0"
       />

       <title>Murph Logo - Dog</title> {/* Accessibility */}
    </motion.svg>
  );
};

export default Logo;