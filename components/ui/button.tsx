// components/ui/button.tsx
'use client'; // <--- Add this directive at the top

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion"; // Import motion

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Define the interface including the new prop
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  animateInteraction?: boolean; // New prop for animation
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      animateInteraction = false, // Default to false
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    // Common motion props
    const motionProps = animateInteraction
      ? {
          whileHover: { scale: 1.03, transition: { type: "spring", stiffness: 300, damping: 15 } },
          whileTap: { scale: 0.98 },
        }
      : {};

    // Render conditionally based on asChild and animateInteraction
    if (animateInteraction) {
      if (asChild) {
        // If asChild is true, wrap the Slot with motion.span (or motion.div)
        return (
          <motion.span
            {...motionProps}
            style={{ display: 'inline-block' }} // Keep inline-block for layout consistency
          >
            <Slot
              ref={ref as any}
              data-slot="button"
              className={cn(buttonVariants({ variant, size, className }))}
              {...props}
            />
          </motion.span>
        );
      } else {
        // If not asChild, use motion.button
        const MotionButton = motion.button;
        return (
          <MotionButton
            ref={ref}
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...motionProps}
            {...props}
          />
        );
      }
    } else {
      // Original rendering without motion
      return (
        <Comp
          ref={ref}
          data-slot="button"
          className={cn(buttonVariants({ variant, size, className }))}
          {...props}
        />
      );
    }
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };