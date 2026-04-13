'use client';

import { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '@/components/shared/SectionHeading';
import TextReveal from '@/components/shared/TextReveal';
import Button from '@/components/shared/Button';
import { SoundWaveBars, SoundWaveRow, SwooshCurve } from '@/components/shared/BrandDecor';
import { IconJourney, IconSpeech, IconLearning, IconBehavior, IconTherapy, IconFamily, IconScreening } from '@/components/shared/BrandIcons';
import LazyVideo from '@/components/shared/LazyVideo';
import { content } from '@/content/ar';
import { useInView } from '@/hooks/useInView';
import { useCountUp } from '@/hooks/useCountUp';
import { CARD_DIRECTIONS, CARD_EASINGS } from '@/lib/animations';

const TiltCard = dynamic(() => import('@/components/shared/TiltCard'), { ssr: false });
const ParticlesBackground = dynamic(() => import('@/components/shared/ParticlesBackground'), { ssr: false });
const TypeAnimation = dynamic(
  () => import('react-type-animation').then((m) => m.TypeAnimation),
  { ssr: false }
);

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
  return (
    <>
      <PageHero />
      <SoundWaveRow color="teal" />
      <StorySection />
      <MissionVision />
      <SwooshCurve color="teal" width={500} className="mx-auto opacity-[0.25]" />
      <WhyUsSection />
      <SoundWaveRow color="purple" />
      <NumbersSection />
      <TeamSection />
      <SwooshCurve color="teal" width={500} className="mx-auto opacity-[0.25]" />
      <Timeline />
      <SoundWaveRow color="teal" />
      <AboutCTA />
    </>
  );
}

/* ── HERO ── */
function PageHero() {
  return (
    <section className="relative min-h-[50vh] md:min-h-[75vh] flex items-center justify-center pt-20 overflow-hidden">
      <LazyVideo
        src="/videos/therapy-session.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        overlayClassName="absolute inset-0 bg-brand-purple/80 dark:bg-brand-purple-dark/85"
      />
      <ParticlesBackground />
      <div className="relative text-center px-4 md:px-6 max-w-3xl">
        <span className="inline-block text-xs text-brand-teal tracking-[0.2em] font-medium mb-6">مركز إمكان المستقبل</span>
        <TextReveal as="h1" type="words" stagger={0.1} duration={0.7} className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-brand-text mb-6 leading-[1.1]">
          {content.about.hero.title}
        </TextReveal>
        <TypeAnimation sequence={[content.about.hero.subtitle]} wrapper="p" speed={30} className="text-white/70 text-base md:text-xl max-w-xl mx-auto" />
        <div className="w-16 h-[2px] bg-brand-teal mx-auto mt-10" />
        <div className="mt-8 flex gap-4 justify-center flex-wrap">
          <Button href="/services" variant="white" size="md">اكتشف خدماتنا</Button>
          <Button href="/contact" variant="ghost" size="md" className="text-white border-white/20 hover:bg-white/10">تواصل معنا</Button>
        </div>
      </div>
    </section>
  );
}

