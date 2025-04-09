// components/core/Logo.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils'; // Ensure cn is imported if you add classes later

// Animation variants for drawing the path
const drawVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { type: "spring", duration: 1.5, bounce: 0 },
      opacity: { duration: 0.1 }
    }
  }
};

const Logo = () => {
  // Size is controlled by the parent container in Header.tsx
  return (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24" // Simple viewBox for a 24x24 icon baseline
        fill="none"
        stroke="currentColor" // Use current text color (like primary)
        strokeWidth="1.5" // Adjust stroke width as needed
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-full w-full" // Fill the container div
    >
        <title>Murph Stethoscope Logo</title>
        {/* Stethoscope Path Data (simplified) */}
        {/* Earpieces */}
        <motion.path
            d="M6 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
            variants={drawVariants}
            initial="hidden"
            animate="visible"
        />
        <motion.path
            d="M18 8.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Z"
             variants={drawVariants}
             initial="hidden"
             animate="visible"
             custom={0.2} // Slight delay if needed
        />
        {/* Tubing */}
         <motion.path
            d="M4.7 8.5C4.7 11 6 14 9 16.5 S 15 19 15 21.5"
            variants={drawVariants}
            initial="hidden"
            animate="visible"
            custom={0.4}
        />
         <motion.path
            d="M19.3 8.5c0 2.5-1.3 5.5-4.3 8 S 9 19 9 21.5"
            variants={drawVariants}
            initial="hidden"
            animate="visible"
            custom={0.6}
         />
        {/* Chest Piece (Diaphragm/Bell) */}
         <motion.path
            d="M9 21.5a3.5 3.5 0 0 0 7 0"
             variants={drawVariants}
             initial="hidden"
             animate="visible"
             custom={0.8}
         />
         {/* Optional: Small circle for bell */}
         <motion.circle
            cx="12.5"
            cy="21.5"
            r="1"
            stroke="none" // No stroke for the fill
            fill="currentColor" // Fill with current color
            variants={drawVariants} // Can reuse draw or use simple fade
            initial="hidden"
            animate="visible"
            custom={1.0}
         />
    </svg>
  );
};

export default Logo;