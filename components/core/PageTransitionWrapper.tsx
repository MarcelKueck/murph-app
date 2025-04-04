// components/core/PageTransitionWrapper.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionWrapperProps {
  children: React.ReactNode;
  className?: string; // Allow passing className
}

const PageTransitionWrapper: React.FC<PageTransitionWrapperProps> = ({ children, className }) => {
  return (
    <motion.main
      className={className} // Apply className here
      initial={{ opacity: 0, y: 5 }} // Start slightly down and invisible
      animate={{ opacity: 1, y: 0 }} // Fade in and move up to original position
      transition={{ duration: 0.4, ease: 'easeInOut' }} // Adjust duration/easing as needed
    >
      {children}
    </motion.main>
  );
};

export default PageTransitionWrapper;