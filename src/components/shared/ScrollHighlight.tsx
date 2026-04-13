'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollHighlightProps {
  children: string;
  as?: 'p' | 'h2' | 'h3' | 'span';
  className?: string;
  highlightColor?: string;
}

export default function ScrollHighlight({
  children,
  as: Tag = 'p',
  className = '',
  highlightColor,
}: ScrollHighlightProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const words = el.querySelectorAll('.sh-word');
    const useScrub = window.innerWidth >= 1024;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.35 },
        {
          opacity: 1,
          stagger: 0.04,
          ease: 'none',
          duration: useScrub ? undefined : 0.6,
          scrollTrigger: useScrub
            ? { trigger: el, start: 'top 75%', end: 'bottom 50%', scrub: 1 }
            : { trigger: el, start: 'top 80%', toggleActions: 'play none none none' },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const wordElements = children.split(' ').filter(Boolean).map((word, i) => (
    <span
      key={i}
      className="sh-word inline-block transition-colors duration-100"
      style={highlightColor ? { color: highlightColor } : undefined}
    >
      {word}&nbsp;
    </span>
  ));

  return (
    <Tag ref={ref as React.RefObject<HTMLParagraphElement>} className={className}>
      {wordElements}
    </Tag>
  );
}
