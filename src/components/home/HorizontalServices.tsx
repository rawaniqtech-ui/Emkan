'use client';

import { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '@/components/shared/Button';
import { IconSpeech, IconTherapy, IconLearning, IconScreening } from '@/components/shared/BrandIcons';
import { CARD_DIRECTIONS, CARD_EASINGS } from '@/lib/animations';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const TiltCard = dynamic(() => import('@/components/shared/TiltCard'), { ssr: false });

const SERVICES = [
  {
    number: '٠١',
    title: 'علاج النطق والتخاطب',
    desc: 'تقييم وعلاج شامل لاضطرابات النطق واللغة والتواصل باستخدام أحدث الأساليب العلمية والتقنيات الحديثة',
    Icon: IconSpeech,
  },
  {
    number: '٠٢',
    title: 'تعديل السلوك',
    desc: 'برامج متخصصة مبنية على أسس تحليل السلوك التطبيقي لتنمية المهارات الاجتماعية والعاطفية لدى الأطفال',
    Icon: IconTherapy,
  },
  {
    number: '٠٣',
    title: 'تنمية مهارات التعلم',
    desc: 'تطوير المهارات الأكاديمية والمعرفية للأطفال وفق خطط تعليمية فردية مصممة لاحتياجات كل طفل',
    Icon: IconLearning,
  },
  {
    number: '٠٤',
    title: 'الفحص والمسح المدرسي',
    desc: 'الكشف المبكر في المدارس والروضات الحكومية والأهلية والعالمية لضمان حصول كل طفل على الدعم المناسب',
    Icon: IconScreening,
  },
];

export default function HorizontalServices() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.service-card');
    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        const dir = CARD_DIRECTIONS[i % CARD_DIRECTIONS.length];
        gsap.fromTo(card,
          { opacity: 0, x: dir.x, y: dir.y },
          { opacity: 1, x: 0, y: 0, duration: 0.7, delay: i * 0.12, ease: CARD_EASINGS[i % 2],
            scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' }
          }
        );
      });
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-12 md:py-20 lg:py-28 px-4 md:px-12 bg-surface-secondary relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[300px] md:h-[600px] bg-brand-teal/[0.05] rounded-full blur-[200px]" />
      <div className="absolute bottom-0 right-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-brand-purple/[0.03] rounded-full blur-[150px]" />

      <div className="relative z-[2] max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-14">
          <span className="text-xs text-brand-teal tracking-[0.2em] font-medium mb-3 block">خدماتنا</span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-5xl text-brand-text mb-3 sm:mb-4 leading-tight">
            خدمات متخصصة <span className="text-brand-teal">لطفلك</span>
          </h2>
          <p className="text-brand-text-muted text-sm sm:text-base md:text-lg max-w-lg mx-auto px-4 sm:px-0">
            حلول متكاملة مصممة لتلبية احتياجات كل طفل بشكل فردي
          </p>
        </div>

        {/* Cards grid — always visible, CSS stagger animation */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {SERVICES.map((service, i) => (
            <TiltCard key={i} intensity={4} className="h-full">
              <div
                className="service-card bg-surface-card border border-[var(--border-default)] hover:border-brand-teal rounded-2xl p-5 sm:p-7 md:p-9 transition-all duration-500 hover:bg-surface-secondary group relative overflow-hidden h-full"
              >
                {/* Big background number */}
                <span className="absolute -top-3 -left-1 text-[100px] md:text-[120px] font-display font-bold text-brand-text/[0.04] leading-none pointer-events-none select-none">
                  {service.number}
                </span>

                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center mb-6 text-brand-teal group-hover:scale-110 group-hover:bg-brand-teal/20 transition-all duration-500">
                    <service.Icon size={32} />
                  </div>

                  <span className="text-xs text-brand-teal font-bold tracking-[0.15em] mb-3 block">
                    الخدمة {service.number}
                  </span>

                  <h3 className="font-display font-bold text-xl md:text-2xl text-brand-text mb-4 leading-tight">
                    {service.title}
                  </h3>

                  <p className="text-brand-text-muted leading-relaxed text-sm md:text-[15px] mb-6">
                    {service.desc}
                  </p>

                  <div className="w-10 h-[2px] bg-brand-teal/30 group-hover:w-full transition-all duration-700 ease-out" />
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button href="/services" variant="white" size="lg">جميع الخدمات السبع</Button>
        </div>
      </div>
    </section>
  );
}
