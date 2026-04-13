'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BRAND } from '@/lib/constants';

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setVisible(window.scrollY > window.innerHeight * 0.7);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-16 md:top-20 left-0 right-0 z-[998] transition-all duration-400 ${
        visible
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-brand-purple dark:bg-brand-purple-dark border-b border-brand-purple-light/20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-12 min-h-[44px] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-display font-bold text-white/90 text-xs truncate">
              {BRAND.name.ar}
            </span>
            <span className="text-white/30 hidden sm:inline">—</span>
            <span className="text-white/50 text-[11px] hidden sm:inline truncate">
              {BRAND.tagline.ar}
            </span>
          </div>

          <Link
            href="/contact"
            className="shrink-0 bg-brand-teal text-brand-purple-dark text-xs font-bold px-5 py-2 rounded-full hover:bg-brand-teal-light transition-all duration-300 hover:scale-[0.97] active:scale-[0.95] min-h-[44px] flex items-center"
          >
            احجز استشارة مجانية
          </Link>
        </div>
      </div>
    </div>
  );
}
