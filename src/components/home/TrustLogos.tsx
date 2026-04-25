'use client';

import Image from 'next/image';

type Partner = {
  name: string;
  logo: string;
  // Per-logo optical scale. 1 = default. Tuned by eye so every logo reads
  // with similar visual weight despite different natural aspect ratios.
  scale: number;
};

const PARTNERS: Partner[] = [
  {
    name: 'وزارة التعليم',
    logo: '/images/partners/ministry-of-education.png',
    scale: 1.05,
  },
  {
    name: 'مدرسة التعلم الإبداعي الأهلية',
    logo: '/images/partners/creative-learning-school.png',
    scale: 1.2,
  },
  {
    name: 'الأكاديمية الشمالية الغربية',
    logo: '/images/partners/northwestern-academy.png',
    scale: 0.85,
  },
];

function LogoCard({ partner }: { partner: Partner }) {
  return (
    <div className="relative flex-shrink-0 w-[220px] sm:w-[260px] md:w-[300px] h-[120px] sm:h-[140px] md:h-[160px] mx-3 sm:mx-4 rounded-2xl bg-white border border-[var(--border-default)] hover:border-brand-teal/60 hover:-translate-y-1 hover:shadow-[0_10px_30px_-12px_rgba(59,44,89,0.35)] transition-[border-color,transform,box-shadow] duration-300 overflow-hidden">
      <div
        className="absolute inset-0 p-4 sm:p-5 md:p-6"
        style={{ transform: `scale(${partner.scale})`, transformOrigin: 'center' }}
      >
        <div className="relative w-full h-full">
          <Image
            src={partner.logo}
            alt={partner.name}
            fill
            sizes="(max-width: 640px) 220px, (max-width: 768px) 260px, 300px"
            quality={75}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}

const ONE_COPY = Array.from({ length: 4 }, () => PARTNERS).flat();
const TRACK = [...ONE_COPY, ...ONE_COPY];

export default function TrustLogos() {
  return (
    <section className="py-10 sm:py-12 md:py-16 bg-surface-primary overflow-hidden relative">
      <p className="text-center text-xs font-display font-bold text-brand-text mb-8 sm:mb-10">
        شركاؤنا في النجاح
      </p>

      {/* Scrolling strip — forced LTR so translateX(-50%) works against the
          w-max content, not the RTL viewport. */}
      <div className="relative" dir="ltr">
        {/* Fade edges pulling the strip into the page bg */}
        <div className="absolute inset-y-0 left-0 w-12 sm:w-24 md:w-40 bg-gradient-to-r from-surface-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 sm:w-24 md:w-40 bg-gradient-to-l from-surface-primary to-transparent z-10 pointer-events-none" />

        {/* Track */}
        <div
          className="flex w-max animate-marquee hover:[animation-play-state:paused]"
          style={{ animationDuration: '40s' }}
        >
          {TRACK.map((p, i) => (
            <LogoCard key={i} partner={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
