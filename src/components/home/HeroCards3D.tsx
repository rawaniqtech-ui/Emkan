'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

const CARDS = [
  {
    src: '/images/card-1.jpg',
    alt: 'أخصائية تقرأ مع أطفال',
    label: 'جلسات تفاعلية',
    title: 'جلسات تفاعلية مخصصة',
    description: 'كل جلسة مصممة بعناية لتناسب احتياجات طفلك، تجمع بين اللعب والتعلم في بيئة آمنة ومحفزة.',
  },
  {
    src: '/images/card-2.jpg',
    alt: 'أطفال في الفصل',
    label: 'بيئة تعليمية',
    title: 'بيئة تعليمية محفزة',
    description: 'فضاءات مصممة خصيصاً لتنمية الفضول والإبداع، حيث يشعر كل طفل بالأمان والانتماء.',
  },
  {
    src: '/images/card-3.jpg',
    alt: 'أطفال يلعبون ويتعلمون',
    label: 'تعلم باللعب',
    title: 'نتعلم من خلال اللعب',
    description: 'اللعب هو لغة الطفل الأولى. نحن نوظّفه لبناء مهارات التواصل والتفكير بطرق طبيعية وممتعة.',
  },
  {
    src: '/images/card-4.jpg',
    alt: 'طفل يقرأ كتاب',
    label: 'تنمية المهارات',
    title: 'تنمية المهارات الأساسية',
    description: 'نعمل على تطوير مهارات القراءة والكتابة والتركيز من خلال برامج فردية تتابع كل خطوة.',
  },
  {
    src: '/images/card-5.jpg',
    alt: 'طفل في نشاط إبداعي',
    label: 'إبداع وابتكار',
    title: 'نطلق الإبداع الكامن',
    description: 'نشجع كل طفل على التعبير عن نفسه بحرية من خلال الفن والموسيقى والأنشطة الإبداعية.',
  },
  {
    src: '/images/card-6.jpg',
    alt: 'أطفال معاً',
    label: 'تواصل اجتماعي',
    title: 'بناء علاقات اجتماعية',
    description: 'نساعد الأطفال على تكوين صداقات وتطوير مهارات التواصل في مجموعات صغيرة وداعمة.',
  },
];

