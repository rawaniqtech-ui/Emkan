'use client';

import { useRef } from 'react';
import { useFrameSequence } from '@/hooks/useFrameSequence';
import { FRAME_CONFIG } from '@/lib/constants';

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const {
    loadProgress,
    isLoaded,
    firstFrameLoaded,
    staticFallback,
  } = useFrameSequence(canvasRef, sectionRef, {
    frameCount: FRAME_CONFIG.count,
    directory: FRAME_CONFIG.directory,
    prefix: FRAME_CONFIG.prefix,
    extension: FRAME_CONFIG.extension,
    padLength: FRAME_CONFIG.padLength,
  });

  return (
    <section
      ref={sectionRef}
      className="h-[220vh] md:h-[340vh] lg:h-[440vh] relative section-vignette overflow-x-clip"
      style={{ backgroundColor: '#F6F2E6' }}
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ backgroundColor: '#F6F2E6' }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Pre-first-frame loader — hides as soon as frame 1 paints */}
        {!firstFrameLoaded && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: '#F6F2E6' }}
          >
            <div className="text-center px-6">
              <div className="font-display font-bold text-2xl md:text-3xl text-brand-purple mb-2">
                إمكان المستقبل
              </div>
              <p className="text-brand-text-muted text-xs md:text-sm mb-6">
                جاري تحميل التجربة
              </p>
              <div className="w-44 md:w-48 h-[2px] bg-brand-purple/10 mx-auto overflow-hidden rounded-full">
                <div
                  className="h-full bg-brand-teal transition-all duration-300 rounded-full"
                  style={{ width: `${loadProgress * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Post-first-frame: subtle progress chip while the rest stream in */}
        {firstFrameLoaded && !isLoaded && !staticFallback && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-purple/10 backdrop-blur-md border border-brand-purple/15">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-60 animate-ping" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-teal" />
              </span>
              <span className="text-[10px] text-brand-purple/70 tracking-wider tabular-nums">
                {Math.round(loadProgress * 100)}%
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
