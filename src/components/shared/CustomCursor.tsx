'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, .cursor-expand';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Don't show on touch devices — maxTouchPoints catches iPad and hybrids
    // that the legacy `'ontouchstart' in window` check sometimes misses.
    if ('ontouchstart' in window || (navigator.maxTouchPoints ?? 0) > 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const xTo = gsap.quickTo(follower, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(follower, 'y', { duration: 0.5, ease: 'power3.out' });
    const cursorX = gsap.quickTo(cursor, 'x', { duration: 0.1, ease: 'power2.out' });
    const cursorY = gsap.quickTo(cursor, 'y', { duration: 0.1, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      cursorX(e.clientX);
      cursorY(e.clientY);
      xTo(e.clientX);
      yTo(e.clientY);
    };

    // Use event delegation instead of binding to every element
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest(INTERACTIVE_SELECTOR)) {
        gsap.to(follower, { scale: 2.5, opacity: 0.15, duration: 0.3, ease: 'power2.out' });
        gsap.to(cursor, { scale: 0, duration: 0.2 });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as Element;
      const related = e.relatedTarget as Element | null;
      if (target.closest(INTERACTIVE_SELECTOR) && !related?.closest(INTERACTIVE_SELECTOR)) {
        gsap.to(follower, { scale: 1, opacity: 0.4, duration: 0.3, ease: 'power2.out' });
        gsap.to(cursor, { scale: 1, duration: 0.2 });
      }
    };

    const handleMouseDown = () => gsap.to(follower, { scale: 0.7, duration: 0.15 });
    const handleMouseUp = () => gsap.to(follower, { scale: 1, duration: 0.15 });

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-brand-purple dark:bg-brand-teal pointer-events-none z-[10001] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-brand-purple/40 dark:border-brand-teal/40 pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 hidden md:block mix-blend-difference"
        style={{ willChange: 'transform', opacity: 0.4 }}
      />
    </>
  );
}
