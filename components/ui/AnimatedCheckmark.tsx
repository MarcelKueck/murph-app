// components/ui/AnimatedCheckmark.tsx
'use client';

import { motion } from 'framer-motion';

const AnimatedCheckmark = () => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="18" // Adjust size as needed
      height="18"
      strokeWidth="2.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary-foreground" // Color matches button text
    >
      <motion.path
        d="M5 13l4 4L19 7"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
      />
    </motion.svg>
  );
};

export default AnimatedCheckmark;