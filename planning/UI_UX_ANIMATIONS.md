# Murph - Version 1.0: UI/UX Enhancement & Animation Plan

## 1. Goal

Create a visually stunning, modern, dynamic, and trustworthy user experience using subtle but impactful animations and micro-interactions. Leverage Framer Motion for sophisticated effects and Tailwind CSS for basic transitions.

## 2. Core Principles

*   **Subtlety:** Animations should enhance, not distract. Avoid overly flashy or slow effects.
*   **Performance:** Ensure animations are smooth and don't negatively impact performance, especially on mobile. Use hardware acceleration where possible (`transform`, `opacity`).
*   **Meaningful:** Animations should provide feedback, guide attention, or improve perceived performance.
*   **Consistency:** Apply similar animation patterns for similar interactions across the app.

## 3. Specific Animations & Effects (Implementation using Framer Motion / Tailwind)

1.  **Page Transitions (Optional, Subtle):**
    *   **Effect:** Gentle fade-in transition when navigating between pages.
    *   **Implementation:** Wrap page content in `motion.div` within layouts (`/app/layout.tsx`, `/app/patient/layout.tsx`, `/app/student/layout.tsx`) using `initial={{ opacity: 0 }}`, `animate={{ opacity: 1 }}`, `transition={{ duration: 0.3 }}`. Consider potential layout shifts.
    *   **Library:** Framer Motion (`motion.div`, `AnimatePresence` if needed).

2.  **List Item Entrance (Consultation Cards, Messages):**
    *   **Effect:** Items fade in and slightly slide up as they enter the viewport or when data loads. Stagger effect for multiple items loading simultaneously.
    *   **Implementation:** Wrap list items (`ConsultationCard`, `ChatMessage`) in a custom `AnimatedListItem` component using `motion.div`. Use `initial={{ opacity: 0, y: 20 }}`, `animate={{ opacity: 1, y: 0 }}`, `transition={{ duration: 0.4, ease: "easeOut" }}`. Use `staggerChildren` on the parent list container (`motion.ul` or `motion.div`).
    *   **Library:** Framer Motion (`motion.div`, `variants`, `staggerChildren`).

3.  **Button Micro-interactions:**
    *   **Effect (Primary CTAs - e.g., "Beratung anfordern", "Annehmen"):** Subtle scale-up/down on hover/focus (e.g., `scale: 1.03`). Gentle pulse effect on key CTAs to draw attention (subtle, slow scale oscillation).
    *   **Effect (General Buttons):** Smooth background color transitions on hover/focus.
    *   **Implementation:**
        *   Pulse/Scale: Framer Motion (`motion.button` with `whileHover`, `whileTap`, or repeating `animate` for pulse).
        *   Color Transitions: Tailwind CSS `transition-colors duration-200 ease-in-out`.
    *   **Library:** Framer Motion, Tailwind CSS.

4.  **Form Submission Feedback:**
    *   **Effect:** Loading spinner appears within the submit button when `isLoading` is true. Checkmark SVG animates briefly upon successful submission before redirect or state change.
    *   **Implementation:** Conditional rendering within the `Button` component. Animated checkmark SVG using Framer Motion (`motion.path` `d` or `pathLength` animation).
    *   **Library:** Framer Motion, SVGs.

5.  **Loading States:**
    *   **Effect:** Use Shadcn `Skeleton` components matching the shape of the content being loaded (e.g., Skeleton cards for consultation list). Consider a subtle pulsing animation on the skeletons. A central `LoadingSpinner` component (animated SVG) for full-page loads or significant sections.
    *   **Implementation:** Shadcn `Skeleton`, Custom `LoadingSpinner` with CSS or Framer Motion animation on SVG elements. Tailwind `animate-pulse` for skeletons.
    *   **Library:** Shadcn/ui, Tailwind CSS, Framer Motion (for custom spinner).

6.  **SVG Animations:**
    *   **Effect:** The main `Logo` could have a subtle animation on initial load. Loading indicators or success indicators can use animated SVGs.
    *   **Implementation:** Framer Motion `motion.svg` and `motion.path` properties (e.g., `pathLength`, `pathOffset`, `strokeDasharray`).
    *   **Library:** Framer Motion.