export default function HeroCards3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef({ current: 0, target: 0 });
  const rafRef = useRef<number>(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!cardsRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cardEls = cardsRef.current.children;
    const cardCount = CARDS.length;
    const angleStep = 360 / cardCount;
    const w = window.innerWidth;
    const isMobile = w < 640;
    // Radius just slightly above card width at each breakpoint — cards stay
    // close together without colliding. Card widths: 200 / 260 / 300 / 320.
    const radius = isMobile ? 210 : w < 768 ? 272 : w < 1024 ? 315 : 335;

    Array.from(cardEls).forEach((card, i) => {
      const el = card as HTMLElement;
      gsap.set(el, {
        rotateY: i * angleStep,
        z: radius,
        transformOrigin: `center center -${radius}px`,
      });
    });

    const autoSpeed = isMobile ? 0.25 : 0.18;
    let paused = false;
    let isVisible = true;
    let lastActiveIndex = 0;

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    if (containerRef.current) visibilityObserver.observe(containerRef.current);

    function animate() {
      if (!isVisible) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      if (!paused && !isDragging.current) {
        rotationRef.current.target += autoSpeed;
      }

      const lerp = isMobile ? 0.12 : 0.06;
      rotationRef.current.current += (rotationRef.current.target - rotationRef.current.current) * lerp;

      if (cardsRef.current) {
        cardsRef.current.style.transform = `rotateY(${rotationRef.current.current}deg)`;
      }

      let maxFrontness = -1;
      let frontIndex = 0;

      Array.from(cardEls).forEach((card, i) => {
        const el = card as HTMLElement;
        const cardAngle = i * angleStep + rotationRef.current.current;
        const normalizedAngle = ((cardAngle % 360) + 360) % 360;
        const distFromFront = Math.min(normalizedAngle, 360 - normalizedAngle);
        const frontness = 1 - distFromFront / 180;

        if (frontness > maxFrontness) {
          maxFrontness = frontness;
          frontIndex = i;
        }

        el.style.opacity = String(0.1 + frontness * 0.9);
        el.style.filter = frontness > 0.6 ? 'none' : `blur(${(1 - frontness) * 4}px)`;
        el.style.zIndex = String(Math.round(frontness * 10));
        const scaleVal = isMobile ? (0.7 + frontness * 0.3) : (0.85 + frontness * 0.15);
        el.style.scale = String(scaleVal);
      });

      if (frontIndex !== lastActiveIndex) {
        lastActiveIndex = frontIndex;
        setActiveIndex(frontIndex);
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    const container = containerRef.current;
    const handleEnter = () => { paused = true; };
    const handleLeave = () => { paused = false; isDragging.current = false; };
    const handlePointerDown = (e: PointerEvent) => { isDragging.current = true; startX.current = e.clientX; };
    // Throttle pointer-move to 30Hz on touch — halves rotation recompute cost during drag
    let lastMoveAt = 0;
    const moveThrottleMs = isMobile ? 33 : 0;
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const now = performance.now();
      if (moveThrottleMs && now - lastMoveAt < moveThrottleMs) return;
      lastMoveAt = now;
      const sensitivity = isMobile ? 1.5 : 0.4;
      rotationRef.current.target += (e.clientX - startX.current) * sensitivity;
      startX.current = e.clientX;
    };
    const handlePointerUp = () => { isDragging.current = false; };

    container?.addEventListener('mouseenter', handleEnter);
    container?.addEventListener('mouseleave', handleLeave);
    container?.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    gsap.fromTo(cardEls,
      { opacity: 0, scale: 0.3 },
      { opacity: 1, scale: 1, duration: 1, stagger: 0.1, ease: 'back.out(1.4)', delay: 0.3 }
    );

    return () => {
      cancelAnimationFrame(rafRef.current);
      visibilityObserver.disconnect();
      container?.removeEventListener('mouseenter', handleEnter);
      container?.removeEventListener('mouseleave', handleLeave);
      container?.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  const active = CARDS[activeIndex];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-4 items-center py-6 md:py-12 lg:py-16">
      {/* 3D Carousel — left on desktop */}
      <div
        ref={containerRef}
        className="relative w-full h-[220px] sm:h-[300px] md:h-[380px] lg:h-[460px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none order-1 overflow-x-clip"
        style={{ perspective: '1000px' }}
      >
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[220px] sm:h-[350px] bg-brand-teal/8 dark:bg-brand-teal/5 rounded-full blur-[80px] sm:blur-[100px]" />

        <div
          ref={cardsRef}
          className="relative w-0 h-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {CARDS.map((card, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[140px] sm:w-[260px] sm:h-[185px] md:w-[300px] md:h-[210px] lg:w-[320px] lg:h-[225px] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl shadow-brand-purple/30 dark:shadow-black/50 transition-[filter] duration-200"
              style={{
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
              }}
            >
              <Image
                src={card.src}
                alt={card.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 300px, (max-width: 768px) 520px, (max-width: 1024px) 600px, 640px"
                loading="lazy"
                quality={65}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-purple/80 via-brand-purple/10 to-transparent" />
              {/* Label + icon accent */}
              <div className="absolute bottom-0 right-0 left-0 p-4 sm:p-5 md:p-6">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-brand-teal shrink-0" />
                  <span className="text-white text-sm sm:text-base md:text-lg font-display font-bold drop-shadow-lg">
                    {card.label}
                  </span>
                </div>
              </div>
              {/* Top accent bar */}
              <div className="absolute top-0 right-0 left-0 h-[3px] sm:h-1 bg-gradient-to-l from-brand-teal to-brand-teal-light" />
            </div>
          ))}
        </div>

        {/* Swipe hint */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <span className="inline-block w-4 h-[1px] bg-brand-text-muted/30" />
          <span className="text-xs text-brand-text-muted/60">اسحب للتدوير</span>
          <span className="inline-block w-4 h-[1px] bg-brand-text-muted/30" />
        </div>
      </div>

      {/* Text panel — right on desktop, synced to active card */}
      <div className="relative order-2 px-5 md:px-6 lg:pr-8 lg:pl-12 text-right min-h-[180px] sm:min-h-[220px] flex flex-col justify-center">
        {/* Progress dots */}
        <div className="flex items-center gap-2 justify-end mb-4 md:mb-6">
          {CARDS.map((_, i) => (
            <span
              key={i}
              className={`h-[2px] rounded-full transition-all duration-500 ${
                i === activeIndex ? 'w-7 sm:w-8 bg-brand-teal' : 'w-3 sm:w-4 bg-brand-text-muted/20'
              }`}
            />
          ))}
        </div>

        {/* Animated content — key forces remount for enter animation */}
        <div key={activeIndex} className="animate-fade-slide-up">
          <div className="flex items-center gap-2 justify-end mb-2 sm:mb-3">
            <span className="text-[11px] sm:text-xs md:text-sm font-medium text-brand-teal tracking-wide uppercase">
              {String(activeIndex + 1).padStart(2, '0')} / {String(CARDS.length).padStart(2, '0')}
            </span>
            <span className="inline-block w-6 sm:w-8 h-[1px] bg-brand-teal/40" />
          </div>

          <h3 className="font-display font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-brand-text leading-tight mb-3 sm:mb-4">
            {active.title}
          </h3>

          <p className="text-[14px] sm:text-base md:text-lg text-brand-text-muted leading-relaxed max-w-[520px] ms-auto">
            {active.description}
          </p>

          <div className="flex items-center gap-2 justify-end mt-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-teal/10 border border-brand-teal/20 text-xs md:text-sm font-medium text-brand-teal">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />
              {active.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
