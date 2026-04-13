'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Varied easing curves — the key to not looking AI-generated
export const EASINGS = {
  heroReveal: 'power4.out',
  cardEntrance: 'back.out(1.7)',
  textReveal: 'power2.out',
  statsCount: 'expo.out',
  subtleSlide: 'power3.out',
  smooth: 'power2.inOut',
  bounce: 'elastic.out(1, 0.5)',
} as const;

// Create a text reveal animation (lines slide in from right for RTL)
export function createTextReveal(
  element: HTMLElement | string,
  options?: { delay?: number; stagger?: number; duration?: number }
) {
  const { delay = 0, stagger = 0.12, duration = 0.9 } = options || {};

  return gsap.from(element, {
    x: 60,
    opacity: 0,
    duration,
    delay,
    stagger,
    ease: EASINGS.textReveal,
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  });
}

// Create a staggered card entrance with varied easing
export function createCardStagger(
  cards: HTMLElement[] | string,
  options?: { fromDirection?: 'bottom' | 'right' | 'left'; stagger?: number }
) {
  const { fromDirection = 'bottom', stagger = 0.1 } = options || {};

  const fromVars: gsap.TweenVars = {
    opacity: 0,
    duration: 0.7,
    stagger,
    ease: EASINGS.cardEntrance,
    scrollTrigger: {
      trigger: cards,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  };

  switch (fromDirection) {
    case 'bottom':
      fromVars.y = 40;
      break;
    case 'right':
      fromVars.x = 50;
      break;
    case 'left':
      fromVars.x = -50;
      break;
  }

  return gsap.from(cards, fromVars);
}

// Create a parallax effect (desktop only — scrub is too costly on mobile)
export function createParallax(
  element: HTMLElement | string,
  speed: number = 0.3
) {
  if (typeof window !== 'undefined' && window.innerWidth < 1024) return null;
  return gsap.to(element, {
    y: () => -100 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}

// Create a line drawing animation (for decorative lines, timelines)
export function createLineDraw(
  element: SVGElement | string,
  options?: { duration?: number; delay?: number }
) {
  const { duration = 1.5, delay = 0 } = options || {};

  return gsap.from(element, {
    strokeDashoffset: (_, target: Element) => (target as SVGGeometryElement).getTotalLength?.() || 0,
    strokeDasharray: (_, target: Element) => (target as SVGGeometryElement).getTotalLength?.() || 0,
    duration,
    delay,
    ease: EASINGS.smooth,
    scrollTrigger: {
      trigger: element,
      start: 'top 75%',
      toggleActions: 'play none none none',
    },
  });
}

// Create a scale-up reveal (for images and videos)
export function createScaleReveal(
  element: HTMLElement | string,
  options?: { delay?: number; duration?: number; rotation?: number }
) {
  const { delay = 0, duration = 0.8, rotation = 0 } = options || {};

  return gsap.from(element, {
    scale: 0.85,
    opacity: 0,
    rotation,
    duration,
    delay,
    ease: EASINGS.subtleSlide,
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });
}

// Varied entrance directions for cards — each index enters from a different angle
export const CARD_DIRECTIONS = [
  { x: 30, y: 30 },   // 0: bottom-right
  { x: 0, y: 40 },    // 1: bottom
  { x: -30, y: 30 },  // 2: bottom-left
  { x: 0, y: -30 },   // 3: top
  { x: 40, y: 0 },    // 4: right
  { x: -40, y: 0 },   // 5: left
  { x: 0, y: 30 },    // 6: bottom (repeat)
] as const;

// Alternating easing curves for card entrances
export const CARD_EASINGS = ['power3.out', 'back.out(1.2)'] as const;

// Cleanup all ScrollTrigger instances
export function cleanupScrollTriggers() {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
}