7.  **Hover Effects (Cards, Nav Links):**
    *   **Effect:** Gentle lift (slight `translateY` or `scale`) and/or subtle shadow increase on hover for interactive cards (`ConsultationCard`). Underline or background change for navigation links.
    *   **Implementation:** Tailwind CSS `transition`, `transform`, `hover:scale-102`, `hover:shadow-md`, `hover:translate-y-[-2px]`.
    *   **Library:** Tailwind CSS.

8.  **Layout Animations (Dashboard - Optional):**
    *   **Effect:** If dashboard layout changes based on filtering or tab switching, animate the rearrangement of elements smoothly.
    *   **Implementation:** Framer Motion `LayoutGroup` or `layout` prop on `motion.div` elements.
    *   **Library:** Framer Motion.

## 4. Implementation Notes

*   Create reusable animation variants in a constants file or within the `animations` component directory if applicable.
*   Ensure animations are disabled if the user prefers reduced motion (respect `prefers-reduced-motion` media query). Framer Motion often handles this automatically, but verify.
*   Test animations across different browsers and devices, paying attention to performance.
*   

## 5 Review 03.04.25:

# Murph - Version 1.0: UI/UX Enhancement & Animation Status

## 1. Goal

Create a visually stunning, modern, dynamic, and trustworthy user experience using subtle but impactful animations and micro-interactions with Framer Motion and Tailwind CSS.

## 2. Implementation Status

*   **Framer Motion Integration:** Installed and basic usage observed.
*   **Tailwind CSS Transitions:** Used for basic hover effects (implicitly via Shadcn components, potentially custom).
*   **Implemented Animations (Based on Code Review):**
    *   **List Item Entrance:** `ConsultationCard.tsx` uses `motion.div` with `variants` for a basic fade-in/slide-up effect (likely intended for use with `AnimatePresence` or viewport triggering).
    *   **Loading States:** `Skeleton` components from Shadcn used. Tailwind's `animate-spin` used for loader icons (`Loader2`).
*   **Planned Animations (From Initial Prompt - Mostly NOT Yet Implemented):**
    *   **Page Transitions:** Subtle fade-in between pages. *(Not Implemented)*
    *   **Button Micro-interactions:**
        *   Primary CTA pulse/scale effect. *(Not Implemented)*
        *   General button hover/focus scale. *(Not Implemented)*
        *   Smooth color transitions (partially via Tailwind/Shadcn defaults). *(Partially Implemented)*
    *   **Form Submission Feedback:** Animated checkmark on success. *(Not Implemented)*
    *   **Loading States:** Pulsing animation on skeletons. Custom animated SVG spinner for `LoadingSpinner.tsx`. *(Partially Implemented - Skeletons exist, pulse/custom spinner not)*
    *   **SVG Animations:** Main logo animation, other animated indicators. *(Not Implemented)*
    *   **Hover Effects (Cards, Nav Links):** Card lift/shadow increase. *(Not Implemented)*
    *   **Layout Animations (Dashboard):** Smooth transitions on tab change/filtering. *(Not Implemented)*

## 3. Conclusion

Basic animation setup (Framer Motion install, Tailwind transitions) is in place. Loading states use skeletons. Minimal entrance animation exists on `ConsultationCard`. However, the majority of the *specific, dynamic animations* requested in the initial prompt to achieve a "visually stunning" feel (button effects, page transitions, richer loading states, hover effects) **require implementation**. This area needs significant focus to meet the V1.0 UX goals.

## 4. Next Steps for V1.0

1.  Implement subtle **page transitions** using Framer Motion in layouts.
2.  Implement **list item entrance animations** consistently (e.g., ConsultationList, MessageList) with staggering.
3.  Implement **button micro-interactions** (pulse/scale) for primary CTAs.
4.  Add subtle **hover effects** (lift/shadow) to cards.
5.  Refine **loading state visuals** (pulsing skeletons, potentially animated logo/spinner).
6.  Implement **animated feedback** (e.g., checkmark) on successful form submissions.