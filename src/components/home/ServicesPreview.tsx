'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '@/components/shared/SectionHeading';
import Button from '@/components/shared/Button';
import { useCardTilt } from '@/hooks/useCardTilt';
import { IconSpeech, IconBehavior, IconLearning } from '@/components/shared/BrandIcons';
import { content } from '@/content/ar';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ICONS = [IconSpeech, IconBehavior, IconLearning];

export default function ServicesPreview() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.children;
    const ctx = gsap.context(() => {
      const easings = ['back.out(1.7)', 'power3.out', 'elastic.out(1, 0.8)'];
      const directions = [
        { x: 40, y: 20, rotation: 2 },
        { x: 0, y: 40, rotation: 0 },
        { x: -40, y: 20, rotation: -2 },
      ];

      Array.from(cards).forEach((card, i) => {
        gsap.from(card as HTMLElement, {
          ...directions[i],
          opacity: 0,
          duration: 0.8,
          delay: i * 0.12,
          ease: easings[i],
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-12 md:py-20 lg:py-28 px-4 sm:px-6 md:px-12 bg-surface-primary relative overflow-hidden">
      {/* Gradient blob */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-purple/[0.02] rounded-full blur-[120px]" />
      {/* Top separator */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-l from-transparent via-[var(--border-subtle)] to-transparent" />
      <div className="relative z-[1] max-w-[1100px] mx-auto">
        <SectionHeading
          label={content.home.servicesPreview.sectionLabel}
          title={content.home.servicesPreview.title}
        />

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1.2fr] gap-4 sm:gap-6">
          {content.home.servicesPreview.services.map((service, i) => (
            <ServiceCard key={i} service={service} Icon={ICONS[i]} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button href="/services" variant="secondary">
            {content.home.servicesPreview.link}
          </Button>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, Icon }: { service: { title: string; desc: string }; Icon: typeof IconSpeech }) {
  const { handleMouseMove, handleMouseLeave } = useCardTilt(6);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="p-6 sm:p-8 md:p-10 bg-white dark:bg-surface-card rounded-2xl border border-[var(--border-subtle)] hover:border-[var(--border-hover)] transition-colors duration-300 group cursor-pointer will-change-transform"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="w-12 h-12 rounded-xl bg-brand-teal/10 dark:bg-brand-teal/5 border border-brand-teal/20 flex items-center justify-center mb-5 text-brand-teal group-hover:scale-110 transition-transform duration-300">
        <Icon size={28} />
      </div>
      <h3 className="font-display font-bold text-lg text-brand-text mb-3">
        {service.title}
      </h3>
      <p className="text-sm text-brand-text-muted leading-relaxed mb-6">
        {service.desc}
      </p>
      <div className="w-8 h-[2px] bg-brand-teal/40 group-hover:w-16 transition-all duration-500" />
    </div>
  );
}
