'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import Button from '@/components/shared/Button';
import LazyVideo from '@/components/shared/LazyVideo';
import { content } from '@/content/ar';

const ParticlesBackground = dynamic(() => import('@/components/shared/ParticlesBackground'), { ssr: false });

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      // Text and button slide up when section enters viewport
      gsap.fromTo(
        ref.current!.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
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
    <section className="relative overflow-hidden">
      {/* Background video — lazy loaded */}
      <LazyVideo
        src="/videos/children-playing.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        overlayClassName="absolute inset-0 bg-brand-purple/85 dark:bg-brand-purple-dark/90"
      />

      <ParticlesBackground inverted />


      <div
        ref={ref}
        className="relative z-[2] max-w-[800px] mx-auto text-center py-14 sm:py-24 md:py-32 px-5 sm:px-6"
      >
        <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-4 sm:mb-5 leading-tight">
          {content.home.cta.title}
        </h2>
        <p className="text-white/75 text-sm sm:text-base md:text-lg mb-7 sm:mb-10 max-w-md mx-auto leading-relaxed">
          {content.home.cta.subtitle}
        </p>
        <Button href="/contact" variant="white" size="lg" className="w-full sm:w-auto max-w-xs">
          {content.home.cta.button}
        </Button>
      </div>
    </section>
  );
}
