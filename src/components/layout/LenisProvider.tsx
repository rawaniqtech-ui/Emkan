'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Height of the fixed navbar — matches the `scroll-mt-20 md:scroll-mt-24`
// applied to the anchored sections so the target isn't hidden under the nav.
const NAV_OFFSET = 88;

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    // On dual-core devices, Lenis + ScrollTrigger compound into 30fps scroll.
    // Native scroll is faster on weak hardware — skip Lenis entirely.
    const cores = navigator.hardwareConcurrency ?? 4;
    if (cores <= 2) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.12,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const rafCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Hash-anchor scrolling. Lenis intercepts native scroll so clicking
  // <Link href="/contact#registration"> updates the URL but doesn't move the
  // page. This effect listens for hash changes (same-page navigation) AND
  // runs once per route change to handle cross-page navigation, then scrolls
  // using Lenis if available or the native smooth-scroll fallback.
  useEffect(() => {
    const scrollToHash = (rawHash: string) => {
      const hash = rawHash.replace(/^#/, '');
      if (!hash) return;

      // The target element may not be mounted yet on first paint — retry a
      // few frames. Cheap (~50ms max) and avoids timing races on route change.
      let attempts = 0;
      const tryScroll = () => {
        const el = document.getElementById(hash);
        if (el) {
          const lenis = lenisRef.current;
          if (lenis) {
            lenis.scrollTo(el, { offset: -NAV_OFFSET, duration: 1.2 });
          } else {
            // Fallback: scroll-mt-20 on the element handles the offset.
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          return;
        }
        if (attempts++ < 20) requestAnimationFrame(tryScroll);
      };
      tryScroll();
    };

    // Case 1: cross-page navigation landed here with a hash in the URL.
    if (window.location.hash) {
      // Slight delay so the page has a chance to mount its sections.
      const t = setTimeout(() => scrollToHash(window.location.hash), 80);
      return () => clearTimeout(t);
    }
  }, [pathname]);

  useEffect(() => {
    // Case 2: hash-only navigation (already on the current page, URL hash changes).
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const id = hash.replace(/^#/, '');
      const el = document.getElementById(id);
      if (!el) return;
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(el, { offset: -NAV_OFFSET, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return <>{children}</>;
}
