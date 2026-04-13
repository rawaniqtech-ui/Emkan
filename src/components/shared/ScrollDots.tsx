'use client';

import { useState, useEffect } from 'react';

const SECTIONS = [
  { id: 'hero', label: 'الرئيسية' },
  { id: 'cards', label: 'المركز' },
  { id: 'about', label: 'من نحن' },
  { id: 'services', label: 'خدماتنا' },
  { id: 'journey', label: 'الرحلة' },
  { id: 'stats', label: 'الإنجازات' },
  { id: 'testimonials', label: 'الآراء' },
  { id: 'cta', label: 'تواصل' },
];

export default function ScrollDots() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((section, i) => {
      const el = document.getElementById(section.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(i);
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
      {SECTIONS.map((section, i) => (
        <button
          key={section.id}
          onClick={() => scrollTo(section.id)}
          className="group relative flex items-center"
          aria-label={section.label}
        >
          {/* Dot */}
          <div
            className={`rounded-full transition-all duration-300 ${
              active === i
                ? 'w-3 h-3 bg-brand-teal shadow-md shadow-brand-teal/30'
                : 'w-2 h-2 bg-brand-purple/20 dark:bg-white/20 hover:bg-brand-purple/40 dark:hover:bg-white/40'
            }`}
          />
          {/* Tooltip */}
          <span className="absolute right-full mr-3 bg-brand-purple dark:bg-surface-card text-white dark:text-brand-text text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            {section.label}
          </span>
        </button>
      ))}
    </div>
  );
}
