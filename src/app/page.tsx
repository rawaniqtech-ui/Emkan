import dynamic from 'next/dynamic';
import HeroSection from '@/components/home/HeroSection';
import {
  SoundWaveRow,
  SwooshCurve,
  SoundWaveBars,
} from '@/components/shared/BrandDecor';

const HeroScroll = dynamic(() => import('@/components/home/HeroScroll'));
const HeroCards3D = dynamic(() => import('@/components/home/HeroCards3D'));
const ScrollHighlight = dynamic(() => import('@/components/shared/ScrollHighlight'));
const AboutPreview = dynamic(() => import('@/components/home/AboutPreview'));
const HorizontalServices = dynamic(() => import('@/components/home/HorizontalServices'));
const JourneySection = dynamic(() => import('@/components/home/JourneySection'));
const StatsCounter = dynamic(() => import('@/components/home/StatsCounter'));
const TrustLogos = dynamic(() => import('@/components/home/TrustLogos'));
const Testimonial = dynamic(() => import('@/components/home/Testimonial'));
const ScrollMarquee = dynamic(() => import('@/components/shared/ScrollMarquee'));
const WaveTransition = dynamic(() => import('@/components/shared/WaveTransition'));

const MARQUEE_ITEMS = [
  'علاج النطق',
  'تعديل السلوك',
  'تنمية المهارات',
  'فحص مدرسي',
  'خطط فردية',
  'شراكة مع الأسرة',
  'فريق متخصص',
  'تقييم شامل',
];

export default function Home() {
  return (
    <>

      {/* 1. Hero */}
      <div id="hero" className="overflow-x-clip">
        <HeroSection />
      </div>

      {/* 1b. Brand reveal — 3 photos crossfading on scroll */}
      <div id="brand-reveal" className="overflow-x-clip">
        <HeroScroll />
      </div>

      {/* 2. Moving services strip — forced LTR so translateX(-50%) works
           against the content width (w-max), not the viewport. Two copies
           of the items give an exact halfway-point for a seamless loop. */}
      <section className="py-6 md:py-8 bg-surface-primary overflow-hidden" dir="ltr">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]" style={{ animationDuration: '40s' }}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 px-5 py-2 mx-2 rounded-full bg-white dark:bg-surface-card border border-[var(--border-default)] text-[13px] md:text-sm font-medium text-brand-text whitespace-nowrap shrink-0"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-teal shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* — divider — */}
      <SoundWaveRow color="teal" />

      {/* 3. 3D Cards — layered textured background */}
      <section id="cards" className="bg-surface-primary overflow-hidden relative py-12 md:py-20 lg:py-28 section-vignette">
        {/* Layer 1 — tiled logo pattern base (subtle) */}
        {/* Pattern edge fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--surface-primary)] via-transparent to-[var(--surface-primary)] pointer-events-none" style={{ opacity: 0.5 }} />

        {/* Layer 2 — atmospheric drifting blobs */}
        <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-brand-teal/10 rounded-full blur-[140px] animate-blob-2 pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-brand-purple/8 rounded-full blur-[130px] animate-blob-4 pointer-events-none" />

        {/* Layer 3 — geometric ornaments (نقشات) */}
        <SoundWaveBars
          color="purple"
          size="lg"
          className="absolute top-10 left-8 md:top-16 md:left-16 opacity-[0.2] animate-float"
        />
        <SoundWaveBars
          color="teal"
          size="md"
          className="absolute bottom-10 right-8 md:bottom-16 md:right-16 opacity-[0.2] animate-float-reverse"
        />
        <SwooshCurve
          color="teal"
          width={360}
          className="absolute top-20 right-20 opacity-[0.15] hidden lg:block"
        />
        <SwooshCurve
          color="purple"
          width={280}
          className="absolute bottom-20 left-20 opacity-[0.12] rotate-180 hidden lg:block"
        />

        {/* Foreground — carousel + text panel */}
        <div className="relative z-[2] max-w-[1400px] mx-auto px-3 md:px-4">
          <HeroCards3D />
        </div>
      </section>


      {/* 4. Scroll highlight — large quote marks + dotted circle */}
      <section className="py-12 md:py-20 lg:py-28 px-4 md:px-6 bg-surface-primary relative overflow-hidden">
        {/* Large decorative circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[var(--border-subtle)] opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-dashed border-brand-teal/10" />
        {/* Corner sound wave bars */}
        <div className="absolute top-8 right-8 flex gap-1 opacity-[0.25]">
          {[10, 18, 26, 18, 10].map((h, i) => (
            <div key={i} className="w-1 rounded-full bg-brand-purple" style={{ height: h }} />
          ))}
        </div>
        <div className="absolute bottom-8 left-8 flex gap-1 opacity-[0.25]">
          {[8, 14, 22, 14, 8].map((h, i) => (
            <div key={i} className="w-1 rounded-full bg-brand-teal" style={{ height: h }} />
          ))}
        </div>

        <div className="relative z-[2] max-w-[700px] mx-auto text-center">
          <ScrollHighlight
            as="h2"
            className="font-display font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-brand-text leading-relaxed"
          >
            نؤمن بأن لكل طفل إمكانات فريدة تستحق أن تُطلق. نعمل مع الأسرة لبناء مستقبل أكثر استقلالاً وثقة لكل طفل.
          </ScrollHighlight>
          <div className="w-12 h-[2px] bg-brand-teal mx-auto mt-10" />
        </div>
      </section>

      {/* — divider — */}
      <SwooshCurve color="teal" width={500} className="mx-auto opacity-[0.25]" />

      {/* 5. About preview */}
      <div id="about">
        <AboutPreview />
      </div>

      {/* — divider — */}
      <SoundWaveRow color="purple" />

      {/* 6. Horizontal services */}
      <div id="services">
        <HorizontalServices />
      </div>


      <WaveTransition direction="into-light" />

      {/* 7. Journey */}
      <div id="journey">
        <JourneySection />
      </div>

      <WaveTransition direction="out-of-light" />

      {/* — divider — */}
      <SwooshCurve color="teal" width={500} className="mx-auto opacity-[0.25]" />

      {/* 8. Scroll-driven display stripes */}
      <ScrollMarquee />

      {/* 9. Stats */}
      <div id="stats">
        <StatsCounter />
      </div>

      {/* — divider — */}
      <SoundWaveRow color="teal" />

      {/* 10. Trust logos */}
      <TrustLogos />


      {/* 11. Testimonials */}
      <div id="testimonials">
        <Testimonial />
      </div>

    </>
  );
}
