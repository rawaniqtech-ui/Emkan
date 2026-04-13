'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

export default function PageLoader() {
  // Skip the loader entirely on mobile — it's been causing visual artifacts
  // (sticky purple bar on the left edge after the wipe-up clipPath transition).
  // Mobile users don't need the cinematic intro; the brand-reveal canvas IS the intro.
  // Initial state must match SSR (true) to avoid hydration mismatch — we hide
  // synchronously in useEffect before any paint.
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // On mobile: hide immediately, don't even start the timeline.
    if (window.innerWidth < 768) {
      setVisible(false);
      return;
    }

    // Count-up from 0 → 100 over ~2.4s
    const start = performance.now();
    const duration = 2400;
    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const tl = gsap.timeline({
      delay: 0.15,
      onComplete: () => setVisible(false),
    });

    tl.fromTo('.loader-orbit',
      { scale: 0, opacity: 0, rotation: -60 },
      { scale: 1, opacity: 1, rotation: 0, duration: 0.9, ease: 'back.out(1.6)' }
    )
    .fromTo('.loader-logo',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.8)' },
      '-=0.7'
    )
    .fromTo('.loader-ring-decor',
      { scale: 0.6, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out' },
      '-=0.6'
    )
    .fromTo('.loader-brand',
      { y: 24, opacity: 0, filter: 'blur(6px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo('.loader-divider',
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.5, ease: 'power3.out' },
      '-=0.35'
    )
    .fromTo('.loader-en',
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo('.loader-tagline',
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
      '-=0.25'
    )
    .fromTo('.loader-wave-bar',
      { scaleY: 0, opacity: 0 },
      { scaleY: 1, opacity: 1, duration: 0.5, stagger: 0.04, ease: 'back.out(2)', transformOrigin: 'bottom' },
      '-=0.3'
    )
    .fromTo('.loader-bar-wrap',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo('.loader-bar',
      { scaleX: 0 },
      { scaleX: 1, duration: 1.4, ease: 'power2.inOut' },
      '-=0.3'
    )
    .to('.loader-content', {
      opacity: 0,
      scale: 0.92,
      y: -8,
      duration: 0.45,
      ease: 'power2.in',
    })
    .to('.page-loader', {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.8,
      ease: 'power4.inOut',
    }, '-=0.25');

    return () => {
      cancelAnimationFrame(rafRef.current);
      tl.kill();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="page-loader fixed inset-0 z-[99999] bg-brand-purple-dark flex items-center justify-center overflow-hidden"
      style={{ clipPath: 'inset(0 0 0 0)' }}
    >
      {/* Layer 1 — radial gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, #4A3670 0%, #3B2C59 30%, #2A1E42 70%, #1A1230 100%)',
        }}
      />

      {/* Layer 2 — dot grid (desktop only) */}
      <div
        className="absolute inset-0 opacity-[0.07] hidden md:block"
        style={{
          backgroundImage:
            'radial-gradient(circle, #87C6C7 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Layer 3 — drifting color blobs (desktop only) */}
      <div className="absolute top-[10%] left-[15%] w-[520px] h-[520px] rounded-full bg-brand-teal/12 blur-[150px] animate-blob-1 hidden md:block" />
      <div className="absolute bottom-[5%] right-[10%] w-[600px] h-[600px] rounded-full bg-brand-teal/10 blur-[160px] animate-blob-3 hidden md:block" />
      <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] rounded-full bg-[#6b4cff]/10 blur-[140px] animate-blob-2 hidden md:block" />

      {/* Layer 4 — big orbital rings (desktop only — too heavy on mobile FCP) */}
      <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none">
        <div
          className="absolute w-[900px] h-[900px] rounded-full border border-brand-teal/10"
          style={{ animation: 'loaderSpin 40s linear infinite' }}
        />
        <div
          className="absolute w-[1200px] h-[1200px] rounded-full border border-dashed border-brand-teal/[0.08]"
          style={{ animation: 'loaderSpinReverse 60s linear infinite' }}
        />
        <div
          className="absolute w-[1500px] h-[1500px] rounded-full border border-white/[0.04]"
          style={{ animation: 'loaderSpin 80s linear infinite' }}
        />
      </div>

      {/* Layer 5 — corner sound wave bars */}
      <div className="absolute top-10 left-10 flex items-end gap-1.5 opacity-30 hidden md:flex">
        {[14, 28, 44, 28, 14, 20, 32].map((h, i) => (
          <div
            key={i}
            className="w-[3px] rounded-full bg-brand-teal"
            style={{
              height: h,
              animation: `loaderBarPulse 1.6s ease-in-out ${i * 0.12}s infinite`,
            }}
          />
        ))}
      </div>
      <div className="absolute bottom-10 right-10 flex items-end gap-1.5 opacity-30 hidden md:flex">
        {[20, 34, 22, 46, 28, 16].map((h, i) => (
          <div
            key={i}
            className="w-[3px] rounded-full bg-brand-teal"
            style={{
              height: h,
              animation: `loaderBarPulse 1.6s ease-in-out ${i * 0.14}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Layer 6 — sparkle dots (desktop only) */}
      {[
        { top: '15%', left: '25%', delay: 0 },
        { top: '28%', left: '78%', delay: 0.4 },
        { top: '68%', left: '18%', delay: 0.8 },
        { top: '82%', left: '72%', delay: 0.2 },
        { top: '20%', left: '55%', delay: 1.2 },
        { top: '75%', left: '45%', delay: 0.6 },
      ].map((s, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-brand-teal hidden md:block"
          style={{
            top: s.top,
            left: s.left,
            boxShadow: '0 0 8px #87C6C7',
            animation: `loaderTwinkle 2.4s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}

      {/* Top vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />

      {/* ═══════════════════════ Center content ═══════════════════════ */}
      <div className="loader-content text-center relative z-10 px-6 w-full max-w-sm mx-auto flex flex-col items-center">
        {/* Logo + animated rings around it */}
        <div className="relative mb-7 md:mb-10 inline-flex items-center justify-center">
          {/* Concentric decorative rings — tighter on mobile so they hug the smaller logo */}
          <div
            className="loader-orbit absolute inset-0 -m-[26px] md:-m-[60px] rounded-full border border-brand-teal/25"
            style={{ animation: 'loaderSpin 8s linear infinite' }}
          />
          <div
            className="loader-ring-decor absolute inset-0 -m-[14px] md:-m-[40px] rounded-full border border-dashed border-brand-teal/30"
            style={{ animation: 'loaderSpinReverse 12s linear infinite' }}
          />
          <div className="loader-ring-decor absolute inset-0 -m-[40px] md:-m-[80px] rounded-full border border-white/[0.08]" />

          {/* Orbiting dots on the outer ring */}
          <div
            className="loader-ring-decor absolute inset-0 -m-[26px] md:-m-[60px]"
            style={{ animation: 'loaderSpin 8s linear infinite' }}
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-teal"
              style={{ boxShadow: '0 0 12px #87C6C7' }}
            />
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand-teal/70"
              style={{ boxShadow: '0 0 10px #87C6C7' }}
            />
          </div>

          {/* Logo container with glassy surface + glow */}
          <div
            className="loader-logo relative w-24 h-24 md:w-36 md:h-36 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center p-4 md:p-5"
            style={{
              boxShadow:
                '0 0 60px rgba(135,198,199,0.25), inset 0 1px 0 rgba(255,255,255,0.2)',
            }}
          >
            <Image
              src="/images/logo-icon.jpg"
              alt="شعار إمكان المستقبل"
              width={120}
              height={120}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        </div>

        {/* Arabic brand name */}
        <h1 className="loader-brand font-display font-bold text-[26px] md:text-5xl text-white mb-2 tracking-tight leading-none">
          إمكان المستقبل
        </h1>

        {/* Divider */}
        <div className="loader-divider w-12 md:w-16 h-[2px] bg-gradient-to-r from-transparent via-brand-teal to-transparent mb-2.5 md:mb-3" />

        {/* English name */}
        <p className="loader-en text-white/50 text-[10px] md:text-sm tracking-[0.32em] md:tracking-[0.35em] mb-3.5 md:mb-5 font-medium">
          FUTURE EMKAN
        </p>

        {/* Tagline */}
        <p className="loader-tagline text-brand-teal/90 text-[13px] md:text-base mb-7 md:mb-10 font-display">
          معًا نطلق إمكاناتهم
        </p>

        {/* Sound wave bars row (above progress) */}
        <div className="flex items-end justify-center gap-[5px] md:gap-1.5 mb-5 md:mb-6 h-6 md:h-8">
          {[0.4, 0.7, 1.0, 0.85, 0.55, 0.9, 0.6, 1.0, 0.45].map((h, i) => (
            <div
              key={i}
              className="loader-wave-bar w-[3px] rounded-full bg-brand-teal"
              style={{
                height: `${h * 100}%`,
                animation: `loaderBarPulse 1.2s ease-in-out ${i * 0.08}s infinite`,
                transformOrigin: 'bottom',
              }}
            />
          ))}
        </div>

        {/* Progress bar + count */}
        <div className="loader-bar-wrap w-full">
          <div className="w-48 md:w-64 h-[3px] bg-white/10 mx-auto rounded-full overflow-hidden relative">
            <div
              className="loader-bar absolute inset-0 bg-gradient-to-l from-brand-teal to-brand-teal-light rounded-full origin-right"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
          <div className="flex items-center justify-center gap-3 mt-3">
            <span className="text-white/45 text-[11px] tracking-[0.2em]">جاري التحميل</span>
            <span className="text-brand-teal text-[11px] font-display font-bold tabular-nums">
              {String(progress).padStart(3, '0')}%
            </span>
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes loaderSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes loaderSpinReverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes loaderBarPulse {
          0%, 100% { transform: scaleY(0.35); }
          50% { transform: scaleY(1); }
        }
        @keyframes loaderTwinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.4); }
        }
      `}</style>
    </div>
  );
}
