// components/core/LoadingSpinner.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: number; // Size in pixels (e.g., 24 for 24x24)
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 24,
  className,
}) => {
  const strokeWidth = Math.max(1.5, size / 10); // Adjust stroke width based on size

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24" // Use a consistent viewBox
      fill="none"
      stroke="currentColor" // Use current text color
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('animate-spin', className)} // Apply Tailwind spin animation
      aria-label="Wird geladen..." // Accessibility
    >
      {/* Spinner path: A circle arc */}
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      {/* Optional: Add a stationary background circle for context */}
      {/* <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.2" strokeWidth={strokeWidth} fill="none" /> */}
    </svg>
  );
};

export default LoadingSpinner;