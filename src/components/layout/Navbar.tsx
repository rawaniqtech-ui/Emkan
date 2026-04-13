'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS, BRAND } from '@/lib/constants';
import { useTheme } from './ThemeProvider';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60);
          const total = document.body.scrollHeight - window.innerHeight;
          setScrollProgress(total > 0 ? window.scrollY / total : 0);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          scrolled
            ? 'bg-surface-primary/85 dark:bg-[#1E1535]/80 backdrop-blur-xl shadow-sm'
            : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="التنقل الرئيسي"
      >
        {/* Gradient bottom border — only when scrolled */}
        {scrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-l from-transparent via-brand-teal/30 to-transparent" />
        )}

        <div className="max-w-[1200px] mx-auto px-4 md:px-12">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 md:gap-3 group min-w-0" aria-label="الصفحة الرئيسية">
              <Image
                src="/images/logo-icon.jpg"
                alt="شعار إمكان المستقبل"
                width={36}
                height={36}
                className={`rounded-lg transition-all duration-500 group-hover:scale-95 shrink-0 md:w-10 md:h-10 ${
                  scrolled ? 'scale-90' : ''
                }`}
                priority
              />
              <div className="flex flex-col min-w-0">
                <span className="font-display font-bold text-brand-text text-xs md:text-sm leading-tight truncate">
                  {BRAND.name.ar}
                </span>
                <span className="text-xs text-brand-text-muted tracking-wider truncate">
                  {BRAND.name.en}
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-sm font-body transition-colors duration-300 py-2 ${
                    pathname === item.href
                      ? 'text-brand-text dark:text-brand-teal font-medium'
                      : 'text-brand-text-muted dark:text-white/60 hover:text-brand-text dark:hover:text-brand-teal'
                  }`}
                >
                  {item.label}
                  {/* Animated dot indicator instead of underline */}
                  {pathname === item.href && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-teal transition-all duration-300" />
                  )}
                </Link>
              ))}

              {/* Theme Toggle */}
              <button
                onClick={toggle}
                className="w-9 h-9 rounded-full bg-surface-secondary dark:bg-white/5 flex items-center justify-center text-brand-text-muted dark:text-white/60 hover:text-brand-text dark:hover:text-brand-teal transition-all duration-300 hover:scale-105 hover:rotate-12"
                aria-label={theme === 'dark' ? 'تبديل إلى الوضع الفاتح' : 'تبديل إلى الوضع الداكن'}
              >
                {theme === 'dark' ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                )}
              </button>

              {/* CTA with pulse glow */}
              <Link
                href="/contact"
                className="relative bg-brand-purple dark:bg-brand-teal dark:text-brand-purple text-white text-xs font-bold px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-brand-teal/20 transition-all duration-300 hover:scale-[0.97] active:scale-[0.95] overflow-hidden"
              >
                <span className="relative z-10">احجز استشارة</span>
                {/* Pulse glow */}
                <span className="absolute inset-0 rounded-full bg-brand-teal/20 animate-ping opacity-20" />
              </Link>
            </div>

            {/* Mobile: Toggle + Hamburger */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggle}
                className="w-11 h-11 rounded-full bg-surface-secondary dark:bg-white/5 flex items-center justify-center text-brand-text-muted dark:text-white/60"
                aria-label={theme === 'dark' ? 'الوضع الفاتح' : 'الوضع الداكن'}
              >
                {theme === 'dark' ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                )}
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="w-11 h-11 flex flex-col items-center justify-center gap-1.5 rounded-full hover:bg-surface-secondary/50 transition-colors"
                aria-label={mobileOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
                aria-expanded={mobileOpen}
              >
                <span className={`block w-5 h-[2px] bg-brand-text dark:bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
                <span className={`block w-3 h-[2px] bg-brand-text dark:bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-5 h-[2px] bg-brand-text dark:bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll progress bar at bottom of navbar */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-brand-teal transition-none" style={{ width: `${scrollProgress * 100}%` }} />
      </nav>

      {/* Mobile Side Drawer — only mount when open.
          backdrop-blur on a hidden child bleeds through visibility:hidden in Chromium,
          so we unmount the whole thing instead of toggling classes. */}
      {mobileOpen && (
      <div
        className="fixed inset-0 z-[999] md:hidden transition-opacity duration-300 opacity-100"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />

        {/* Drawer panel — only mounts when open, so starts at translate-x-0 */}
        <div
          className="absolute top-0 right-0 h-full w-[280px] bg-surface-primary shadow-2xl animate-slide-in-right"
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between p-5 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-2">
              <Image src="/images/logo-icon.jpg" alt="" width={32} height={32} loading="lazy" quality={70} className="rounded-lg" />
              <span className="font-display font-bold text-brand-text text-sm">{BRAND.name.ar}</span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="w-10 h-10 rounded-full bg-surface-secondary dark:bg-white/5 flex items-center justify-center"
              aria-label="إغلاق القائمة"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>

          {/* Drawer links — staggered entrance */}
          <div className="p-5 flex flex-col gap-1">
            {NAV_ITEMS.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-base font-body py-3 px-4 rounded-xl min-h-[44px] flex items-center opacity-0 animate-fade-slide-up ${
                  pathname === item.href
                    ? 'text-brand-text dark:text-brand-teal font-medium bg-brand-teal/10'
                    : 'text-brand-text-muted dark:text-white/60 hover:bg-surface-secondary'
                }`}
                style={{ animationDelay: `${150 + i * 50}ms`, animationFillMode: 'forwards' }}
              >
                {pathname === item.href && (
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-teal ml-2 shrink-0" />
                )}
                {item.label}
              </Link>
            ))}

            {/* CTA */}
            <Link
              href="/contact"
              className="bg-brand-purple dark:bg-brand-teal dark:text-brand-purple text-white text-sm font-bold px-6 py-3.5 rounded-xl text-center mt-4 min-h-[44px] flex items-center justify-center opacity-0 animate-fade-slide-up"
              style={{ animationDelay: `${150 + NAV_ITEMS.length * 50}ms`, animationFillMode: 'forwards' }}
            >
              احجز استشارة
            </Link>
          </div>
        </div>
      </div>
      )}
    </>
  );
}
