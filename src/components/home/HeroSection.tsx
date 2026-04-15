'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import dynamic from 'next/dynamic';
import Button from '@/components/shared/Button';
import TextReveal from '@/components/shared/TextReveal';
import { SoundWaveBars } from '@/components/shared/BrandDecor';
import { content } from '@/content/ar';

const ParticlesBackground = dynamic(() => import('@/components/shared/ParticlesBackground'), { ssr: false });
const TypeAnimation = dynamic(
  () => import('react-type-animation').then((m) => m.TypeAnimation),
  { ssr: false }
);

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from('.hero-line', {
        width: 0,
        duration: 0.8,
        ease: 'power2.inOut',
      })
        .from(
          '.hero-badge',
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.3'
        )
        .from(
          '.hero-subtitle',
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '+=0.6'
        )
        .from(
          '.hero-btn',
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(1.5)',
          },
          '-=0.2'
        )
        .from(
          '.hero-scroll',
          {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.2'
        );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 bg-surface-primary overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/children-learning.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-white/90 dark:bg-[#0F0B1A]/75" />
      <ParticlesBackground />

      {/* Decorative circles */}
      <div className="absolute top-1/4 right-[10%] w-48 md:w-72 h-48 md:h-72 rounded-full bg-brand-teal/[0.08] blur-3xl" />
      <div className="absolute bottom-1/4 left-[10%] w-56 md:w-96 h-56 md:h-96 rounded-full bg-brand-purple/[0.06] blur-3xl" />
      <SoundWaveBars color="teal" size="lg" className="absolute bottom-20 right-8 opacity-[0.18] animate-float-slow hidden md:flex" />

      <div ref={ref} className="relative z-[2] text-center px-5 sm:px-6 max-w-3xl w-full">
        {/* Decorative line */}
        <div className="hero-line w-10 sm:w-12 h-[2px] bg-brand-teal mx-auto mb-5 sm:mb-10 opacity-60" />

        {/* Badge */}
        <span className="hero-badge inline-block text-[11px] sm:text-xs text-brand-text-muted font-medium mb-4 sm:mb-8 px-2">
          {content.home.hero.badge}
        </span>

        {/* Title — letter-by-letter reveal */}
        <TextReveal
          as="h1"
          type="words"
          stagger={0.08}
          duration={1}
          className="font-display font-bold text-[34px] sm:text-5xl md:text-6xl lg:text-7xl text-brand-text leading-[1.05] mb-2 sm:mb-3"
        >
          {content.home.hero.title}
        </TextReveal>

        <TextReveal
          as="span"
          type="words"
          stagger={0.08}
          duration={0.7}
          delay={0.4}
          className="block font-display font-bold text-[34px] sm:text-5xl md:text-6xl lg:text-7xl text-brand-teal leading-[1.05] mb-5 sm:mb-8"
        >
          {content.home.hero.titleAccent}
        </TextReveal>

        {/* Subtitle */}
        <div className="hero-subtitle">
          <TypeAnimation
            sequence={[
              'معًا نطلق إمكاناتهم',
              3000,
              'نؤمن بأن لكل طفل قدرات كامنة',
              3000,
              'رحلة تطوير متكاملة وليست جلسات فقط',
              3000,
            ]}
            wrapper="p"
            speed={40}
            repeat={Infinity}
            className="text-brand-text-muted text-[13px] sm:text-base md:text-lg max-w-lg mx-auto mb-7 sm:mb-12 leading-relaxed min-h-[44px] sm:h-[50px]"
          />
        </div>

        {/* Buttons — full-width stacked on phone, side-by-side from sm */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-10 sm:mb-20 max-w-xs sm:max-w-none mx-auto">
          <div className="hero-btn w-full sm:w-auto">
            <Button href="/services" size="lg" className="w-full sm:w-auto">
              {content.home.hero.cta}
            </Button>
          </div>
          <div className="hero-btn w-full sm:w-auto">
            <Button href="/contact" variant="secondary" size="lg" className="w-full sm:w-auto">
              {content.home.hero.ctaSecondary}
            </Button>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll flex flex-col items-center gap-3">
          <span className="text-xs text-brand-text-muted">
            {content.home.hero.scrollHint}
          </span>
          <div className="w-[1px] h-9 bg-brand-teal animate-breathe origin-top" />
        </div>
      </div>
    </section>
  );
}
