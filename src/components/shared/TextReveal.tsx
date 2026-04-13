'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  type?: 'words' | 'lines' | 'block';
  stagger?: number;
  duration?: number;
  delay?: number;
  scrub?: boolean;
}

export default function TextReveal({
  children,
  as: Tag = 'h2',
  className = '',
  type = 'words',
  stagger = 0.05,
  duration = 0.8,
  delay = 0,
  scrub = false,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const targets = type === 'block'
      ? [el]
      : Array.from(el.querySelectorAll('.text-reveal-unit'));

    if (targets.length === 0) return;

    // Disable scrub on mobile/tablet — scroll-coupled tweens are expensive
    const useScrub = scrub && window.innerWidth >= 1024;
    const scrollConfig = useScrub
      ? {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      : {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none' as const,
          },
        };

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        y: 50,
        opacity: 0,
        duration,
        delay,
        stagger: type === 'block' ? 0 : stagger,
        ease: 'power4.out',
        ...scrollConfig,
      });
    }, el);

    return () => ctx.revert();
  }, [type, stagger, duration, delay, scrub]);

  // For Arabic: never split by character — it breaks cursive connections
  // Split by words only, keeping each word as a whole unit
  if (type === 'block') {
    return (
      <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className}>
        {children}
      </Tag>
    );
  }

  if (type === 'lines') {
    const lines = children.split('\n');
    return (
      <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={`overflow-hidden ${className}`}>
        {lines.map((line, i) => (
          <span key={i} className="text-reveal-unit block">
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  // Words mode — safe for Arabic (each word stays connected)
  const words = children.split(' ').filter(Boolean);
  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={`overflow-hidden ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="text-reveal-unit inline-block" style={{ whiteSpace: 'nowrap' }}>
          {word}
          {i < words.length - 1 ? <span>&nbsp;</span> : null}
        </span>
      ))}
    </Tag>
  );
}
