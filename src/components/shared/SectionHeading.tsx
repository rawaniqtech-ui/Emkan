'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'right';
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = 'center',
  light = false,
  className = '',
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current!.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className={`${align === 'center' ? 'text-center' : 'text-right'} mb-8 sm:mb-12 md:mb-16 ${className}`}
    >
      {label && (
        <span
          className={`inline-block text-xs tracking-[0.2em] font-medium mb-4 ${
            light ? 'text-brand-teal-light' : 'text-brand-purple dark:text-brand-teal'
          }`}
        >
          {label}
        </span>
      )}
      <h2
        className={`font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-4 ${
          light ? 'text-white' : 'text-brand-text'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-sm sm:text-base md:text-lg max-w-xl leading-relaxed ${
            align === 'center' ? 'mx-auto' : ''
          } ${light ? 'text-white/60' : 'text-brand-text-muted'}`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`w-12 h-[2px] bg-brand-teal mt-6 ${
          align === 'center' ? 'mx-auto' : 'mr-0'
        }`}
      />
    </div>
  );
}
