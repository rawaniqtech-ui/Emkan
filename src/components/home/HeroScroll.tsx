'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const CHAPTERS = [
  {
    number: '٠١',
    label: 'البداية',
    title: 'لكل طفل إمكان',
    subtitle: 'نؤمن أن في داخل كل طفل قدرات كامنة تنتظر من يكتشفها',
  },
  {
    number: '٠٢',
    label: 'الرحلة',
    title: 'نرعاه ونُطلقه',
    subtitle: 'خطوة بعد خطوة، نبني الثقة ونوقظ الإمكانات',
  },
  {
    number: '٠٣',
    label: 'الهدف',
    title: 'معًا نصنع المستقبل',
    subtitle: 'رحلة تطوير متكاملة تصنع فرقًا حقيقيًا في حياة كل أسرة',
  },
] as const;

const PHOTOS = [
  { src: '/images/hero-scroll-1.jpg', alt: 'طفلة تتأمل العالم عبر النافذة' },
  { src: '/images/hero-scroll-2.jpg', alt: 'معلمة تحتفي بطفل أثناء جلسة تعلم' },
  { src: '/images/hero-scroll-3.jpg', alt: 'طفل يبتسم بفرح' },
] as const;

// Linear crossfade: image centers sit at p = 0, 0.5, 1.
// Fade radius 0.5 so neighbour edges meet exactly at p = 0.25 and p = 0.75.
function imageOpacity(index: number, progress: number) {
  const center = index / (PHOTOS.length - 1);
  const distance = Math.abs(progress - center);
  return Math.max(0, Math.min(1, 1 - distance / 0.5));
}

// Ken Burns: each image zooms 1.0 → 1.1 across its full visible span (radius 0.5
// around its center), so motion happens the whole time the image is on screen.
function kenBurnsScale(index: number, progress: number) {
  const center = index / (PHOTOS.length - 1);
  const t = Math.max(0, Math.min(1, progress - center + 0.5));
  return 1 + t * 0.1;
}

function chapterFor(progress: number) {
  if (progress < 1 / 3) return 0;
  if (progress < 2 / 3) return 1;
  return 2;
}

export default function HeroScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let rafId = 0;
    let lastChapter = -1;

    const update = () => {
      rafId = 0;
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) {
        setProgress(0);
        return;
      }
      const p = Math.max(0, Math.min(1, -rect.top / scrollable));
      setProgress(p);
      const chapter = chapterFor(p);
      if (chapter !== lastChapter) {
        setActiveChapter(chapter);
        lastChapter = chapter;
      }
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const current = CHAPTERS[activeChapter];

  return (
    <section
      ref={sectionRef}
      className="relative h-[200vh] md:h-[220vh] bg-[#1E1535] overflow-x-clip"
    >
      <div className="sticky top-0 h-dvh w-full overflow-hidden bg-[#1E1535]">
        {/* Photo stack — fills the entire viewport so everything else floats on top */}
        {PHOTOS.map((photo, i) => (
          <div
            key={photo.src}
            className="absolute inset-0 overflow-hidden will-change-[opacity]"
            style={{ opacity: imageOpacity(i, progress) }}
          >
            <div
              className="absolute inset-0 will-change-transform"
              style={{
                transform: `scale(${kenBurnsScale(i, progress)})`,
                transformOrigin: 'center',
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                quality={75}
                className="object-cover"
              />
            </div>
          </div>
        ))}

        {/* Top fade — softens the top edge where the section meets HeroSection above */}
        <div
          className="absolute inset-x-0 top-0 h-40 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, #1E1535 0%, rgba(30, 21, 53, 0.65) 40%, transparent 100%)',
          }}
        />

        {/* Bottom fade — darkens the lower half so chapter text stays legible over any photo */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, #1E1535 0%, rgba(30, 21, 53, 0.6) 30%, transparent 65%)',
          }}
        />

        {/* Cinematic radial vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 45%, rgba(30, 21, 53, 0.55) 100%)',
          }}
        />

        {/* Top pill — floats over the photo */}
        <div className="absolute inset-x-0 top-0 pt-6 md:pt-10 flex justify-center z-[3]">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/15">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-60 animate-ping" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-teal" />
            </span>
            <span className="text-[11px] md:text-xs font-medium text-white uppercase">
              رحلة إمكان
            </span>
          </div>
        </div>

        {/* Right-side chapter indicators */}
        <div className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 z-[3] hidden sm:flex flex-col gap-3 pointer-events-none">
          {CHAPTERS.map((c, i) => {
            const isActive = i === activeChapter;
            return (
              <div
                key={i}
                className={`flex items-center gap-2 justify-end transition-all duration-500 ${
                  isActive ? 'opacity-100' : 'opacity-35'
                }`}
              >
                <span
                  className={`text-[10px] font-display tabular-nums tracking-wider transition-colors duration-500 ${
                    isActive ? 'text-white' : 'text-white/40'
                  }`}
                >
                  {c.number}
                </span>
                <span
                  className={`block rounded-full transition-all duration-500 ${
                    isActive
                      ? 'w-1.5 h-6 bg-brand-teal'
                      : 'w-1.5 h-1.5 bg-white/25'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom text + progress bar — floats over the photo */}
        <div className="absolute inset-x-0 bottom-0 px-6 md:px-12 pb-5 md:pb-8 z-[3]">
          <div className="max-w-[720px] mx-auto text-center">
            <div key={activeChapter} className="animate-fade-slide-up">
              <div className="flex items-center justify-center gap-3 mb-2 md:mb-3">
                <span className="block w-6 h-[1px] bg-brand-teal/60" />
                <span className="text-[10px] md:text-xs font-medium text-brand-teal uppercase">
                  {current.label}
                </span>
                <span className="block w-6 h-[1px] bg-brand-teal/60" />
              </div>
              <h2 className="font-display font-bold text-xl sm:text-2xl md:text-4xl text-white mb-1.5 md:mb-3 leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
                {current.title}
              </h2>
              <p className="text-[12px] sm:text-sm md:text-base text-white/80 leading-relaxed max-w-md mx-auto drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
                {current.subtitle}
              </p>
            </div>
          </div>

          <div className="max-w-[720px] mx-auto mt-4 md:mt-6">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-display tabular-nums text-white/60">
                {String(activeChapter + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 h-[2px] bg-white/15 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-teal rounded-full transition-[width] duration-150 ease-out"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <span className="text-[10px] font-display tabular-nums text-white/60">
                {String(CHAPTERS.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