/* ── OUR STORY ── */
function StorySection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.story-el',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 90%', toggleActions: 'play none none none' } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-12 md:py-20 lg:py-28 px-4 md:px-12 bg-surface-primary relative overflow-hidden section-vignette">
      {/* Layered texture */}
      <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-brand-teal/10 rounded-full blur-[140px] animate-blob-2 pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-brand-purple/8 rounded-full blur-[130px] animate-blob-4 pointer-events-none" />
      <SoundWaveBars color="purple" size="md" className="absolute top-10 right-8 md:top-16 md:right-16 opacity-[0.2] animate-float" />
      <SwooshCurve color="teal" width={320} className="absolute bottom-16 right-16 opacity-[0.12] hidden lg:block" />

      <div ref={ref} className="relative z-[2] max-w-[1000px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-8 md:gap-14 items-center">
          {/* Image side */}
          <div className="story-el">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden relative border-2 border-[var(--border-default)]">
              <LazyVideo src="/videos/children-classroom.mp4" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-purple/30 to-transparent" />
              {/* Floating stat card */}
              <div className="absolute bottom-4 right-4 left-4 bg-surface-card/90 backdrop-blur-md rounded-xl p-4 border border-[var(--border-default)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-teal/10 flex items-center justify-center text-brand-teal"><IconSpeech size={22} /></div>
                  <div>
                    <p className="font-display font-bold text-brand-text text-sm">+٥٠٠ مستفيد</p>
                    <p className="text-xs text-brand-text-muted">ساعدناهم في رحلتهم</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div>
            <span className="story-el inline-block text-xs text-brand-teal tracking-[0.2em] font-medium mb-4">قصتنا</span>
            <h2 className="story-el font-display font-bold text-2xl md:text-4xl text-brand-text mb-6 leading-tight">
              من أين بدأنا ولماذا نفعل ما نفعله
            </h2>
            <p className="story-el text-brand-text-muted leading-relaxed mb-6">
              {content.about.intro.text}
            </p>
            <div className="story-el flex gap-6">
              <div className="text-center">
                <span className="font-display font-bold text-2xl text-brand-teal">+١٠</span>
                <p className="text-xs text-brand-text-muted mt-1">سنوات خبرة</p>
              </div>
              <div className="w-[1px] bg-[var(--border-default)]" />
              <div className="text-center">
                <span className="font-display font-bold text-2xl text-brand-teal">+٢٥</span>
                <p className="text-xs text-brand-text-muted mt-1">أخصائي مؤهل</p>
              </div>
              <div className="w-[1px] bg-[var(--border-default)]" />
              <div className="text-center">
                <span className="font-display font-bold text-2xl text-brand-teal">٧</span>
                <p className="text-xs text-brand-text-muted mt-1">خدمات متخصصة</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── MISSION & VISION ── */
function MissionVision() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.mv-heading',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 90%', toggleActions: 'play none none none' } }
      );
      gsap.fromTo('.mv-card',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.mv-card', start: 'top 90%', toggleActions: 'play none none none' } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-12 md:py-20 lg:py-24 px-4 md:px-12 bg-surface-secondary relative overflow-hidden">
      <SoundWaveBars color="teal" size="md" className="absolute top-8 left-8 opacity-[0.18] animate-float hidden md:flex" />
      <div className="absolute inset-0 pattern-bg opacity-[0.02]" />
      <div ref={ref} className="relative z-[2] max-w-[1000px] mx-auto">
        <div className="text-center mb-12">
          <span className="mv-heading text-xs text-brand-teal tracking-[0.2em] font-medium mb-3 block">{content.about.mission.sectionLabel}</span>
          <h2 className="mv-heading font-display font-bold text-2xl md:text-4xl text-brand-text">{content.about.mission.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vision */}
          <div className="mv-card bg-surface-card border border-[var(--border-default)] rounded-2xl p-6 md:p-10 hover:bg-surface-secondary transition-all duration-500">
            <div className="w-14 h-14 rounded-2xl bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center mb-6 text-brand-teal">
              <IconJourney size={30} />
            </div>
            <h3 className="font-display font-bold text-xl text-brand-text mb-3">{content.about.mission.visionLabel}</h3>
            <p className="text-brand-text-muted leading-relaxed">{content.about.mission.vision}</p>
          </div>

          {/* Mission */}
          <div className="mv-card bg-surface-card border border-[var(--border-default)] rounded-2xl p-6 md:p-10 hover:bg-surface-secondary transition-all duration-500">
            <div className="w-14 h-14 rounded-2xl bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center mb-6 text-brand-teal">
              <IconSpeech size={30} />
            </div>
            <h3 className="font-display font-bold text-xl text-brand-text mb-3">{content.about.mission.missionLabel}</h3>
            <p className="text-brand-text-muted leading-relaxed">{content.about.mission.mission}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── WHY CHOOSE US ── */
function WhyUsSection() {
  const icons = [IconJourney, IconSpeech, IconLearning, IconBehavior, IconTherapy, IconFamily, IconScreening];
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const cards = ref.current!.querySelectorAll('.why-card');
      cards.forEach((card, i) => {
        const dir = CARD_DIRECTIONS[i % CARD_DIRECTIONS.length];
        gsap.fromTo(card,
          { opacity: 0, x: dir.x, y: dir.y },
          { opacity: 1, x: 0, y: 0, duration: 0.6, delay: i * 0.1, ease: CARD_EASINGS[i % 2],
            scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' }
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-12 md:py-20 lg:py-28 px-4 md:px-12 bg-surface-secondary relative overflow-hidden section-vignette">
      {/* Layered texture */}
      <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-brand-teal/10 rounded-full blur-[140px] animate-blob-1 pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-brand-purple/8 rounded-full blur-[130px] animate-blob-3 pointer-events-none" />
      <SoundWaveBars color="teal" size="md" className="absolute top-12 left-8 md:top-16 md:left-16 opacity-[0.2] animate-float" />
      <SoundWaveBars color="purple" size="sm" className="absolute bottom-10 right-8 md:bottom-16 md:right-16 opacity-[0.18] animate-float-reverse" />
      <SwooshCurve color="teal" width={320} className="absolute top-16 right-16 opacity-[0.12] hidden lg:block" />

      <div ref={ref} className="relative z-[2] max-w-[1100px] mx-auto">
        <SectionHeading label={content.about.values.sectionLabel} title={content.about.values.title} subtitle={content.about.values.subtitle} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {content.about.values.items.map((value, i) => {
            const Icon = icons[i % icons.length];
            return (
              <TiltCard key={i} intensity={3}>
                <div className="why-card bg-surface-card rounded-2xl p-7 border border-[var(--border-default)] hover:border-brand-teal hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center mb-5 text-brand-teal group-hover:scale-110 transition-transform duration-300">
                    <Icon size={26} />
                  </div>
                  <h3 className="font-display font-bold text-brand-text text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-brand-text-muted leading-relaxed">{value.desc}</p>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── NUMBERS / STATS ── */
function NumbersSection() {
  const { ref, isInView } = useInView(0.3);

  const stats = [
    { number: 500, suffix: '+', label: 'مستفيد ساعدناه' },
    { number: 10, suffix: '+', label: 'سنوات من الخبرة' },
    { number: 25, suffix: '+', label: 'أخصائي متميز' },
    { number: 7, suffix: '', label: 'خدمات متخصصة' },
    { number: 50, suffix: '+', label: 'مدرسة شريكة' },
    { number: 95, suffix: '%', label: 'نسبة رضا الأهل' },
  ];

  return (
    <section ref={ref} className="py-12 md:py-20 lg:py-24 px-4 md:px-12 bg-surface-primary relative overflow-hidden">
      <SoundWaveBars color="teal" size="lg" className="absolute bottom-8 right-8 opacity-[0.12] hidden md:flex" />
      <div className="max-w-[1000px] mx-auto">
        <SectionHeading label="بالأرقام" title="إنجازاتنا تتحدث" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {stats.map((s, i) => (
            <NumberCard key={i} {...s} isActive={isInView} delay={i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}

function NumberCard({ number, suffix, label, isActive, delay }: { number: number; suffix: string; label: string; isActive: boolean; delay: number }) {
  const value = useCountUp(number, isActive, 2000 + delay);
  return (
    <div className="text-center py-6 px-3 bg-surface-card rounded-2xl border border-[var(--border-default)] hover:border-brand-teal hover:shadow-md transition-all duration-300">
      <span className="font-display font-bold text-2xl md:text-3xl text-brand-text block">
        {value}<span className="text-brand-teal">{suffix}</span>
      </span>
      <p className="text-xs text-brand-text-muted mt-2">{label}</p>
    </div>
  );
}

/* ── TEAM ── */
function TeamSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const cards = ref.current!.querySelectorAll('.team-card');
      cards.forEach((card, i) => {
        const dir = CARD_DIRECTIONS[i % CARD_DIRECTIONS.length];
        gsap.fromTo(card,
          { opacity: 0, x: dir.x, y: dir.y },
          { opacity: 1, x: 0, y: 0, duration: 0.5, delay: i * 0.08, ease: CARD_EASINGS[i % 2],
            scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' }
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-12 md:py-20 lg:py-28 px-4 md:px-12 bg-surface-secondary">
      <div ref={ref} className="max-w-[1000px] mx-auto">
        <SectionHeading label={content.about.team.sectionLabel} title={content.about.team.title} subtitle="فريق من أفضل الأخصائيين المؤهلين والمتخصصين" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {content.about.team.members.map((member, i) => (
            <TiltCard key={i} intensity={4} shadow={false}>
              <div className="team-card bg-surface-card rounded-2xl p-5 border border-[var(--border-default)] hover:border-brand-teal hover:shadow-lg transition-all duration-300 text-center group">
                <div className="w-20 h-20 rounded-2xl bg-surface-secondary dark:bg-surface-elevated mx-auto mb-4 overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center text-brand-teal/30">
                    <IconJourney size={36} />
                  </div>
                  <div className="absolute inset-0 bg-brand-purple/90 dark:bg-brand-teal/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2">
                    <span className="text-white text-xs font-medium leading-relaxed">{member.specialty}</span>
                  </div>
                </div>
                <h4 className="font-display font-bold text-brand-text text-sm mb-1">{member.name}</h4>
                <p className="text-xs text-brand-text-muted">{member.role}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── TIMELINE ── */
function Timeline() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const useScrub = window.innerWidth >= 1024;
    const ctx = gsap.context(() => {
      gsap.fromTo('.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
          ease: 'power2.out',
          transformOrigin: 'top',
          scrollTrigger: useScrub
            ? { trigger: ref.current, start: 'top 70%', end: 'bottom 30%', scrub: 1 }
            : { trigger: ref.current, start: 'top 80%', toggleActions: 'play none none none' },
        }
      );
      gsap.fromTo('.timeline-item',
        { opacity: 0, x: (i: number) => (i % 2 === 0 ? 30 : -30) },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: ref.current, start: 'top 90%', toggleActions: 'play none none none' } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-12 md:py-20 lg:py-28 px-4 md:px-12 bg-brand-purple-dark relative overflow-hidden">
      <div className="absolute inset-0 pattern-bg opacity-[0.02]" />
      <div className="relative max-w-[700px] mx-auto">
        <SectionHeading label={content.about.timeline.sectionLabel} title={content.about.timeline.title}  />
        <div ref={ref} className="relative">
          <div className="timeline-line absolute right-4 md:right-1/2 top-0 bottom-0 w-[2px] bg-brand-teal/30 md:translate-x-1/2" />
          <div className="space-y-8 md:space-y-12">
            {content.about.timeline.milestones.map((m, i) => (
              <div key={i} className={`timeline-item relative flex items-center gap-4 md:gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`flex-1 pe-8 md:pe-0 ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <div className="bg-surface-card rounded-xl p-4 md:p-5 border border-[var(--border-default)] hover:bg-surface-secondary transition-colors duration-300">
                    <span className="text-xs text-brand-teal font-bold tracking-wider">{m.year}</span>
                    <h4 className="font-display font-bold text-brand-text mt-1 text-sm md:text-base">{m.title}</h4>
                    <p className="text-xs md:text-sm text-brand-text-muted mt-1">{m.desc}</p>
                  </div>
                </div>
                <div className="absolute right-[10px] md:relative md:right-auto w-4 h-4 rounded-full bg-brand-teal border-4 border-surface-secondary z-10 shrink-0" />
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CTA ── */
function AboutCTA() {
  return (
    <section className="py-14 md:py-24 lg:py-28 px-4 md:px-12 bg-surface-primary relative overflow-hidden section-vignette">
      {/* Layered texture */}
      <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-brand-teal/10 rounded-full blur-[140px] animate-blob-2 pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-brand-purple/8 rounded-full blur-[130px] animate-blob-4 pointer-events-none" />
      <SoundWaveBars color="purple" size="md" className="absolute top-12 left-8 md:top-16 md:left-16 opacity-[0.18] animate-float" />
      <SoundWaveBars color="teal" size="sm" className="absolute bottom-10 right-8 md:bottom-16 md:right-16 opacity-[0.2] animate-float-reverse" />
      <SwooshCurve color="teal" width={280} className="absolute top-20 right-20 opacity-[0.12] hidden lg:block" />

      <div className="relative z-[2] max-w-[700px] mx-auto text-center">
        <span className="text-xs text-brand-teal tracking-[0.2em] font-medium mb-4 block">ابدأ الآن</span>
        <h2 className="font-display font-bold text-2xl md:text-4xl text-brand-text mb-5 leading-tight">
          هدفنا ليس علاج المشكلة فقط
        </h2>
        <p className="text-brand-text-muted text-base md:text-lg mb-10 leading-relaxed max-w-xl mx-auto">
          بل بناء أساس قوي للتواصل والتعلم ينعكس إيجابًا على مستقبل المستفيد. تواصل معنا اليوم وابدأ رحلة طفلك.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button href="/contact" size="lg">احجز استشارة مجانية</Button>
          <Button href="/services" variant="secondary" size="lg">تعرف على خدماتنا</Button>
        </div>
      </div>
    </section>
  );
}
